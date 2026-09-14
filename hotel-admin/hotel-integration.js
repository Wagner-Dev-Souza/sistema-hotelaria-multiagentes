// Configuração de Integração Frontend-Backend
// Adicionar este script ao frontend para conectar com o backend

const API_CONFIG = {
    BASE_URL: 'http://localhost:3001/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json'
    }
};

// Funções de API para integrar frontend com backend
class HotelAPI {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: API_CONFIG.HEADERS,
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Room management
    async getRooms() {
        return this.request('/rooms');
    }

    async getRoomById(id) {
        return this.request(`/rooms/${id}`);
    }

    async createRoom(roomData) {
        return this.request('/rooms', {
            method: 'POST',
            body: JSON.stringify(roomData)
        });
    }

    async updateRoom(id, roomData) {
        return this.request(`/rooms/${id}`, {
            method: 'PUT',
            body: JSON.stringify(roomData)
        });
    }

    async deleteRoom(id) {
        return this.request(`/rooms/${id}`, {
            method: 'DELETE'
        });
    }

    // Guest management
    async getGuests() {
        return this.request('/guests');
    }

    async getGuestById(id) {
        return this.request(`/guests/${id}`);
    }

    async createGuest(guestData) {
        return this.request('/guests', {
            method: 'POST',
            body: JSON.stringify(guestData)
        });
    }

    async updateGuest(id, guestData) {
        return this.request(`/guests/${id}`, {
            method: 'PUT',
            body: JSON.stringify(guestData)
        });
    }

    async deleteGuest(id) {
        return this.request(`/guests/${id}`, {
            method: 'DELETE'
        });
    }

    // Reservation management
    async getReservations() {
        return this.request('/reservations');
    }

    async getReservationById(id) {
        return this.request(`/reservations/${id}`);
    }

    async createReservation(reservationData) {
        return this.request('/reservations', {
            method: 'POST',
            body: JSON.stringify(reservationData)
        });
    }

    async updateReservation(id, reservationData) {
        return this.request(`/reservations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(reservationData)
        });
    }

    async deleteReservation(id) {
        return this.request(`/reservations/${id}`, {
            method: 'DELETE'
        });
    }

    // User management
    async login(userData) {
        return this.request('/users/login', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async getUsers() {
        return this.request('/users');
    }

    async getUserById(id) {
        return this.request(`/users/${id}`);
    }
}

// Initialize API instance
const hotelAPI = new HotelAPI();

// Export for use in frontend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = hotelAPI;
} else if (typeof window !== 'undefined') {
    window.hotelAPI = hotelAPI;
}

// Example usage for frontend integration
/*
// Usage in frontend JavaScript:
async function loadRooms() {
    try {
        const rooms = await hotelAPI.getRooms();
        console.log('Rooms:', rooms);
        // Update UI with rooms data
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

// Usage in HTML forms:
async function handleRoomSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const roomData = {
        room_number: formData.get('room_number'),
        type: formData.get('type'),
        capacity: parseInt(formData.get('capacity')),
        price_per_night: parseFloat(formData.get('price_per_night')),
        status: formData.get('status')
    };

    try {
        const result = await hotelAPI.createRoom(roomData);
        console.log('Room created:', result);
        // Show success message and refresh room list
    } catch (error) {
        console.error('Error creating room:', error);
        // Show error message
    }
}
*/