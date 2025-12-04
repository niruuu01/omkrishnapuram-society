const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'society.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Helper function to run queries
const query = (sql, params = []) => {
    try {
        return db.prepare(sql).all(params);
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
};

// Helper function to run single row queries
const queryOne = (sql, params = []) => {
    try {
        return db.prepare(sql).get(params);
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
};

// Helper function to run insert/update/delete
const run = (sql, params = []) => {
    try {
        return db.prepare(sql).run(params);
    } catch (error) {
        console.error('Run error:', error);
        throw error;
    }
};

// Initialize database with schema
const initializeDatabase = () => {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim());

    statements.forEach(statement => {
        if (statement.trim()) {
            db.exec(statement);
        }
    });

    console.log('Database initialized successfully');
};

module.exports = {
    db,
    query,
    queryOne,
    run,
    initializeDatabase
};
