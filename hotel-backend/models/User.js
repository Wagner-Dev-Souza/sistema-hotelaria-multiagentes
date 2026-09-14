const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/hotel.db');

const db = new sqlite3.Database(dbPath);

// Criar tabela de usuários
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            full_name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Inserir dados de exemplo
    db.run(`
        INSERT OR IGNORE INTO users (username, email, password_hash, role, full_name)
        VALUES 
            ('admin', 'admin@hotel.com', '$2a$10$rOZXpK5lJ6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6', 'admin', 'Administrador do Hotel'),
            ('recepcao', 'recepcao@hotel.com', '$2a$10$rOZXpK5lJ6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6', 'reception', 'Recepcionista'),
            ('gerente', 'gerente@hotel.com', '$2a$10$rOZXpK5lJ6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6K5J6', 'manager', 'Gerente do Hotel')
    `);
});

module.exports = db;