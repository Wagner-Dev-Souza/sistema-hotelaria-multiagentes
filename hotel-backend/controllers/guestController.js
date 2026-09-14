const db = require('../models/Guest');

// Obter todos os hóspedes
exports.getAllGuests = (req, res) => {
    const query = 'SELECT * FROM guests ORDER BY name';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obter hóspede por ID
exports.getGuestById = (req, res) => {
    const query = 'SELECT * FROM guests WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Guest not found' });
        }
        res.json(row);
    });
};

// Criar novo hóspede
exports.createGuest = (req, res) => {
    const { name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone } = req.body;
    
    const query = `
        INSERT INTO guests (name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, [name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Guest created successfully' });
    });
};

// Atualizar hóspede
exports.updateGuest = (req, res) => {
    const { name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone } = req.body;
    
    const query = `
        UPDATE guests 
        SET name = ?, email = ?, phone = ?, address = ?, document_type = ?, document_number = ?, nationality = ?, birth_date = ?, emergency_contact = ?, emergency_phone = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    
    db.run(query, [name, email, phone, address, document_type, document_number, nationality, birth_date, emergency_contact, emergency_phone, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Guest not found' });
        }
        res.json({ message: 'Guest updated successfully' });
    });
};

// Deletar hóspede
exports.deleteGuest = (req, res) => {
    const query = 'DELETE FROM guests WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Guest not found' });
        }
        res.json({ message: 'Guest deleted successfully' });
    });
};