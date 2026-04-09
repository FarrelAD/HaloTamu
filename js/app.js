/**
 * ==========================================
 * LOGIKA APLIKASI (JANGAN DIEDIT KECUALI PERLU)
 * ==========================================
 */

// Initialize Theme Colors
function initTheme() {
    document.documentElement.style.setProperty('--primary-color', CONFIG.theme.primary);
    document.documentElement.style.setProperty('--accent-color', CONFIG.theme.accent);
    document.documentElement.style.setProperty('--bg-color', CONFIG.theme.background);
    
    const successScreen = document.getElementById('success-screen');
    const confirmBtn = document.getElementById('confirm-btn');
    const modalTitle = document.getElementById('modal-title');
    
    if (successScreen) successScreen.style.backgroundColor = CONFIG.theme.primary;
    if (confirmBtn) confirmBtn.style.backgroundColor = CONFIG.theme.primary;
    if (modalTitle) modalTitle.style.color = CONFIG.theme.primary;
}

const screens = ['home', 'schedule', 'map', 'visitors'];
let currentScreenIndex = 0;
let idleTimer;
let slideshowInterval;
const app = document.getElementById('app');
const progressBar = document.getElementById('carousel-progress');

// Dynamic Rendering Functions
function initApp() {
    initTheme();
    renderSidebar();
    renderTicker();
    renderHeader();
    
    // Bind Screen Data
    bindScreenData();
    
    // Populate dynamic lists
    populateSchedule();
    populateVisitors();
    populateMap();
    
    updateClock();
    setInterval(updateClock, 1000);
    
    resetIdleTimer();
    navigate('home');
}

function bindScreenData() {
    // Bind Dashboard Data
    const titleEl = document.getElementById('dashboard-title');
    const subtitleEl = document.getElementById('dashboard-subtitle');
    const countEl = document.getElementById('visitor-count');
    const prevLabelEl = document.getElementById('visitor-preview-label');
    const prevSummaryEl = document.getElementById('visitor-preview-summary');

    if (titleEl) titleEl.textContent = CONFIG.dashboard.title;
    if (subtitleEl) subtitleEl.textContent = CONFIG.dashboard.subtitle;
    if (countEl) countEl.textContent = CONFIG.visitors.length;
    if (prevLabelEl) prevLabelEl.textContent = CONFIG.dashboard.visitorPreviewLabel;
    if (prevSummaryEl) prevSummaryEl.textContent = CONFIG.dashboard.visitorPreviewSummary;
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const icons = {
        home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        schedule: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
        map: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>',
        visitors: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
    };
    const labels = { home: 'Beranda', schedule: 'Jadwal', map: 'Peta', visitors: 'Tamu' };

    sidebar.innerHTML = '';
    screens.forEach(s => {
        const btn = document.createElement('button');
        btn.id = `nav-${s}`;
        btn.className = 'nav-btn flex flex-col items-center gap-1 p-3 w-20 rounded-xl hover:bg-black/10 transition-all';
        btn.onclick = () => navigate(s);
        btn.innerHTML = `${icons[s]}<span class="text-[10px] font-bold uppercase tracking-wider">${labels[s]}</span>`;
        sidebar.appendChild(btn);
    });
}

function renderTicker() {
    const target = document.getElementById('ticker-target');
    if (!target) return;
    target.innerHTML = CONFIG.event.ticker.map(msg => `<span class="ticker-item">${msg}</span>`).join('');
}

function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;
    header.innerHTML = `
        <div>
            <h2 class="text-sm font-semibold tracking-widest uppercase" style="color:var(--primary-color)">Acara: ${CONFIG.event.name}</h2>
            <div id="clock" class="text-2xl font-bold text-slate-800">00:00</div>
        </div>
        <div class="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <span class="w-2 h-2 bg-purple-600 rounded-full animate-ping"></span>
            Status: Berlangsung
        </div>
    `;
}

function populateSchedule() {
    const target = document.getElementById('schedule-list-target');
    const template = document.getElementById('template-schedule-item');
    if (!target || !template) return;

    target.innerHTML = '';
    CONFIG.schedule.forEach(item => {
        const clone = template.content.cloneNode(true);
        const container = clone.querySelector('.schedule-item');
        
        clone.querySelector('.item-time').textContent = item.time;
        clone.querySelector('.item-title').textContent = item.title;

        // Styling based on status
        if (item.status === 'current') {
            container.classList.add('border-[#1e297a]', 'bg-purple-50', 'pulse-soft');
            clone.querySelector('.item-time').classList.add('text-[#1e297a]');
            clone.querySelector('.item-status-badge').innerHTML = '<span class="bg-[#1e3a8a] text-white px-4 py-1 rounded-full text-xs font-bold uppercase animate-pulse">Sekarang</span>';
        } else {
            container.classList.add('border-purple-200');
            clone.querySelector('.item-time').classList.add('text-slate-400');
        }

        if (item.status === 'completed') {
            container.classList.add('opacity-60');
            clone.querySelector('.item-title').classList.add('line-through', 'text-slate-400');
            clone.querySelector('.item-status-badge').innerHTML = '<span class="text-slate-400 text-xs font-bold uppercase">Selesai</span>';
        }

        target.appendChild(clone);
    });
}

