const db = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuário
exports.login = (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({ token, user: { id: user.id, username: user.username, role: user.role, full_name: user.full_name } });
    });
};

// Obter todos os usuários
exports.getAllUsers = (req, res) => {
    const query = 'SELECT id, username, email, role, full_name, created_at FROM users ORDER BY username';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obter usuário por ID
exports.getUserById = (req, res) => {
    const query = 'SELECT id, username, email, role, full_name, created_at FROM users WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
};

// Criar novo usuário
exports.createUser = (req, res) => {
    const { username, email, password, role, full_name } = req.body;
    
    const passwordHash = bcrypt.hashSync(password, 10);
    
    const query = `
        INSERT INTO users (username, email, password_hash, role, full_name)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(query, [username, email, passwordHash, role, full_name], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'User created successfully' });
    });
};

// Atualizar usuário
exports.updateUser = (req, res) => {
    const { username, email, role, full_name } = req.body;
    
    const query = `
        UPDATE users 
        SET username = ?, email = ?, role = ?, full_name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    
    db.run(query, [username, email, role, full_name, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    });
};

// Deletar usuário
exports.deleteUser = (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
};