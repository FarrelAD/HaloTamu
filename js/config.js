/**
 * ==========================================
 * TEMA & KONFIGURASI (EDIT DI SINI)
 * ==========================================
 */
const CONFIG = {
    theme: {
        primary: "#1e3a8a", // Default Blue
        accent: "#3b82f6",  // Bright Blue
        background: "#ffffff"
    },
    event: {
        name: "ACARA ANDA",
        fullName: "Grand Opening & Tech Showcase 2025",
        ticker: [
            "Selamat Datang di Acara Grand Opening Kami!",
            "Gunakan Menu 'Check-in Mandiri' untuk mencatat kehadiran Anda",
            "Koneksi Wi-Fi: NAMA_WIFI_ACARA (tanpa password)",
            "Terima kasih atas kunjungan Anda hari ini!"
        ]
    },
    // Metadata Screen Dashboard
    dashboard: {
        title: "Selamat Datang",
        subtitle: "Silakan pilih menu untuk informasi lebih lanjut",
        visitorPreviewLabel: "Tamu Terdaftar",
        visitorPreviewSummary: "Daftar tamu yang telah hadir di lokasi"
    },
    // Daftar Tamu (Hardcoded Dummy)
    visitors: [
        "Budi Santoso", "Siti Aminah", "Andi Wijaya", 
        "Rina Pratama", "Eko Prasetyo", "Dewi Lestari", 
        "Agus Kurniawan", "Lani Wijaya", "Rudi Hermawan", 
        "Maya Indah", "Fajar Ramadhan", "Sinta Bella", 
        "Hendra Saputra", "Yuni Kartika", "Doni Setiawan"
    ],
    // Agenda Acara
    schedule: [
        { time: "08:00 - 09:00", title: "Registrasi & Coffee Morning", status: "completed" },
        { time: "09:00 - 10:00", title: "Pembukaan & Sambutan", status: "completed" },
        { time: "10:00 - 12:00", title: "Sesi Utama: Presentasi Produk", status: "current" },
        { time: "12:00 - 13:00", title: "Istirahat & Makan Siang", status: "upcoming" },
        { time: "13:00 - 15:00", title: "Workshop & Sesi Tanya Jawab", status: "upcoming" },
        { time: "15:00 - 16:00", title: "Networking & Penutup", status: "upcoming" }
    ],
    // Peta Lokasi
    map: {
        rooms: [
            { id: "utama", name: "Ruang Utama", x: 40, y: 40, w: 160, h: 220, type: "primary" },
            { id: "media", name: "Ruang Media", x: 220, y: 40, w: 130, h: 90, type: "secondary" },
            { id: "istirahat", name: "Area Istirahat", x: 220, y: 170, w: 130, h: 90, type: "accent" }
        ],
        userPos: { x: 210, y: 150, label: "LOKASI ANDA" }
    }
};
