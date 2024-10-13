# Installation Guide

## Prerequisites

This project uses Supabase as the database. You will find a `.env.example` file with the necessary credentials.

## Database Connection

To open the database in the terminal, use the following command:

```bash
psql -h SP_DB_HOST -p SP_DB_PORT -d SP_DB_NAME -U SP_DB_USER
```

Replace `SP_DB_HOST`, `SP_DB_PORT`, `SP_DB_NAME`, and `SP_DB_USER` with your actual Supabase database credentials.

## Project Setup

Follow these steps to set up and run the project:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` (create `.env` if it doesn't exist)
   - Fill in the necessary credentials in `.env`

3. Verify database connection:
   - Ensure you can successfully connect to the database using the credentials in your `.env` file

4. Start the project:
   ```bash
   npm start
   ```

## Troubleshooting

If you encounter any issues during installation or setup, please check the following:

- Ensure all credentials in `.env` are correct
- Verify that your Supabase database is accessible from your current network
- Check if all required dependencies are installed correctly

For additional help, please refer to the project documentation or contact the support team.
