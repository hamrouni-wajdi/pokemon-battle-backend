const { Client } = require('pg');
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const PokemonModel = require("../models/pokemonModel")
dotenv.config()

const client = new Client({
  connectionString: `postgresql://postgres.ljemlrsjoezqvctjlkoo:${process.env.DATABASE_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
});

const initializeDatabase = async () => {
    try {
      const sql = fs.readFileSync(path.join(__dirname, '../sql/init.sql')).toString();
      await client.query(sql);
      console.log('Database initialized successfully');
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  };

client.connect()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    await initializeDatabase();
})
  .catch(err => console.error('Connection error', err.stack));
 

  module.exports =client;