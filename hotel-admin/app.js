// Hotel Admin Application - JavaScript
class HotelAdminApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.rooms = [];
        this.reservations = [];
        this.guests = [];
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupNavigation();
        this.setupEventListeners();
        this.showPage('dashboard');
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupEventListeners() {
        // Search functionality
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleSearch(e.target.value, e.target.closest('.search-container').dataset.page);
            });
        });

        // Filter functionality
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleFilter(e.target.value, e.target.dataset.page);
            });
        });

        // Modal close events
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    // Page Navigation
    showPage(pageName) {
        this.currentPage = pageName;
        
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.style.display = 'none';
        });

        // Show current page
        const currentPageElement = document.getElementById(`${pageName}-page`);
        if (currentPageElement) {
            currentPageElement.style.display = 'block';
            currentPageElement.classList.add('fade-in');
        }

        // Load page-specific data
        this.loadPageData(pageName);
    }

    loadPageData(pageName) {
        switch(pageName) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'quartos':
                this.loadRoomsData();
                break;
            case 'reservas':
                this.loadReservationsData();
                break;
            case 'hospedes':
                this.loadGuestsData();
                break;
        }
    }

    // Data Management
    loadSampleData() {
        // Load from localStorage or create sample data
        const savedRooms = localStorage.getItem('hotelRooms');
        const savedReservations = localStorage.getItem('hotelReservations');
        const savedGuests = localStorage.getItem('hotelGuests');

        if (savedRooms) {
            this.rooms = JSON.parse(savedRooms);
        } else {
            this.rooms = [
                { id: 1, number: '101', type: 'Simples', capacity: 2, price: 120, status: 'disponivel' },
                { id: 2, number: '102', type: 'Simples', capacity: 2, price: 120, status: 'ocupado' },
                { id: 3, number: '201', type: 'Duplo', capacity: 4, price: 200, status: 'disponivel' },
                { id: 4, number: '202', type: 'Duplo', capacity: 4, price: 200, status: 'manutencao' },
                { id: 5, number: '301', type: 'Suíte', capacity: 6, price: 350, status: 'disponivel' },
                { id: 6, number: '302', type: 'Suíte', capacity: 6, price: 350, status: 'ocupado' },
                { id: 7, number: '401', type: 'Presidencial', capacity: 8, price: 500, status: 'disponivel' },
                { id: 8, number: '402', type: 'Presidencial', capacity: 8, price: 500, status: 'disponivel' }
            ];
            this.saveData();
        }

        if (savedReservations) {
            this.reservations = JSON.parse(savedReservations);
        } else {
            this.reservations = [
                { id: 1, guestName: 'João Silva', roomNumber: '101', checkIn: '2024-01-15', checkOut: '2024-01-18', status: 'confirmada', total: 360 },
                { id: 2, guestName: 'Maria Santos', roomNumber: '201', checkIn: '2024-01-16', checkOut: '2024-01-20', status: 'confirmada', total: 800 },
                { id: 3, guestName: 'Pedro Alves', roomNumber: '302', checkIn: '2024-01-14', checkOut: '2024-01-17', status: 'checkin', total: 1050 },
                { id: 4, guestName: 'Ana Paula', roomNumber: '401', checkIn: '2024-01-18', checkOut: '2024-01-22', status: 'confirmada', total: 2000 },
                { id: 5, guestName: 'Carlos Mendes', roomNumber: '102', checkIn: '2024-01-12', checkOut: '2024-01-14', status: 'checkout', total: 240 }
            ];
            this.saveData();
        }

        if (savedGuests) {
            this.guests = JSON.parse(savedGuests);
        } else {
            this.guests = [
                { id: 1, name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 99999-1111', document: '123.456.789-00', registrationDate: '2024-01-10' },
                { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', phone: '(11) 99999-2222', document: '987.654.321-00', registrationDate: '2024-01-08' },
                { id: 3, name: 'Pedro Alves', email: 'pedro.alves@email.com', phone: '(11) 99999-3333', document: '456.789.123-00', registrationDate: '2024-01-05' },
                { id: 4, name: 'Ana Paula', email: 'ana.paula@email.com', phone: '(11) 99999-4444', document: '321.654.987-00', registrationDate: '2024-01-03' },
                { id: 5, name: 'Carlos Mendes', email: 'carlos.mendes@email.com', phone: '(11) 99999-5555', document: '789.123.456-00', registrationDate: '2024-01-01' }
            ];
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('hotelRooms', JSON.stringify(this.rooms));
        localStorage.setItem('hotelReservations', JSON.stringify(this.reservations));
        localStorage.setItem('hotelGuests', JSON.stringify(this.guests));
    }

    // Dashboard Functions
    loadDashboardData() {
        const occupancy = this.calculateOccupancy();
        const revenue = this.calculateRevenue();
        const activeReservations = this.getActiveReservations();
        const totalGuests = this.getTotalGuests();

        this.updateDashboardMetrics(occupancy, revenue, activeReservations, totalGuests);
        this.updateDashboardCharts();
    }

    calculateOccupancy() {
        const totalRooms = this.rooms.length;
        const occupiedRooms = this.rooms.filter(room => room.status === 'ocupado').length;
        return totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
    }

    calculateRevenue() {
        const today = new Date().toISOString().split('T')[0];
        const todayReservations = this.reservations.filter(res => 
            res.checkIn <= today && res.checkOut >= today && res.status !== 'cancelada'
        );
        return todayReservations.reduce((sum, res) => sum + res.total, 0);
    }

    getActiveReservations() {
        const today = new Date().toISOString().split('T')[0];
        return this.reservations.filter(res => 
            res.checkIn <= today && res.checkOut >= today && res.status !== 'cancelada'
        ).length;
    }

    getTotalGuests() {
        const today = new Date().toISOString().split('T')[0];
        return this.reservations.filter(res => 
            res.checkIn <= today && res.checkOut >= today && res.status === 'checkin'
        ).reduce((sum, res) => sum + 2, 0); // Assuming 2 guests per reservation
    }

    updateDashboardMetrics(occupancy, revenue, activeReservations, totalGuests) {
        document.getElementById('occupancy-value').textContent = `${occupancy}%`;
        document.getElementById('revenue-value').textContent = `R$ ${revenue.toLocaleString()}`;
        document.getElementById('reservations-value').textContent = activeReservations;
        document.getElementById('guests-value').textContent = totalGuests;

        // Update trend indicators (mock data for demo)
        this.updateTrendIndicators();
    }

    updateTrendIndicators() {
        // Mock trend data - in real app, this would compare with previous period
        const trends = [
            { id: 'occupancy-trend', value: '+5%', positive: true },
            { id: 'revenue-trend', value: '+12%', positive: true },
            { id: 'reservations-trend', value: '+3%', positive: true },
            { id: 'guests-trend', value: '+8%', positive: true }
        ];

        trends.forEach(trend => {
            const element = document.getElementById(trend.id);
            if (element) {
                element.textContent = trend.value;
                element.className = `metric-change ${trend.positive ? 'positive' : 'negative'}`;
            }
        });
    }

    updateDashboardCharts() {
        // Simple bar charts using CSS
        this.createOccupancyChart();
        this.createRevenueChart();
    }

    createOccupancyChart() {
        const occupancy = this.calculateOccupancy();
        const chartContainer = document.getElementById('occupancy-chart');
        if (chartContainer) {
            const filledWidth = (occupancy / 100) * 100;
            chartContainer.innerHTML = `
                <div class="chart-bar">
                    <div class="chart-fill" style="width: ${filledWidth}%"></div>
                </div>
                <div class="chart-label">${occupancy}% Ocupação</div>
            `;
        }
    }

    createRevenueChart() {
        const chartContainer = document.getElementById('revenue-chart');
        if (chartContainer) {
            // Simple revenue distribution by room type
            const revenueByType = this.getRevenueByType();
            const maxRevenue = Math.max(...Object.values(revenueByType));
            
            let chartHTML = '<div class="revenue-bars">';
            Object.entries(revenueByType).forEach(([type, revenue]) => {
                const percentage = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
                chartHTML += `
                    <div class="revenue-bar">
                        <div class="revenue-fill" style="width: ${percentage}%"></div>
                        <div class="revenue-label">${type}</div>
                        <div class="revenue-value">R$ ${revenue.toLocaleString()}</div>
                    </div>
                `;
            });
            chartHTML += '</div>';
            chartContainer.innerHTML = chartHTML;
        }
    }

    getRevenueByType() {
        const revenueByType = {};
        this.rooms.forEach(room => {
            revenueByType[room.type] = 0;
        });

        this.reservations.forEach(reservation => {
            const room = this.rooms.find(r => r.number === reservation.roomNumber);
            if (room && reservation.status !== 'cancelada') {
                revenueByType[room.type] += reservation.total;
            }
        });

        return revenueByType;
    }

    // Rooms Management
    loadRoomsData() {
        this.renderRoomsTable();
        this.setupRoomFilters();
    }

    renderRoomsTable(filteredRooms = null) {
        const roomsToRender = filteredRooms || this.rooms;
        const tbody = document.querySelector('#rooms-table tbody');
        if (!tbody) return;

        tbody.innerHTML = roomsToRender.map(room => `
            <tr>
                <td>${room.number}</td>
                <td>${room.type}</td>
                <td>${room.capacity}</td>
                <td>R$ ${room.price.toLocaleString()}</td>
                <td>
                    <span class="status-badge status-${room.status}">
                        ${this.getStatusText(room.status)}
                    </span>
                </td>
                <td class="no-print">
                    <button class="btn btn-sm btn-primary" onclick="app.editRoom(${room.id})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteRoom(${room.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'disponivel': 'Disponível',
            'ocupado': 'Ocupado',
            'manutencao': 'Manutenção'
        };
        return statusMap[status] || status;
    }

    setupRoomFilters() {
        const filterSelect = document.getElementById('room-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                if (filterValue === 'all') {
                    this.renderRoomsTable();
                } else {
                    const filtered = this.rooms.filter(room => room.status === filterValue);
                    this.renderRoomsTable(filtered);
                }
            });
        }
    }

    editRoom(roomId) {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) return;

        const modal = document.getElementById('room-modal');
        if (modal) {
            document.getElementById('room-number').value = room.number;
            document.getElementById('room-type').value = room.type;
            document.getElementById('room-capacity').value = room.capacity;
            document.getElementById('room-price').value = room.price;
            document.getElementById('room-status').value = room.status;
            
            modal.dataset.editId = roomId;
            this.showModal(modal);
        }
    }

    deleteRoom(roomId) {
        if (confirm('Tem certeza que deseja excluir este quarto?')) {
            this.rooms = this.rooms.filter(room => room.id !== roomId);
            this.saveData();
            this.loadRoomsData();
        }
    }

    // Reservations Management
    loadReservationsData() {
        this.renderReservationsTable();
        this.renderCalendar();
        this.setupReservationFilters();
    }

    renderReservationsTable(filteredReservations = null) {
        const reservationsToRender = filteredReservations || this.reservations;
        const tbody = document.querySelector('#reservations-table tbody');
        if (!tbody) return;

        tbody.innerHTML = reservationsToRender.map(reservation => `
            <tr>
                <td>${reservation.id}</td>
                <td>${reservation.guestName}</td>
                <td>${reservation.roomNumber}</td>
                <td>${this.formatDate(reservation.checkIn)}</td>
                <td>${this.formatDate(reservation.checkOut)}</td>
                <td>R$ ${reservation.total.toLocaleString()}</td>
                <td>
                    <span class="status-badge status-${reservation.status}">
                        ${this.getReservationStatusText(reservation.status)}
                    </span>
                </td>
                <td class="no-print">
                    <button class="btn btn-sm btn-primary" onclick="app.editReservation(${reservation.id})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="app.cancelReservation(${reservation.id})">
                        Cancelar
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getReservationStatusText(status) {
        const statusMap = {
            'confirmada': 'Confirmada',
            'checkin': 'Check-in',
            'checkout': 'Check-out',
            'cancelada': 'Cancelada'
        };
        return statusMap[status] || status;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    renderCalendar() {
        const calendar = document.getElementById('reservations-calendar');
        if (!calendar) return;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const calendarHTML = this.generateCalendarHTML(startDate, lastDay, currentMonth, currentYear);
        calendar.innerHTML = calendarHTML;
    }

    generateCalendarHTML(startDate, lastDay, currentMonth, currentYear) {
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        let html = `
            <div class="calendar-header">
                <h3>${monthNames[currentMonth]} ${currentYear}</h3>
                <div>
                    <button class="calendar-nav" onclick="app.changeMonth(-1)">‹</button>
                    <button class="calendar-nav" onclick="app.changeMonth(1)">›</button>
                </div>
            </div>
            <div class="calendar-grid">
        `;

        // Day headers
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });

        // Calendar days
        const currentDate = new Date(startDate);
        for (let i = 0; i < 42; i++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const isCurrentMonth = currentDate.getMonth() === currentMonth;
            const dayReservations = this.getReservationsForDate(dateStr);
            
            html += `<div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''}" 
                     onclick="app.selectDate('${dateStr}')">
                     ${currentDate.getDate()}
                     ${dayReservations.length > 0 ? `
                         <div class="reservation-indicator ${this.getDayIndicator(dayReservations[0])}"></div>
                     ` : ''}
                     </div>`;
            currentDate.setDate(currentDate.getDate() + 1);
        }

        html += '</div>';
        return html;
    }

    getReservationsForDate(date) {
        return this.reservations.filter(res => res.checkIn === date || res.checkOut === date);
    }

    getDayIndicator(reservation) {
        if (reservation.status === 'checkin') return 'checkin';
        if (reservation.status === 'checkout') return 'checkout';
        return 'reservation';
    }

    selectDate(date) {
        const reservations = this.getReservationsForDate(date);
        if (reservations.length > 0) {
            this.showReservationDetails(reservations[0]);
        }
    }

    changeMonth(direction) {
        // In a real app, this would update the calendar display
        console.log('Change month by', direction);
        this.renderCalendar();
    }

    showReservationDetails(reservation) {
        const modal = document.getElementById('reservation-details-modal');
        if (modal) {
            document.getElementById('detail-guest-name').textContent = reservation.guestName;
            document.getElementById('detail-room-number').textContent = reservation.roomNumber;
            document.getElementById('detail-check-in').textContent = this.formatDate(reservation.checkIn);
            document.getElementById('detail-check-out').textContent = this.formatDate(reservation.checkOut);
            document.getElementById('detail-total').textContent = `R$ ${reservation.total.toLocaleString()}`;
            document.getElementById('detail-status').textContent = this.getReservationStatusText(reservation.status);
            
            this.showModal(modal);
        }
    }

    setupReservationFilters() {
        const filterSelect = document.getElementById('reservation-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                if (filterValue === 'all') {
                    this.renderReservationsTable();
                } else {
                    const filtered = this.reservations.filter(res => res.status === filterValue);
                    this.renderReservationsTable(filtered);
                }
            });
        }
    }

    editReservation(reservationId) {
        const reservation = this.reservations.find(r => r.id === reservationId);
        if (!reservation) return;

        const modal = document.getElementById('reservation-modal');
        if (modal) {
            document.getElementById('reservation-guest-name').value = reservation.guestName;
            document.getElementById('reservation-room-number').value = reservation.roomNumber;
            document.getElementById('reservation-check-in').value = reservation.checkIn;
            document.getElementById('reservation-check-out').value = reservation.checkOut;
            document.getElementById('reservation-total').value = reservation.total;
            
            modal.dataset.editId = reservationId;
            this.showModal(modal);
        }
    }

    cancelReservation(reservationId) {
        if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
            const reservation = this.reservations.find(r => r.id === reservationId);
            if (reservation) {
                reservation.status = 'cancelada';
                this.saveData();
                this.loadReservationsData();
            }
        }
    }

    // Guests Management
    loadGuestsData() {
        this.renderGuestsTable();
        this.setupGuestFilters();
    }

    renderGuestsTable(filteredGuests = null) {
        const guestsToRender = filteredGuests || this.guests;
        const tbody = document.querySelector('#guests-table tbody');
        if (!tbody) return;

        tbody.innerHTML = guestsToRender.map(guest => `
            <tr>
                <td>${guest.id}</td>
                <td>${guest.name}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.document}</td>
                <td>${this.formatDate(guest.registrationDate)}</td>
                <td class="no-print">
                    <button class="btn btn-sm btn-primary" onclick="app.editGuest(${guest.id})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteGuest(${guest.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    setupGuestFilters() {
        const searchInput = document.getElementById('guest-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = this.guests.filter(guest => 
                    guest.name.toLowerCase().includes(searchTerm) ||
                    guest.email.toLowerCase().includes(searchTerm) ||
                    guest.document.toLowerCase().includes(searchTerm)
                );
                this.renderGuestsTable(filtered);
            });
        }
    }

    editGuest(guestId) {
        const guest = this.guests.find(g => g.id === guestId);
        if (!guest) return;

        const modal = document.getElementById('guest-modal');
        if (modal) {
            document.getElementById('guest-name').value = guest.name;
            document.getElementById('guest-email').value = guest.email;
            document.getElementById('guest-phone').value = guest.phone;
            document.getElementById('guest-document').value = guest.document;
            
            modal.dataset.editId = guestId;
            this.showModal(modal);
        }
    }

    deleteGuest(guestId) {
        if (confirm('Tem certeza que deseja excluir este hóspede?')) {
            this.guests = this.guests.filter(guest => guest.id !== guestId);
            this.saveData();
            this.loadGuestsData();
        }
    }

    // Modal Functions
    showModal(modal) {
        modal.style.display = 'block';
        modal.classList.add('fade-in');
    }

    closeModal(modal) {
        modal.style.display = 'none';
        modal.classList.remove('fade-in');
    }

    // Form Handlers
    handleFormSubmit(form) {
        const formType = form.id || form.dataset.formType;
        
        switch(formType) {
            case 'room-form':
                this.handleRoomForm(form);
                break;
            case 'reservation-form':
                this.handleReservationForm(form);
                break;
            case 'guest-form':
                this.handleGuestForm(form);
                break;
        }
    }

    handleRoomForm(form) {
        const editId = form.closest('.modal').dataset.editId;
        
        const roomData = {
            number: document.getElementById('room-number').value,
            type: document.getElementById('room-type').value,
            capacity: parseInt(document.getElementById('room-capacity').value),
            price: parseFloat(document.getElementById('room-price').value),
            status: document.getElementById('room-status').value
        };

        if (editId) {
            // Update existing room
            const roomIndex = this.rooms.findIndex(r => r.id === parseInt(editId));
            if (roomIndex !== -1) {
                this.rooms[roomIndex] = { ...this.rooms[roomIndex], ...roomData };
            }
        } else {
            // Add new room
            const newRoom = {
                id: Date.now(),
                ...roomData
            };
            this.rooms.push(newRoom);
        }

        this.saveData();
        this.loadRoomsData();
        this.closeModal(form.closest('.modal'));
        form.reset();
    }

    handleReservationForm(form) {
        const editId = form.closest('.modal').dataset.editId;
        
        const reservationData = {
            guestName: document.getElementById('reservation-guest-name').value,
            roomNumber: document.getElementById('reservation-room-number').value,
            checkIn: document.getElementById('reservation-check-in').value,
            checkOut: document.getElementById('reservation-check-out').value,
            total: parseFloat(document.getElementById('reservation-total').value),
            status: 'confirmada'
        };

        if (editId) {
            // Update existing reservation
            const reservationIndex = this.reservations.findIndex(r => r.id === parseInt(editId));
            if (reservationIndex !== -1) {
                this.reservations[reservationIndex] = { ...this.reservations[reservationIndex], ...reservationData };
            }
        } else {
            // Add new reservation
            const newReservation = {
                id: Date.now(),
                ...reservationData
            };
            this.reservations.push(newReservation);
        }

        this.saveData();
        this.loadReservationsData();
        this.closeModal(form.closest('.modal'));
        form.reset();
    }

    handleGuestForm(form) {
        const editId = form.closest('.modal').dataset.editId;
        
        const guestData = {
            name: document.getElementById('guest-name').value,
            email: document.getElementById('guest-email').value,
            phone: document.getElementById('guest-phone').value,
            document: document.getElementById('guest-document').value
        };

        if (editId) {
            // Update existing guest
            const guestIndex = this.guests.findIndex(g => g.id === parseInt(editId));
            if (guestIndex !== -1) {
                this.guests[guestIndex] = { ...this.guests[guestIndex], ...guestData };
            }
        } else {
            // Add new guest
            const newGuest = {
                id: Date.now(),
                ...guestData,
                registrationDate: new Date().toISOString().split('T')[0]
            };
            this.guests.push(newGuest);
        }

        this.saveData();
        this.loadGuestsData();
        this.closeModal(form.closest('.modal'));
        form.reset();
    }

    // Search Functions
    handleSearch(searchTerm, page) {
        switch(page) {
            case 'reservations':
                const filteredReservations = this.reservations.filter(res => 
                    res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    res.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
                );
                this.renderReservationsTable(filteredReservations);
                break;
            case 'guests':
                const filteredGuests = this.guests.filter(guest => 
                    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    guest.document.toLowerCase().includes(searchTerm.toLowerCase())
                );
                this.renderGuestsTable(filteredGuests);
                break;
        }
    }

    handleFilter(filterValue, page) {
        switch(page) {
            case 'quartos':
                if (filterValue === 'all') {
                    this.renderRoomsTable();
                } else {
                    const filtered = this.rooms.filter(room => room.status === filterValue);
                    this.renderRoomsTable(filtered);
                }
                break;
            case 'reservas':
                if (filterValue === 'all') {
                    this.renderReservationsTable();
                } else {
                    const filtered = this.reservations.filter(res => res.status === filterValue);
                    this.renderReservationsTable(filtered);
                }
                break;
        }
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new HotelAdminApp();
});