const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/hotel.db');

const db = new sqlite3.Database(dbPath);

// Criar tabela de quartos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_number TEXT UNIQUE NOT NULL,
            type TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            price_per_night REAL NOT NULL,
            status TEXT DEFAULT 'available',
            description TEXT,
            amenities TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Inserir dados de exemplo
    db.run(`
        INSERT OR IGNORE INTO rooms (room_number, type, capacity, price_per_night, status, description, amenities)
        VALUES 
            ('101', 'Standard', 2, 150.00, 'available', 'Quarto padrão com cama queen', '["WiFi", "TV", "Ar-condicionado"]'),
            ('102', 'Standard', 2, 150.00, 'available', 'Quarto padrão com cama queen', '["WiFi", "TV", "Ar-condicionado"]'),
            ('201', 'Deluxe', 3, 250.00, 'occupied', 'Quarto deluxe com vista', '["WiFi", "TV", "Ar-condicionado", "Minibar", "Janela"]'),
            ('202', 'Deluxe', 3, 250.00, 'available', 'Quarto deluxe com vista', '["WiFi", "TV", "Ar-condicionado", "Minibar", "Janela"]'),
            ('301', 'Suite', 4, 400.00, 'maintenance', 'Suíte master com jacuzzi', '["WiFi", "TV", "Ar-condicionado", "Minibar", "Jacuzzi", "Vista panorâmica"]'),
            ('302', 'Suite', 4, 400.00, 'available', 'Suíte master com jacuzzi', '["WiFi", "TV", "Ar-condicionado", "Minibar", "Jacuzzi", "Vista panorâmica"]')
    `);
});

module.exports = db;