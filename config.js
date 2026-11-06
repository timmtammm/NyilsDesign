/* ==========================================================================
CONFIG.JS — FILE UTAMA UNTUK MENGGANTI ISI & TEMA UMKM
========================================================================== */
const SITE = {
    /* ------------------------------ 1. IDENTITAS ------------------------------ */
    brand: "Nyils Design",
    bio: "Desain logo, kemasan & konten sosmed untuk UMKM.",
    avatar: "img/logo.jpg",        // ✅ GANTI: path ke gambar logo
    whatsapp: "6281234567890",

  
    /* -------------------------------- 2. WARNA -------------------------------- */
    colors: {
      primary: "#4F46E5",
      accent:  "#FFE45C"
    },
    light: {
      paper: "#F8FAFC",
      card:  "#FFFFFF",
      ink:   "#1E293B",
      line:  "#E2E8F0"
    },
    dark: {
      paper: "#020617",
      card:  "#0F172A",
      ink:   "#F8FAFC",
      line:  "#1E293B"
    },
  
    /* ------------------------------ 3. MENU (TAB) ------------------------------ */
    linksTitle: "Link Saya",
    menus: [
      { id: "semua",   label: "Semua"   },
      { id: "sosmed",  label: "Sosmed"  },
      { id: "project", label: "Project" }
    ],
    defaultTab: "semua",
    tabSections: {
      semua:   ["layanan", "portofolio", "pesan"],
      sosmed:  [],
      project: ["portofolio"]
    },
    sections: {
      layanan:    true,
      portofolio: true,
      pesan:      true
    },
  
    /* --------------------------------- 4. LINK --------------------------------- */
    links: [
        { group: "sosmed",  icon: "img/instagram.png", label: "Instagram", url: "https://instagram.com/" },
        { group: "sosmed",  icon: "img/tiktok.png",    label: "TikTok",    url: "https://tiktok.com/" },
        { group: "sosmed",  icon: "img/behance.png",   label: "Shopee",   url: "https://shopee.co.id/" },
        { group: "project", icon: "💬", label: "Pesan via WhatsApp",    url: "#pesan" },
        { group: "project", icon: "🎨", label: "Portofolio",       url: "https://behance.net/" },
        { group: "project", icon: "📄", label: "Katalog Lengkap (PDF)", url: "https://example.com/katalog.pdf" }
      ],
  
    /* ----------------------------- 5. LAYANAN & HARGA ----------------------------- */
    services: [
      { name: "Logo Brand",      price: "Rp 150.000", desc: "2 konsep, 3x revisi, file PNG + vektor." },
      { name: "Desain Kemasan",  price: "Rp 200.000", desc: "Label/box produk siap cetak." },
      { name: "Paket Konten IG", price: "Rp 250.000", desc: "10 feed, request tema" },
      { name: "Banner",   price: "Rp 100.000", desc: "Satu halaman, ukuran bisa request" }
    ],
  
    /* ------------------------- 6. PORTOFOLIO & FOOTER ------------------------- */
    portfolio: [
      { title: "Logo Ideas",  tag: "Logo",    image: "img/n.jpg", color: "#FFE45C" },
      { title: "Box Carica",   tag: "Kemasan", image: "img/k1.jpg", color: "#FF8FB8" },
      { title: "Feed Toko Baju", tag: "Sosmed",  image: "img/Feed.jpeg", color: "#9EE7C4" },
      { title: "Banner Sanhouse",     tag: "Cetak",   image: "img/c2.jpg", color: "#B9C2FF" }
    ],
    footer: "© 2026 Nyils Design. Dibuat sebagai Final Project Add Class Web Developer."
  };