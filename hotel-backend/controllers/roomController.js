const db = require('../models/Room');

// Obter todos os quartos
exports.getAllRooms = (req, res) => {
    const query = 'SELECT * FROM rooms ORDER BY room_number';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obter quarto por ID
exports.getRoomById = (req, res) => {
    const query = 'SELECT * FROM rooms WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(row);
    });
};

// Criar novo quarto
exports.createRoom = (req, res) => {
    const { room_number, type, capacity, price_per_night, status, description, amenities } = req.body;
    
    const query = `
        INSERT INTO rooms (room_number, type, capacity, price_per_night, status, description, amenities)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, [room_number, type, capacity, price_per_night, status, description, amenities], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Room created successfully' });
    });
};

// Atualizar quarto
exports.updateRoom = (req, res) => {
    const { room_number, type, capacity, price_per_night, status, description, amenities } = req.body;
    
    const query = `
        UPDATE rooms 
        SET room_number = ?, type = ?, capacity = ?, price_per_night = ?, status = ?, description = ?, amenities = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    
    db.run(query, [room_number, type, capacity, price_per_night, status, description, amenities, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room updated successfully' });
    });
};

// Deletar quarto
exports.deleteRoom = (req, res) => {
    const query = 'DELETE FROM rooms WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    });
};