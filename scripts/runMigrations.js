const pool = require("../config/database").pool;
const fs = require("fs");
const path = require("path");


async function runMigrations() {
    const client = await pool.connect();
    try {
      // Create migrations table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
  
      const migrationFiles = fs.readdirSync('./migrations').sort();
  
      for (const file of migrationFiles) {
        const migrationName = path.parse(file).name;
        
        const { rows } = await client.query('SELECT * FROM migrations WHERE name = $1', [migrationName]);
        
        if (rows.length === 0) {
          console.log(`Executing migration: ${migrationName}`);
          const sql = fs.readFileSync(path.join('./migrations', file), 'utf8');
          await client.query(sql);
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
          console.log(`Migration ${migrationName} completed successfully.`);
        } else {
          console.log(`Migration ${migrationName} already executed. Skipping.`);
        }
      }
    } catch (error) {
      console.error('Error running migrations:', error);
    } finally {
      client.release();
    }
  }
  
  runMigrations().then(() => {
    console.log('All migrations completed.');
    pool.end();
  });
  