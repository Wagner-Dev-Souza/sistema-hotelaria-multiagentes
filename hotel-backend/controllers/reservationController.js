const db = require('../models/Reservation');

// Obter todas as reservas
exports.getAllReservations = (req, res) => {
    const query = `
        SELECT r.*, g.name as guest_name, rm.room_number, rm.type as room_type
        FROM reservations r
        JOIN guests g ON r.guest_id = g.id
        JOIN rooms rm ON r.room_id = rm.id
        ORDER BY r.created_at DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obter reserva por ID
exports.getReservationById = (req, res) => {
    const query = `
        SELECT r.*, g.name as guest_name, rm.room_number, rm.type as room_type
        FROM reservations r
        JOIN guests g ON r.guest_id = g.id
        JOIN rooms rm ON r.room_id = rm.id
        WHERE r.id = ?
    `;
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(row);
    });
};

// Criar nova reserva
exports.createReservation = (req, res) => {
    const { guest_id, room_id, check_in, check_out, guests_count, total_amount } = req.body;
    
    const query = `
        INSERT INTO reservations (guest_id, room_id, check_in, check_out, guests_count, total_amount)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, [guest_id, room_id, check_in, check_out, guests_count, total_amount], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Reservation created successfully' });
    });
};

// Atualizar reserva
exports.updateReservation = (req, res) => {
    const { guest_id, room_id, check_in, check_out, guests_count, total_amount, status, payment_status } = req.body;
    
    const query = `
        UPDATE reservations 
        SET guest_id = ?, room_id = ?, check_in = ?, check_out = ?, guests_count = ?, total_amount = ?, status = ?, payment_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    
    db.run(query, [guest_id, room_id, check_in, check_out, guests_count, total_amount, status, payment_status, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json({ message: 'Reservation updated successfully' });
    });
};

// Deletar reserva
exports.deleteReservation = (req, res) => {
    const query = 'DELETE FROM reservations WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted successfully' });
    });
};