function populateVisitors() {
    const target = document.getElementById('visitor-list-target');
    const template = document.getElementById('template-visitor-card');
    if (!target || !template) return;

    target.innerHTML = '';
    CONFIG.visitors.forEach(name => {
        const clone = template.content.cloneNode(true);
        const initials = name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        
        const avatar = clone.querySelector('.visitor-avatar');
        avatar.textContent = initials;
        avatar.style.backgroundColor = 'var(--accent-color)';
        
        clone.querySelector('.visitor-name').textContent = name;
        target.appendChild(clone);
    });
}

function populateMap() {
    const svg = document.getElementById('map-svg');
    if (!svg) return;

    // Static parts
    let html = `
        <rect x="20" y="20" width="360" height="260" rx="15" fill="white" stroke="#e2e8f0" stroke-width="2"/>
    `;

    // Dynamic Rooms
    CONFIG.map.rooms.forEach(room => {
        html += `
            <rect x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" rx="10" fill="rgba(30, 41, 122, 0.05)" stroke="var(--primary-color)" stroke-width="1.5" class="transition-all hover:fill-purple-50"/>
            <text x="${room.x + room.w/2}" y="${room.y + room.h/2}" text-anchor="middle" font-size="10" font-weight="bold" fill="var(--primary-color)">${room.name}</text>
        `;
    });

    // User Position
    html += `
        <g class="pulse-soft">
            <circle cx="${CONFIG.map.userPos.x}" cy="${CONFIG.map.userPos.y}" r="6" fill="var(--accent-color)"/>
            <circle cx="${CONFIG.map.userPos.x}" cy="${CONFIG.map.userPos.y}" r="12" fill="var(--accent-color)" opacity="0.2">
                <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
            </circle>
        </g>
        <text x="${CONFIG.map.userPos.x - 10}" y="${CONFIG.map.userPos.y + 4}" font-size="8" font-weight="bold" fill="var(--accent-color)" text-anchor="end">${CONFIG.map.userPos.label}</text>
    `;

    svg.innerHTML = html;
}

// Clock & Navigation Logic
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    clockEl.textContent = timeStr;
}

function navigate(screenId, isAuto = false) {
    if (!isAuto) wakeUp();
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('screen-' + screenId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
    const activeNav = document.getElementById('nav-' + screenId);
    if (activeNav) activeNav.classList.add('active-nav');
    
    if (!isAuto) currentScreenIndex = screens.indexOf(screenId);
}

// Slideshow Logic
function startSlideshow() {
    stopSlideshow();
    if (!progressBar) return;
    progressBar.classList.add('show-progress');
    slideshowInterval = setInterval(() => {
        currentScreenIndex = (currentScreenIndex + 1) % screens.length;
        navigate(screens[currentScreenIndex], true);
        progressBar.classList.remove('show-progress');
        void progressBar.offsetWidth;
        progressBar.classList.add('show-progress');
    }, 8000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    if (progressBar) progressBar.classList.remove('show-progress');
}

function wakeUp() {
    stopSlideshow();
    resetIdleTimer();
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        startSlideshow();
    }, 20000); 
}

// Functional Logics
function showCheckIn(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('check-in-modal');
    if (modal) modal.classList.remove('hidden');
}

function hideCheckIn(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('check-in-modal');
    if (modal) modal.classList.add('hidden');
}

function completeCheckIn(e) {
    if (e) e.stopPropagation();
    const nameInput = document.getElementById('name-input');
    const name = (nameInput ? nameInput.value.trim() : '') || 'Tamu';
    const userNameDisplay = document.getElementById('user-name-display');
    if (userNameDisplay) userNameDisplay.textContent = name;
    
    const successScreen = document.getElementById('success-screen');
    if (successScreen) successScreen.classList.remove('hidden');
    
    setTimeout(() => resetApp(), 5000);
}

function resetApp() {
    const successScreen = document.getElementById('success-screen');
    const checkInModal = document.getElementById('check-in-modal');
    const nameInput = document.getElementById('name-input');
    
    if (successScreen) successScreen.classList.add('hidden');
    if (checkInModal) checkInModal.classList.add('hidden');
    if (nameInput) nameInput.value = '';
    navigate('home');
}

function filterVisitors() {
    const searchInput = document.getElementById('visitor-search');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.visitor-card').forEach(card => {
        const name = card.querySelector('.visitor-name').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'flex' : 'none';
    });
}

// Run
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    document.addEventListener('contextmenu', event => event.preventDefault());
});

// Global functions must still be accessible via onclick in template
window.wakeUp = wakeUp;
window.navigate = navigate;
window.showCheckIn = showCheckIn;
window.hideCheckIn = hideCheckIn;
window.completeCheckIn = completeCheckIn;
window.resetApp = resetApp;
window.filterVisitors = filterVisitors;
