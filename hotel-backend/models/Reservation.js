const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/hotel.db');

const db = new sqlite3.Database(dbPath);

// Criar tabela de reservas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guest_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            guests_count INTEGER NOT NULL,
            total_amount REAL NOT NULL,
            status TEXT DEFAULT 'confirmed',
            payment_status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (guest_id) REFERENCES guests (id),
            FOREIGN KEY (room_id) REFERENCES rooms (id)
        )
    `);

    // Inserir dados de exemplo
    db.run(`
        INSERT OR IGNORE INTO reservations (guest_id, room_id, check_in, check_out, guests_count, total_amount, status, payment_status)
        VALUES 
            (1, 1, '2024-01-15', '2024-01-18', 2, 450.00, 'confirmed', 'paid'),
            (2, 3, '2024-01-20', '2024-01-25', 3, 1250.00, 'checked_in', 'paid'),
            (3, 4, '2024-01-22', '2024-01-24', 2, 500.00, 'confirmed', 'pending')
    `);
});

module.exports = db;