const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rotas
const roomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const guestRoutes = require('./routes/guestRoutes');
const userRoutes = require('./routes/userRoutes');

// Importar middlewares
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas públicas
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);

// Rotas protegidas
app.use('/api/reservations', authMiddleware);
app.use('/api/users', authMiddleware);

// Rota de teste
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Hotel Management API is running' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;