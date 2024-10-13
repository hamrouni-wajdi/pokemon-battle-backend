const { Client } = require('pg');
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
dotenv.config()


const connectionString = `postgresql://postgres.ljemlrsjoezqvctjlkoo:${process.env.DATABASE_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`

const pool = new Pool({
    connectionString,
  });


  async function initialize(){
    const client = await pool.connect();
    try {
        await initializeDatabase(client).catch(console.error)
    }
    finally{
        client.release()
    }
}

  const initializeDatabase = async (client) => {
    try {
      const sql = fs.readFileSync(path.join(__dirname, '../sql/init.sql')).toString();
      await client.query(sql);
      console.log('Database initialized successfully');
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  };

initialize().catch(err => console.error('Database initialization error', err));

module.exports.initialize = initialize;
module.exports.query = (text, params) => pool.query(text, params);
