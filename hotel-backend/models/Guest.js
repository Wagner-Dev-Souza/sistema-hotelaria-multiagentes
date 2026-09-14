const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/hotel.db');

const db = new sqlite3.Database(dbPath);

// Criar tabela de hóspedes
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            document_type TEXT,
            document_number TEXT,
            nationality TEXT,
            birth_date DATE,
            emergency_contact TEXT,
            emergency_phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Inserir dados de exemplo
    db.run(`
        INSERT OR IGNORE INTO guests (name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone)
        VALUES 
            ('João Silva', 'joao.silva@email.com', '(11) 99999-1111', 'Rua das Flores, 123, São Paulo', 'CPF', '123.456.789-00', 'Brasil', '1990-01-15', 'Maria Silva', '(11) 99999-2222'),
            ('Maria Santos', 'maria.santos@email.com', '(21) 88888-3333', 'Av. Brasil, 456, Rio de Janeiro', 'CPF', '987.654.321-00', 'Brasil', '1985-03-22', 'Carlos Santos', '(21) 88888-4444'),
            ('Pedro Oliveira', 'pedro.oliveira@email.com', '(31) 77777-5555', 'Rua das Laranjeiras, 789, Belo Horizonte', 'CPF', '456.789.123-00', 'Brasil', '1992-07-10', 'Ana Oliveira', '(31) 77777-6666')
    `);
});

module.exports = db;