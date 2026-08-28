/* ==========================================================================
   MieAyamin POS - Application Logic (app.js)
   Features: POS Catalog, Customizer Modal, Cart & Checkout, Thermal Receipt,
             Kitchen Display (KDS), Stock Inventory Management, Revenue Reports,
             QR Customer Feedback, Role PIN Protection, Settings & Persistence.
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================
  // 1. DEFAULT DATASETS & INITIAL STATE
  // ==========================================

  const DEFAULT_MENU = [
    // Mie Ayam Category
    {
      id: 'mie-1',
      name: 'Mie Ayam Yamin Manis',
      cat: 'mie',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie kenyal topping ayam semur manis kecap khas Jawa & sawi segar.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'mie-2',
      name: 'Mie Ayam Asin Spesial',
      cat: 'mie',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie ayam bumbu gurih asin berkaldu lezat dengan minyak bawang khas.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'mie-3',
      name: 'Mie Ayam Jamur',
      cat: 'mie',
      price: 17000,
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie ayam topping kombinasi ayam semur & jamur merang kancing gurih.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'mie-4',
      name: 'Mie Ayam Komplit (Bakso + Pangsit)',
      cat: 'mie',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie ayam komplit dengan 2 bakso sapi & 2 pangsit goreng renyah.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }, { id: 'bakso', qty: 2 }, { id: 'pangsit', qty: 2 }]
    },
    {
      id: 'mie-5',
      name: 'Mie Ayam Spicy',
      cat: 'mie',
      price: 17000,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie ayam bumbu pedas membara rempah cabe spesial meresap.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'mie-6',
      name: 'Mie Ayam Ijo',
      cat: 'mie',
      price: 17000,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie ayam hijau dari ekstrak bayam organik sehat, lezat & kenyal.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'mie-7',
      name: 'Mie Yamin',
      cat: 'mie',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80',
      desc: 'Mie yamin khas otentik dengan bumbu kecap gurih manis pas.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    // Minuman & Jus Category
    {
      id: 'min-1',
      name: 'Es Teh Manis Jumbo',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80',
      desc: 'Es teh manis segar ukuran gelas jumbo.',
      ingredients: [{ id: 'teh', qty: 1 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'min-2',
      name: 'Teh Botol Sosro',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80',
      desc: 'Teh Botol Sosro dingin 450ml kemasan botol khas.',
      ingredients: [{ id: 'teh_botol', qty: 1 }]
    },
    {
      id: 'min-3',
      name: 'Teh Kotak Sosro',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80',
      desc: 'Teh Kotak Sosro segar 300ml.',
      ingredients: [{ id: 'teh_kotak', qty: 1 }]
    },
    {
      id: 'min-4',
      name: 'Es Jeruk Peras Asli',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 7000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Es jeruk peras segar asli tanpa pemanis buatan.',
      ingredients: [{ id: 'jeruk', qty: 2 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'min-5',
      name: 'Teh Hangat',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
      desc: 'Teh manis hangat pereda dahaga.',
      ingredients: [{ id: 'teh', qty: 1 }]
    },
    {
      id: 'min-6',
      name: 'Air Mineral Dingin (600ml)',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=500&q=80',
      desc: 'Air mineral botol 600ml dingin.',
      ingredients: [{ id: 'air_mineral', qty: 1 }]
    },
    {
      id: 'jus-1',
      name: 'Jus Sirsak',
      cat: 'minuman',
      subcat: 'jus_buah',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Jus buah sirsak manis asam segar alami.',
      ingredients: [{ id: 'sirsak', qty: 1 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'jus-2',
      name: 'Jus Jambu Biji',
      cat: 'minuman',
      subcat: 'jus_buah',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Jus jambu biji merah segar kental manis.',
      ingredients: [{ id: 'jambu', qty: 1 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'jus-3',
      name: 'Jus Alpukat',
      cat: 'minuman',
      subcat: 'jus_buah',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Jus alpukat kental dengan topping kental manis cokelat.',
      ingredients: [{ id: 'alpukat', qty: 1 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'jus-4',
      name: 'Jus Mangga',
      cat: 'minuman',
      subcat: 'jus_buah',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Jus mangga harum manis segar memanjakan dahaga.',
      ingredients: [{ id: 'mangga', qty: 1 }, { id: 'es_batu', qty: 1 }]
    },
    {
      id: 'jus-5',
      name: 'Jus Jeruk Segar',
      cat: 'minuman',
      subcat: 'jus_buah',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
      desc: 'Jus jeruk peras segar bervitamin C.',
      ingredients: [{ id: 'jeruk', qty: 2 }, { id: 'es_batu', qty: 1 }]
    },
    // Extra Topping Category
    {
      id: 'top-1',
      name: 'Extra Pangsit Goreng (3 pcs)',
      cat: 'topping',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80',
      desc: 'Pangsit goreng crispy renyah gurih.',
      ingredients: [{ id: 'pangsit', qty: 3 }]
    },
    {
      id: 'top-2',
      name: 'Extra Bakso Sapi (3 pcs)',
      cat: 'topping',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=500&q=80',
      desc: 'Bakso sapi halus kenyal gurih.',
      ingredients: [{ id: 'bakso', qty: 3 }]
    },
    {
      id: 'top-3',
      name: 'Extra Ceker Semur (3 pcs)',
      cat: 'topping',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80',
      desc: 'Ceker ayam empuk bumbu semur meresap.',
      ingredients: [{ id: 'ceker', qty: 3 }]
    },
    {
      id: 'top-4',
      name: 'Extra Ceker Pedas (3 pcs)',
      cat: 'topping',
      price: 6000,
      image: 'images/ceker_pedas.png',
      desc: 'Ceker ayam empuk bumbu pedas mercon meresap.',
      ingredients: [{ id: 'ceker', qty: 3 }]
    },
    // Aneka Kerupuk Category
    {
      id: 'samp-1',
      name: 'Pangsit Kuah (5 pcs)',
      cat: 'kerupuk',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80',
      desc: 'Pangsit rebus isi daging ayam disajikan dalam kuah kaldu hangat.',
      ingredients: [{ id: 'pangsit', qty: 5 }]
    },
    {
      id: 'samp-2',
      name: 'Kerupuk Kaleng Putih',
      cat: 'kerupuk',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80',
      desc: 'Pelengkap renyah santap mie ayam.',
      ingredients: [{ id: 'kerupuk', qty: 1 }]
    },
    {
      id: 'samp-3',
      name: 'Kerupuk Rambak / Gendar',
      cat: 'kerupuk',
      price: 3000,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80',
      desc: 'Kerupuk rambak gurih renyah.',
      ingredients: [{ id: 'kerupuk', qty: 1 }]
    }
  ];

  const DEFAULT_STOCK = {
    mie_basah: { name: 'Mie Basah Mentah', category: 'Mie & Ayam', stock: 85, min: 20, unit: 'porsi' },
    ayam_semur: { name: 'Ayam Semur', category: 'Mie & Ayam', stock: 90, min: 20, unit: 'porsi' },
    bakso: { name: 'Bakso Sapi', category: 'Topping', stock: 120, min: 30, unit: 'biji' },
    pangsit: { name: 'Pangsit Goreng/Kuah', category: 'Topping', stock: 150, min: 40, unit: 'biji' },
    ceker: { name: 'Ceker Semur', category: 'Topping', stock: 45, min: 15, unit: 'biji' },
    telur_puyuh: { name: 'Telur Puyuh Semur', category: 'Topping', stock: 50, min: 15, unit: 'biji' },
    teh: { name: 'Teh Celup / Tubruk', category: 'Minuman', stock: 200, min: 30, unit: 'porsi' },
    jeruk: { name: 'Jeruk Peras Segar', category: 'Minuman', stock: 60, min: 15, unit: 'buah' },
    es_batu: { name: 'Es Batu Kristal', category: 'Minuman', stock: 100, min: 20, unit: 'porsi' },
    air_mineral: { name: 'Air Mineral Botol', category: 'Minuman', stock: 48, min: 12, unit: 'botol' },
    kerupuk: { name: 'Kerupuk Kaleng', category: 'Side Dish', stock: 60, min: 15, unit: 'biji' }
  };

  const DEFAULT_TOPPINGS_LIST = [
    { id: 'top_pangsit', name: 'Extra Pangsit Goreng', price: 3000 },
    { id: 'top_bakso', name: 'Extra Bakso Sapi (1 pcs)', price: 3000 },
    { id: 'top_ceker', name: 'Extra Ceker Semur (1 pcs)', price: 3000 },
    { id: 'top_ceker_pedas', name: 'Extra Ceker Pedas (1 pcs)', price: 3000 }
  ];

  const DEFAULT_SETTINGS = {
    storeName: 'MieAyamin - Spesialis Mie Ayam & Yamin',
    storeAddress: 'Jl. Kuliner Raya No. 88, Jakarta',
    storePhone: '0812-3456-7890',
    storeFooter: 'Terima Kasih Atas Kunjungan Anda! Nikmati Kelezatan MieAyamin.',
    paperSize: '58mm',
    taxRate: 0
  };

  // Demo initial transactions for analytics
  const getDemoTransactions = () => {
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        id: '#MYA-1001',
        time: `${today} 11:20:00`,
        hour: 11,
        type: 'Dine-in',
        table: 'Meja 02',
        customer: 'Budi S.',
        items: [
          { name: 'Mie Ayam Yamin Manis (Lvl 1)', qty: 2, price: 15000, subtotal: 30000 },
          { name: 'Es Teh Manis Jumbo', qty: 2, price: 5000, subtotal: 10000 }
        ],
        subtotal: 40000,
        tax: 0,
        total: 40000,
        method: 'Tunai',
        paid: 50000,
        change: 10000,
        cashier: 'Kasir Shift 1',
        status: 'Selesai'
      },
      {
        id: '#MYA-1002',
        time: `${today} 12:45:00`,
        hour: 12,
        type: 'Dine-in',
        table: 'Meja 05',
        customer: 'Rina W.',
        items: [
          { name: 'Mie Ayam Komplit (Lvl 2)', qty: 1, price: 22000, subtotal: 22000 },
          { name: 'Mie Ayam Jamur', qty: 1, price: 17000, subtotal: 17000 },
          { name: 'Es Jeruk Peras Asli', qty: 2, price: 7000, subtotal: 14000 }
        ],
        subtotal: 53000,
        tax: 0,
        total: 53000,
        method: 'QRIS',
        paid: 53000,
        change: 0,
        cashier: 'Kasir Shift 1',
        status: 'Selesai'
      },
      {
        id: '#MYA-1003',
        time: `${today} 14:15:00`,
        hour: 14,
        type: 'Bungkus',
        table: '-',
        customer: 'Pak Hendra',
        items: [
          { name: 'Mie Ayam Asin Spesial (Lvl 3)', qty: 3, price: 15000, subtotal: 45000 },
          { name: 'Extra Pangsit Goreng', qty: 2, price: 5000, subtotal: 10000 }
        ],
        subtotal: 55000,
        tax: 0,
        total: 55000,
        method: 'Tunai',
        paid: 100000,
        change: 45000,
        cashier: 'Kasir Shift 1',
        status: 'Selesai'
      }
    ];
  };

  const getDemoKdsOrders = () => {
    return [
      {
        id: '#MYA-1004',
        type: 'Dine-in',
        table: 'Meja 04',
        customer: 'Doni',
        items: [
          { name: 'Mie Ayam Yamin Manis', notes: 'Tanpa daun bawang, seledri sedikit' },
          { name: 'Es Teh Manis Jumbo', notes: 'Manis sedang' }
        ],
        time: new Date(Date.now() - 12 * 60000).toISOString(),
        status: 'Sedang Dimasak'
      },
      {
        id: '#MYA-1005',
        type: 'Ojol',
        table: '-',
        customer: 'Driver Grab #882',
        items: [
          { name: 'Mie Ayam Komplit', notes: 'Kuah pisah, sambal dipisah' },
          { name: 'Es Jeruk Peras Asli', notes: 'Es sedikit' }
        ],
        time: new Date(Date.now() - 4 * 60000).toISOString(),
        status: 'Pesanan Masuk'
      }
    ];
  };

  const getDemoFeedback = () => {
    return [
      {
        id: 'fb-101',
        date: new Date(Date.now() - 3600000).toLocaleString('id-ID'),
        table: 'Meja 04',
        rating: 5,
        category: 'Makanan & Rasa',
        comment: 'Mie Ayam Yamin-nya rasanya otentik & lezat sekali! Kuah dipisah pas banget gurihnya.',
        contact: '0813-9988-7766',
        status: 'Belum Dibaca'
      },
      {
        id: 'fb-102',
        date: new Date(Date.now() - 7200000).toLocaleString('id-ID'),
        table: 'Meja 02',
        rating: 4,
        category: 'Pelayanan Kasir/Pelayan',
        comment: 'Pelayanan cepat dan ramah, porsi mie kenyang mantap.',
        contact: '0857-1122-3344',
        status: 'Belum Dibaca'
      }
    ];
  };

  // Sanitize old demo KDS orders in localStorage if they contain legacy spicy level strings
  (function sanitizeKdsLocalStorage() {
    try {
      const storedKds = localStorage.getItem('mya_kds');
      if (storedKds) {
        const parsed = JSON.parse(storedKds);
        let modified = false;
        parsed.forEach(o => {
          if (o.items) {
            o.items.forEach(it => {
              if (it.notes && (it.notes.includes('Level') || it.notes.includes('Kuah Campur') || it.notes.includes('Biasa'))) {
                if (it.name.includes('Yamin')) it.notes = 'Tanpa daun bawang, seledri sedikit';
                else if (it.name.includes('Komplit')) it.notes = 'Kuah pisah, sambal dipisah';
                else it.notes = 'Catatan khusus pelanggan';
                modified = true;
              }
            });
          }
        });
        if (modified) {
          localStorage.setItem('mya_kds', JSON.stringify(parsed));
        }
      }
    } catch(e) {}
  })();

  let state = {
    role: 'Kasir', // 'Kasir', 'Dapur', 'Owner'
    activeTab: 'posTab',
    settings: (function() { try { return JSON.parse(localStorage.getItem('mya_settings')) || DEFAULT_SETTINGS; } catch(e) { return DEFAULT_SETTINGS; } })(),
    stock: (function() { try { return JSON.parse(localStorage.getItem('mya_stock')) || DEFAULT_STOCK; } catch(e) { return DEFAULT_STOCK; } })(),
    transactions: (function() { try { return JSON.parse(localStorage.getItem('mya_transactions')) || getDemoTransactions(); } catch(e) { return getDemoTransactions(); } })(),
    kdsOrders: (function() { try { return JSON.parse(localStorage.getItem('mya_kds')) || getDemoKdsOrders(); } catch(e) { return getDemoKdsOrders(); } })(),
    feedbacks: (function() { try { return JSON.parse(localStorage.getItem('mya_feedback')) || getDemoFeedback(); } catch(e) { return getDemoFeedback(); } })(),
    customImages: (function() { try { return JSON.parse(localStorage.getItem('mya_custom_images')) || {}; } catch(e) { return {}; } })(),
    cart: [],
    orderType: 'Dine-in',
    selectedTable: 'Meja 01',
    custName: '',
    selectedCategory: 'all',
    selectedSubCategory: 'all',
    searchQuery: '',
    // Customizer Modal State
    customizingItem: null,
    editingImageItem: null,
    // Checkout State
    paymentMethod: 'Tunai',
    cashGiven: '',
    currentCheckoutTx: null,
    // Role Switcher PIN State
    targetRoleToSwitch: 'Kasir',
    enteredPin: ''
  };

  function saveState(key) {
    if (!key || key === 'settings') localStorage.setItem('mya_settings', JSON.stringify(state.settings));
    if (!key || key === 'stock') localStorage.setItem('mya_stock', JSON.stringify(state.stock));
    if (!key || key === 'transactions') localStorage.setItem('mya_transactions', JSON.stringify(state.transactions));
    if (!key || key === 'kds') localStorage.setItem('mya_kds', JSON.stringify(state.kdsOrders));
    if (!key || key === 'feedback') localStorage.setItem('mya_feedback', JSON.stringify(state.feedbacks));
    if (!key || key === 'custom_images') localStorage.setItem('mya_custom_images', JSON.stringify(state.customImages));
  }

  // Helper Toast Notification
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '⚠️';
    if (type === 'warning') icon = '🔔';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Format Currency
  function formatRp(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  }

  // Live Clock
  function initClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;

    const update = () => {
      const now = new Date();
      const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      clockEl.textContent = now.toLocaleDateString('id-ID', options).replace(/\./g, ':');
    };
    update();
    setInterval(update, 1000);
  }

  // ==========================================
  // 3. UI RENDERING MODULES
  // ==========================================

  // --- A. POS Menu Catalog ---
  function renderMenuCatalog() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const query = (state.searchQuery || '').toLowerCase().trim();
    const cat = state.selectedCategory || 'all';
    const subCat = state.selectedSubCategory || 'all';

    // Show sub-filter bar only when 'Minuman' category is selected
    const subFilterBar = document.getElementById('drinkSubFilters');
    if (subFilterBar) {
      subFilterBar.style.display = (cat === 'minuman') ? 'flex' : 'none';
    }

    const filtered = DEFAULT_MENU.filter(item => {
      let matchesCat = (cat === 'all' || item.cat === cat);
      if (cat === 'minuman' && subCat !== 'all') {
        matchesCat = matchesCat && (item.subcat === subCat);
      }
      const itemDesc = item.desc || '';
      const itemName = item.name || '';
      const matchesSearch = itemName.toLowerCase().includes(query) || itemDesc.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog" style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
          <p style="font-weight: 600;">Menu tidak ditemukan</p>
          <small>Coba gunakan kata kunci lain atau ganti kategori menu.</small>
        </div>
      `;
      return;
    }

    const customImgs = state.customImages || {};
    grid.innerHTML = filtered.map(item => {
      const imageSrc = customImgs[item.id] || item.image || '';

      // Check stock status
      let isAvailable = true;
      if (item.ingredients && state.stock) {
        for (const ing of item.ingredients) {
          const st = state.stock[ing.id];
          if (st && st.stock < ing.qty) {
            isAvailable = false;
            break;
          }
        }
      }

      return `
        <div class="menu-card ${!isAvailable ? 'out-of-stock' : ''}" data-id="${item.id}">
          <div class="menu-card-header">
            <div class="menu-card-img-wrapper">
              <img src="${imageSrc}" alt="${item.name}" class="menu-card-img">
              <button class="btn-edit-photo" data-id="${item.id}" title="Ubah foto menu">📷 Ubah Foto</button>
            </div>
            ${!isAvailable ? '<span class="stock-badge badge-danger" style="position:absolute; top:6px; left:6px; z-index:2;">Habis</span>' : ''}
          </div>
          <div class="menu-card-body">
            <h4>${item.name}</h4>
            <p class="menu-desc">${item.desc || ''}</p>
            <div class="menu-card-footer">
              <span class="menu-price">${formatRp(item.price)}</span>
              <div class="card-action-btns" style="display:flex; gap:6px;">
                <button class="btn btn-primary btn-sm btn-quick-add" ${!isAvailable ? 'disabled' : ''} title="Langsung tambah 1 porsi">
                  <span>➕ Tambah</span>
                </button>
                <button class="btn btn-secondary btn-sm btn-notes-add" ${!isAvailable ? 'disabled' : ''} title="Tambah dengan catatan khusus">
                  <span>📝 Catatan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Event Listeners for menu cards
    grid.querySelectorAll('.menu-card').forEach(card => {
      const id = card.dataset.id;
      const item = DEFAULT_MENU.find(m => m.id === id);
      if (!item) return;

      // Click "📷 Ubah Foto" button
      const editBtn = card.querySelector('.btn-edit-photo');
      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openEditImageModal(item);
        });
      }

      // Click "➕ Tambah" button (Direct Quick Add)
      const quickAddBtn = card.querySelector('.btn-quick-add');
      if (quickAddBtn) {
        quickAddBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          let isAvailable = true;
          if (item.ingredients && state.stock) {
            for (const ing of item.ingredients) {
              const st = state.stock[ing.id];
              if (st && st.stock < ing.qty) { isAvailable = false; break; }
            }
          }
          if (!isAvailable) {
            showToast(`Stok bahan untuk ${item.name} sedang habis!`, 'danger');
            return;
          }
          addToCartDirectly(item, '');
        });
      }

      // Click "📝 Catatan" button (Add with custom notes)
      const notesBtn = card.querySelector('.btn-notes-add');
      if (notesBtn) {
        notesBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          let isAvailable = true;
          if (item.ingredients && state.stock) {
            for (const ing of item.ingredients) {
              const st = state.stock[ing.id];
              if (st && st.stock < ing.qty) { isAvailable = false; break; }
            }
          }
          if (!isAvailable) {
            showToast(`Stok bahan untuk ${item.name} sedang habis!`, 'danger');
            return;
          }
          openCustomizerModal(item);
        });
      }

      // Click card body (default opens customizer)
      card.addEventListener('click', () => {
        let isAvailable = true;
        if (item.ingredients && state.stock) {
          for (const ing of item.ingredients) {
            const st = state.stock[ing.id];
            if (st && st.stock < ing.qty) { isAvailable = false; break; }
          }
        }
        if (!isAvailable) {
          showToast(`Stok bahan untuk ${item.name} sedang habis!`, 'danger');
          return;
        }
        openCustomizerModal(item);
      });
    });
  }

  // --- B. Cart System ---
  function addToCartDirectly(item, notes = '') {
    const existingIndex = state.cart.findIndex(c => c.id === item.id && c.notesText === notes);
    if (existingIndex >= 0) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: item.id + '_' + Date.now(),
        name: item.name,
        unitPrice: item.price,
        totalPrice: item.price,
        qty: 1,
        customized: !!notes,
        notesText: notes,
        ingredients: item.ingredients || []
      });
    }
    renderCart();
    showToast(`Berhasil menambahkan ${item.name}`, 'success');
  }

  function renderCart() {
    const list = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const totalEl = document.getElementById('cartTotal');
    const btnCheckout = document.getElementById('btnCheckout');
    const taxRateText = document.getElementById('taxRateText');

    if (!list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon-badge">
            <span class="empty-icon">🍜</span>
          </div>
          <p class="empty-title">Keranjang Masih Kosong</p>
          <small class="empty-subtitle">Pilih menu di sebelah kiri untuk menambahkan item ke pesanan ini</small>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatRp(0);
      if (taxEl) taxEl.textContent = formatRp(0);
      if (totalEl) totalEl.textContent = formatRp(0);
      if (btnCheckout) btnCheckout.disabled = true;
      return;
    }

    let subtotal = 0;
    list.innerHTML = state.cart.map((c, idx) => {
      const itemTotal = c.totalPrice * c.qty;
      subtotal += itemTotal;

      return `
        <div class="cart-item-row">
          <div class="cart-item-details">
            <div class="cart-item-title">
              <strong>${c.name}</strong>
              <span class="cart-item-price">${formatRp(c.totalPrice)}</span>
            </div>
            ${c.notesText ? `<small class="cart-item-notes">Catatan: ${c.notesText}</small>` : ''}
          </div>
          <div class="cart-item-actions">
            <button class="btn-qty btn-minus" data-idx="${idx}">-</button>
            <span class="qty-num">${c.qty}</span>
            <button class="btn-qty btn-plus" data-idx="${idx}">+</button>
            <button class="btn-remove-item" data-idx="${idx}" title="Hapus Item">&times;</button>
          </div>
        </div>
      `;
    }).join('');

    const taxRate = state.settings.taxRate || 0;
    const taxAmount = Math.round(subtotal * (taxRate / 100));
    const grandTotal = subtotal + taxAmount;

    if (taxRateText) taxRateText.textContent = `${taxRate}%`;
    if (subtotalEl) subtotalEl.textContent = formatRp(subtotal);
    if (taxEl) taxEl.textContent = formatRp(taxAmount);
    if (totalEl) totalEl.textContent = formatRp(grandTotal);
    if (btnCheckout) btnCheckout.disabled = false;

    // Cart Action listeners
    list.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        if (state.cart[idx].qty > 1) {
          state.cart[idx].qty -= 1;
        } else {
          state.cart.splice(idx, 1);
        }
        renderCart();
      });
    });

    list.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        state.cart[idx].qty += 1;
        renderCart();
      });
    });

    list.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        state.cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  // --- C. Customizer Modal (Simplified to Notes Only) ---
  function openCustomizerModal(item) {
    state.customizingItem = item;
    const modal = document.getElementById('customizerModal');
    const imageSrc = state.customImages[item.id] || item.image || '';

    document.getElementById('customizerMenuName').textContent = item.name;
    document.getElementById('customizerMenuBasePrice').textContent = formatRp(item.price);
    document.getElementById('customizerCalculatedPrice').textContent = formatRp(item.price);
    document.getElementById('customizerNotes').value = '';

    const imgEl = document.getElementById('customizerMenuImg');
    if (imgEl) {
      imgEl.src = imageSrc;
      imgEl.style.display = 'block';
    }

    modal.classList.add('active');
  }

  function closeCustomizerModal() {
    const modal = document.getElementById('customizerModal');
    if (modal) modal.classList.remove('active');
    state.customizingItem = null;
  }

  // --- C2. Edit Image Modal (Fitur Tambah Foto Menu) ---
  function openEditImageModal(item) {
    state.editingImageItem = item;
    const modal = document.getElementById('editImageModal');
    const imageSrc = state.customImages[item.id] || item.image || '';

    document.getElementById('editImageMenuName').textContent = item.name;
    document.getElementById('editImagePreview').src = imageSrc;
    document.getElementById('editImageUrlInput').value = imageSrc;
    document.getElementById('editImageFileInput').value = '';

    modal.classList.add('active');
  }

  function closeEditImageModal() {
    const modal = document.getElementById('editImageModal');
    if (modal) modal.classList.remove('active');
    state.editingImageItem = null;
  }

  // --- D. Checkout Modal & Payment ---
  function openCheckoutModal() {
    if (state.cart.length === 0) return;

    let subtotal = 0;
    state.cart.forEach(c => subtotal += (c.totalPrice * c.qty));
    const taxRate = state.settings.taxRate || 0;
    const taxAmount = Math.round(subtotal * (taxRate / 100));
    const grandTotal = subtotal + taxAmount;

    const custName = document.getElementById('custNameInput').value.trim() || 'Umum';
    state.custName = custName;

    document.getElementById('coOrderType').textContent = state.orderType === 'Dine-in' ? `Dine-in (${state.selectedTable})` : state.orderType;
    document.getElementById('coCustName').textContent = custName;
    document.getElementById('coTotalAmount').textContent = formatRp(grandTotal);
    document.getElementById('qrisAmountText').textContent = `Total: ${formatRp(grandTotal)}`;

    state.paymentMethod = 'Tunai';
    state.cashGiven = '';
    document.getElementById('cashGivenInput').value = '';
    document.getElementById('changeAmountText').textContent = formatRp(0);

    // Toggle Pay Tabs
    const tabs = document.querySelectorAll('.pay-tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.pay-tab[data-paymethod="Tunai"]').classList.add('active');

    document.getElementById('payPanelCash').classList.add('active');
    document.getElementById('payPanelQris').classList.remove('active');
    document.getElementById('btnConfirmPayment').disabled = true;

    document.getElementById('checkoutModal').classList.add('active');
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
  }

  function updateCashChange() {
    let subtotal = 0;
    state.cart.forEach(c => subtotal += (c.totalPrice * c.qty));
    const taxRate = state.settings.taxRate || 0;
    const grandTotal = subtotal + Math.round(subtotal * (taxRate / 100));

    const cashInput = parseFloat(document.getElementById('cashGivenInput').value) || 0;
    const change = cashInput - grandTotal;

    const changeText = document.getElementById('changeAmountText');
    const confirmBtn = document.getElementById('btnConfirmPayment');

    if (change >= 0 && cashInput > 0) {
      changeText.textContent = formatRp(change);
      changeText.parentElement.style.borderColor = 'var(--success)';
      confirmBtn.disabled = false;
    } else {
      changeText.textContent = 'Nominal Belum Cukup';
      changeText.parentElement.style.borderColor = 'var(--danger)';
      confirmBtn.disabled = true;
    }
  }

  function processPaymentSuccess() {
    let subtotal = 0;
    state.cart.forEach(c => subtotal += (c.totalPrice * c.qty));
    const taxRate = state.settings.taxRate || 0;
    const taxAmount = Math.round(subtotal * (taxRate / 100));
    const grandTotal = subtotal + taxAmount;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    const txId = '#MYA-' + (1000 + state.transactions.length + 1);

    const cashGiven = state.paymentMethod === 'Tunai' ? parseFloat(document.getElementById('cashGivenInput').value) || grandTotal : grandTotal;
    const change = cashGiven - grandTotal;

    // 1. Build Transaction Record
    const tx = {
      id: txId,
      time: `${dateStr} ${timeStr}`,
      hour: now.getHours(),
      type: state.orderType,
      table: state.orderType === 'Dine-in' ? state.selectedTable : '-',
      customer: state.custName,
      items: state.cart.map(c => ({
        name: c.name,
        qty: c.qty,
        price: c.totalPrice,
        subtotal: c.totalPrice * c.qty,
        notes: c.notesText
      })),
      subtotal: subtotal,
      tax: taxAmount,
      total: grandTotal,
      method: state.paymentMethod,
      paid: cashGiven,
      change: change,
      cashier: document.getElementById('cashierShiftName').textContent || 'Kasir Shift 1',
      status: 'Selesai'
    };

    state.transactions.unshift(tx);
    saveState('transactions');

    // 2. Build KDS Order
    const kdsOrder = {
      id: txId,
      type: state.orderType,
      table: state.orderType === 'Dine-in' ? state.selectedTable : '-',
      customer: state.custName,
      items: state.cart.map(c => ({
        name: c.name,
        notes: c.notesText || 'Biasa'
      })),
      time: now.toISOString(),
      status: 'Pesanan Masuk'
    };

    state.kdsOrders.unshift(kdsOrder);
    saveState('kds');

    // 3. Deduct Stock Inventory
    state.cart.forEach(c => {
      if (c.ingredients) {
        c.ingredients.forEach(ing => {
          if (state.stock[ing.id]) {
            state.stock[ing.id].stock = Math.max(0, state.stock[ing.id].stock - (ing.qty * c.qty));
          }
        });
      }
    });
    saveState('stock');

    // Reset Cart & Close Checkout
    state.cart = [];
    renderCart();
    renderMenuCatalog();
    renderStockTable();
    renderKdsGrid();
    renderAnalytics();
    closeCheckoutModal();

    showToast(`Transaksi ${txId} Berhasil!`, 'success');

    // Open Printable Receipt Modal
    state.currentCheckoutTx = tx;
    openReceiptModal(tx);
  }

  // --- E. Thermal Receipt Modal ---
  function openReceiptModal(tx) {
    const modal = document.getElementById('receiptModal');
    if (!modal || !tx) return;

    document.getElementById('rStoreName').textContent = state.settings.storeName;
    document.getElementById('rStoreAddress').textContent = state.settings.storeAddress;
    document.getElementById('rStorePhone').textContent = 'Telp: ' + state.settings.storePhone;
    document.getElementById('rTxId').textContent = tx.id;
    document.getElementById('rDateTime').textContent = tx.time;
    document.getElementById('rOrderType').textContent = tx.type === 'Dine-in' ? `Dine-in (${tx.table})` : tx.type;
    document.getElementById('rCashierName').textContent = tx.cashier;
    document.getElementById('rFooterMessage').textContent = state.settings.storeFooter;

    const itemsContainer = document.getElementById('rItemsList');
    itemsContainer.innerHTML = tx.items.map(item => `
      <div class="r-item">
        <div class="r-item-title">
          <span>${item.name} x${item.qty}</span>
          <span>${formatRp(item.subtotal)}</span>
        </div>
        ${item.notes ? `<small class="r-item-sub">${item.notes}</small>` : ''}
      </div>
    `).join('');

    document.getElementById('rSubtotal').textContent = formatRp(tx.subtotal);
    document.getElementById('rTax').textContent = formatRp(tx.tax);
    document.getElementById('rTotal').textContent = formatRp(tx.total);
    document.getElementById('rPayMethod').textContent = tx.method;
    document.getElementById('rPayGiven').textContent = formatRp(tx.paid);
    document.getElementById('rChange').textContent = formatRp(tx.change);

    // Apply Thermal Paper Width Class
    const paper = document.getElementById('printableReceipt');
    if (paper) {
      paper.className = `thermal-receipt size-${state.settings.paperSize || '58mm'}`;
    }

    modal.classList.add('active');
  }

  function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.remove('active');
    state.currentCheckoutTx = null;
  }

  // --- E2. Transaction Detail Modal ---
  function openTxDetailModal(tx) {
    if (!tx) return;
    state.currentDetailTx = tx;
    const modal = document.getElementById('txDetailModal');
    if (!modal) return;

    document.getElementById('tdTxId').textContent = `Detail Transaksi ${tx.id}`;
    document.getElementById('tdDateTime').textContent = tx.time;
    document.getElementById('tdOrderType').textContent = tx.type === 'Dine-in' ? `Dine-in (${tx.table})` : tx.type;
    document.getElementById('tdCustName').textContent = tx.customer;
    document.getElementById('tdCashierName').textContent = tx.cashier || 'Kasir Shift 1';
    document.getElementById('tdSubtotal').textContent = formatRp(tx.subtotal);
    document.getElementById('tdTax').textContent = formatRp(tx.tax);
    document.getElementById('tdTotal').textContent = formatRp(tx.total);
    document.getElementById('tdPayMethod').textContent = tx.method;
    document.getElementById('tdPayGiven').textContent = formatRp(tx.paid);
    document.getElementById('tdChange').textContent = formatRp(tx.change);

    const tbody = document.getElementById('tdItemsList');
    if (tbody) {
      tbody.innerHTML = (tx.items || []).map(it => `
        <tr>
          <td>
            <strong>${it.name}</strong>
            ${it.notes ? `<br><small class="text-muted">Catatan: ${it.notes}</small>` : ''}
          </td>
          <td>${formatRp(it.price)}</td>
          <td><strong>${it.qty}</strong></td>
          <td><strong>${formatRp(it.subtotal)}</strong></td>
        </tr>
      `).join('');
    }

    modal.classList.add('active');
  }

  function closeTxDetailModal() {
    const modal = document.getElementById('txDetailModal');
    if (modal) modal.classList.remove('active');
    state.currentDetailTx = null;
  }

  // --- F. KDS (Kitchen Display System) ---
  function renderKdsGrid() {
    const grid = document.getElementById('kdsGrid');
    const badge = document.getElementById('kdsBadgeCount');
    if (!grid) return;

    const activeOrders = state.kdsOrders.filter(o => o.status !== 'Selesai');
    if (badge) badge.textContent = activeOrders.length;

    if (activeOrders.length === 0) {
      grid.innerHTML = `
        <div class="empty-kds" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">🍳</div>
          <h3>Tidak Ada Antrean Dapur</h3>
          <p>Semua pesanan mie ayam telah selesai dimasak.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = activeOrders.map(order => {
      const elapsedMins = Math.floor((new Date() - new Date(order.time)) / 60000);
      let timerClass = 'badge-success';
      if (elapsedMins >= 10 && elapsedMins < 20) timerClass = 'badge-warning';
      if (elapsedMins >= 20) timerClass = 'badge-danger';

      let statusBadge = 'badge-warning';
      if (order.status === 'Sedang Dimasak') statusBadge = 'badge-info';
      if (order.status === 'Siap Disajikan') statusBadge = 'badge-success';

      return `
        <div class="kds-card">
          <div class="kds-card-header">
            <div>
              <strong class="kds-id">${order.id}</strong>
              <div class="kds-meta">${order.type} • ${order.table} • ${order.customer}</div>
            </div>
            <span class="badge ${timerClass}">⏱️ ${elapsedMins} mnt</span>
          </div>
          <div class="kds-card-body">
            <ul class="kds-item-list">
              ${order.items.map(it => `
                <li>
                  <div class="kds-item-name">🍜 <strong>${it.name}</strong></div>
                  ${it.notes ? `<div class="kds-item-notes">${it.notes}</div>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="kds-card-footer">
            <span class="badge ${statusBadge}">${order.status}</span>
            <div class="kds-actions">
              ${order.status === 'Pesanan Masuk' ? `<button class="btn btn-primary btn-sm btn-kds-step" data-id="${order.id}" data-next="Sedang Dimasak">🔥 Masak</button>` : ''}
              ${order.status === 'Sedang Dimasak' ? `<button class="btn btn-success btn-sm btn-kds-step" data-id="${order.id}" data-next="Siap Disajikan">✅ Siap</button>` : ''}
              ${order.status === 'Siap Disajikan' ? `<button class="btn btn-secondary btn-sm btn-kds-step" data-id="${order.id}" data-next="Selesai">🏁 Selesai</button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-kds-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const next = btn.dataset.next;
        const target = state.kdsOrders.find(o => o.id === id);
        if (target) {
          target.status = next;
          saveState('kds');
          renderKdsGrid();
          showToast(`Pesanan ${id} status: ${next}`, 'info');
        }
      });
    });
  }

  // --- G. Stock Inventory Management ---
  function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    const restockSelect = document.getElementById('restockItemSelect');
    if (!tbody) return;

    const keys = Object.keys(state.stock);
    tbody.innerHTML = keys.map(key => {
      const item = state.stock[key];
      let statusBadge = '<span class="badge badge-success">Aman</span>';
      if (item.stock <= item.min && item.stock > 0) {
        statusBadge = '<span class="badge badge-warning">Stok Menipis</span>';
      } else if (item.stock === 0) {
        statusBadge = '<span class="badge badge-danger">Habis</span>';
      }

      return `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td><span class="badge badge-secondary">${item.category}</span></td>
          <td><strong style="font-size: 1.1rem; color: ${item.stock <= item.min ? 'var(--danger)' : 'var(--text-main)'};">${item.stock} ${item.unit}</strong></td>
          <td>${item.min} ${item.unit}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-secondary btn-sm btn-quick-restock" data-key="${key}">➕ Restock (+10)</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-quick-restock').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (state.stock[key]) {
          state.stock[key].stock += 10;
          saveState('stock');
          renderStockTable();
          renderMenuCatalog();
          showToast(`Berhasil menambah 10 ${state.stock[key].unit} ${state.stock[key].name}`, 'success');
        }
      });
    });

    if (restockSelect) {
      restockSelect.innerHTML = keys.map(key => `
        <option value="${key}">${state.stock[key].name} (Sisa: ${state.stock[key].stock} ${state.stock[key].unit})</option>
      `).join('');
    }
  }

  // --- H. Analytics & Laporan Omzet (Owner Only) ---
  function renderAnalytics() {
    const revEl = document.getElementById('metricTotalRevenue');
    const txEl = document.getElementById('metricTotalTx');
    const cashRevEl = document.getElementById('metricCashRevenue');
    const qrisRevEl = document.getElementById('metricQrisRevenue');
    const chartContainer = document.getElementById('hourlyChartContainer');
    const bestSellerList = document.getElementById('bestSellerList');
    const txTable = document.getElementById('txHistoryTableBody');

    if (!revEl) return;

    let totalRevenue = 0;
    let totalTxCount = state.transactions.length;
    let cashRev = 0;
    let qrisRev = 0;

    const hourlyMap = {};
    const itemSalesMap = {};

    state.transactions.forEach(tx => {
      totalRevenue += tx.total;
      if (tx.method === 'Tunai') cashRev += tx.total;
      if (tx.method === 'QRIS') qrisRev += tx.total;

      // Hourly aggregation
      const hr = tx.hour !== undefined ? tx.hour : 12;
      hourlyMap[hr] = (hourlyMap[hr] || 0) + tx.total;

      // Best sellers
      if (tx.items) {
        tx.items.forEach(it => {
          itemSalesMap[it.name] = (itemSalesMap[it.name] || 0) + it.qty;
        });
      }
    });

    revEl.textContent = formatRp(totalRevenue);
    txEl.textContent = `${totalTxCount} Trx`;
    cashRevEl.textContent = formatRp(cashRev);
    qrisRevEl.textContent = formatRp(qrisRev);

    // Hourly Bar Chart Render
    if (chartContainer) {
      const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const maxVal = Math.max(...hours.map(h => hourlyMap[h] || 0), 100000);

      chartContainer.innerHTML = hours.map(h => {
        const val = hourlyMap[h] || 0;
        const heightPct = Math.min(100, Math.round((val / maxVal) * 100));
        return `
          <div class="bar-chart-item" title="Jam ${h}:00 - ${formatRp(val)}">
            <div class="bar-fill" style="height: ${Math.max(8, heightPct)}%;">
              <span class="bar-val">${val > 0 ? (val / 1000) + 'k' : ''}</span>
            </div>
            <span class="bar-label">${h}:00</span>
          </div>
        `;
      }).join('');
    }

    // Best Sellers List Render
    if (bestSellerList) {
      const sortedItems = Object.keys(itemSalesMap)
        .map(name => ({ name, qty: itemSalesMap[name] }))
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5);

      if (sortedItems.length === 0) {
        bestSellerList.innerHTML = '<li class="text-muted">Belum ada data penjualan</li>';
      } else {
        bestSellerList.innerHTML = sortedItems.map((item, i) => `
          <li class="best-seller-item">
            <span class="rank-num">#${i + 1}</span>
            <span class="item-name">${item.name}</span>
            <strong class="item-sold">${item.qty} Porsi Terjual</strong>
          </li>
        `).join('');
      }
    }

    // Transaction History Table Render
    if (txTable) {
      const query = (document.getElementById('searchTxInput')?.value || '').toLowerCase().trim();
      const filtered = state.transactions.filter(tx =>
        tx.id.toLowerCase().includes(query) ||
        tx.customer.toLowerCase().includes(query) ||
        tx.table.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        txTable.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:20px;">Tidak ada transaksi ditemukan</td></tr>`;
      } else {
        txTable.innerHTML = filtered.map(tx => `
          <tr>
            <td><strong>${tx.id}</strong></td>
            <td><small>${tx.time}</small></td>
            <td><span class="badge badge-secondary">${tx.type}</span></td>
            <td>${tx.customer} (${tx.table})</td>
            <td><strong>${formatRp(tx.total)}</strong></td>
            <td><span class="badge ${tx.method === 'QRIS' ? 'badge-info' : 'badge-success'}">${tx.method}</span></td>
            <td><span class="badge badge-success">${tx.status}</span></td>
            <td style="display:flex; gap:6px;">
              <button class="btn btn-primary btn-sm btn-detail-tx" data-id="${tx.id}">👁️ Detail</button>
              <button class="btn btn-secondary btn-sm btn-reprint-tx" data-id="${tx.id}">🖨️ Struk</button>
            </td>
          </tr>
        `).join('');

        txTable.querySelectorAll('.btn-detail-tx').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const target = state.transactions.find(t => t.id === id);
            if (target) openTxDetailModal(target);
          });
        });

        txTable.querySelectorAll('.btn-reprint-tx').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const target = state.transactions.find(t => t.id === id);
            if (target) openReceiptModal(target);
          });
        });
      }
    }
  }

  // --- Kasir Transaction History Modal ---
  function openTxHistoryModal() {
    const modal = document.getElementById('txHistoryModal');
    if (!modal) return;
    renderKasirTxHistoryTable();
    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeTxHistoryModal() {
    const modal = document.getElementById('txHistoryModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function renderKasirTxHistoryTable() {
    const tbody = document.getElementById('kasirTxHistoryTableBody');
    if (!tbody) return;

    const query = (document.getElementById('kasirSearchTxInput')?.value || '').toLowerCase().trim();
    const filtered = state.transactions.filter(tx =>
      tx.id.toLowerCase().includes(query) ||
      tx.customer.toLowerCase().includes(query) ||
      tx.table.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:20px;">Belum ada riwayat transaksi</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(tx => `
      <tr>
        <td><strong>${tx.id}</strong></td>
        <td><small>${tx.time}</small></td>
        <td><span class="badge badge-secondary">${tx.type}</span></td>
        <td>${tx.customer} (${tx.table})</td>
        <td><strong>${formatRp(tx.total)}</strong></td>
        <td><span class="badge ${tx.method === 'QRIS' ? 'badge-info' : 'badge-success'}">${tx.method}</span></td>
        <td><span class="badge badge-success">${tx.status}</span></td>
        <td style="display:flex; gap:6px;">
          <button class="btn btn-primary btn-sm btn-kasir-detail-tx" data-id="${tx.id}">👁️ Detail</button>
          <button class="btn btn-secondary btn-sm btn-kasir-reprint-tx" data-id="${tx.id}">🖨️ Struk</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.btn-kasir-detail-tx').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.transactions.find(t => t.id === id);
        if (target) openTxDetailModal(target);
      });
    });

    tbody.querySelectorAll('.btn-kasir-reprint-tx').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.transactions.find(t => t.id === id);
        if (target) openReceiptModal(target);
      });
    });
  }

  // --- I. Customer Feedback / QR Reviews ---
  function renderFeedbackTable() {
    const tbody = document.getElementById('feedbackTableBody');
    const badge = document.getElementById('unreadFeedbackCount');
    if (!tbody) return;

    const unread = state.feedbacks.filter(f => f.status === 'Belum Dibaca').length;
    if (badge) badge.textContent = unread;

    if (state.feedbacks.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding:30px;">Belum ada ulasan atau komplain dari pelanggan</td></tr>`;
      return;
    }

    tbody.innerHTML = state.feedbacks.map(f => {
      let stars = '⭐'.repeat(f.rating || 5);
      return `
        <tr style="${f.status === 'Belum Dibaca' ? 'background: rgba(245, 158, 11, 0.05); font-weight: 500;' : ''}">
          <td><small>${f.date}</small></td>
          <td><strong>${f.table}</strong></td>
          <td><span style="color: var(--primary);">${stars} (${f.rating})</span></td>
          <td><span class="badge badge-secondary">${f.category}</span></td>
          <td>"${f.comment}"</td>
          <td><small>${f.contact || '-'}</small></td>
          <td>
            ${f.status === 'Belum Dibaca'
              ? `<button class="btn btn-primary btn-sm btn-mark-read" data-id="${f.id}">Mark Read</button>`
              : `<span class="badge badge-success">Selesai Dibaca</span>`
            }
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-mark-read').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = state.feedbacks.find(f => f.id === id);
        if (target) {
          target.status = 'Sudah Dibaca';
          saveState('feedback');
          renderFeedbackTable();
          showToast('Ulasan ditandai sudah dibaca', 'info');
        }
      });
    });
  }

  // --- J. Role & PIN Security System ---
  function updateRoleUI() {
    const badgeName = document.getElementById('roleName');
    const badgeIcon = document.getElementById('roleIcon');
    if (badgeName) badgeName.textContent = state.role;
    if (badgeIcon) {
      if (state.role === 'Kasir') badgeIcon.textContent = '👤';
      if (state.role === 'Dapur') badgeIcon.textContent = '🔥';
      if (state.role === 'Owner') badgeIcon.textContent = '👑';
    }

    const headerRoleSelect = document.getElementById('headerRoleSelect');
    if (headerRoleSelect) headerRoleSelect.value = state.role;

    if (state.role === 'Owner') {
      document.body.classList.add('role-owner');
    } else {
      document.body.classList.remove('role-owner');
    }

    // Completely hide or show owner-only items in sidebar navigation
    document.querySelectorAll('.nav-item.owner-only').forEach(el => {
      if (state.role === 'Owner') {
        el.style.setProperty('display', 'flex', 'important');
      } else {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    showToast(`Beralih ke Mode Role: ${state.role}`, 'info');
  }

  function openPinModal(targetRole) {
    state.targetRoleToSwitch = targetRole || 'Kasir';
    state.enteredPin = '';
    const pinDisp = document.getElementById('pinDisplay');
    if (pinDisp) pinDisp.value = '';
    const modal = document.getElementById('pinModal');
    if (!modal) return;

    // Highlight target role choice button
    modal.querySelectorAll('.btn-role-choice').forEach(b => {
      b.classList.remove('active');
      if (b.dataset.targetrole === state.targetRoleToSwitch) b.classList.add('active');
    });

    const pinContainer = document.getElementById('pinEntryContainer');
    if (pinContainer) {
      pinContainer.style.display = state.targetRoleToSwitch === 'Owner' ? 'block' : 'none';
    }

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closePinModal() {
    const modal = document.getElementById('pinModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function switchRoleTo(newRole) {
    state.role = newRole;
    updateRoleUI();
    closePinModal();

    if (newRole === 'Dapur') {
      switchTab('kdsTab');
      showToast('Beralih ke Mode Role: Dapur (KDS)', 'success');
    } else if (newRole === 'Kasir') {
      switchTab('posTab');
      showToast('Beralih ke Mode Role: Kasir (POS)', 'success');
    } else if (newRole === 'Owner') {
      showToast('Berhasil Akses Mode Owner (Admin)! Laporan & Ulasan Terbuka.', 'success');
    }
  }

  function verifyPinAndSwitchRole() {
    const target = state.targetRoleToSwitch;
    const pin = state.enteredPin;

    if (target === 'Owner' && pin !== '9999') {
      showToast('PIN Owner Salah! (Default PIN Owner: 9999)', 'danger');
      state.enteredPin = '';
      const pinDisp = document.getElementById('pinDisplay');
      if (pinDisp) pinDisp.value = '';
      return;
    }

    switchRoleTo(target);
  }

  // --- K. Tab Navigation ---
  function switchTab(tabId) {
    if ((tabId === 'laporanTab' || tabId === 'ulasanTab') && state.role !== 'Owner') {
      openPinModal('Owner');
      state.activeTab = tabId;
      return;
    }

    state.activeTab = tabId;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.tab === tabId) item.classList.add('active');
    });

    document.querySelectorAll('.tab-page').forEach(page => {
      page.classList.remove('active');
      if (page.id === tabId) page.classList.add('active');
    });

    if (tabId === 'posTab') renderMenuCatalog();
    if (tabId === 'kdsTab') renderKdsGrid();
    if (tabId === 'stokTab') renderStockTable();
    if (tabId === 'laporanTab') renderAnalytics();
    if (tabId === 'ulasanTab') renderFeedbackTable();
  }

  // ==========================================
  // 4. EVENT LISTENERS & SETUP
  // ==========================================
  function setupEventListeners() {
    initClock();

    // Navigation Tabs
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.dataset.tab;
        switchTab(tabId);
      });
    });

    // Category Filter Pills
    const categoryPills = document.getElementById('categoryPills');
    if (categoryPills) {
      categoryPills.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
          categoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.selectedCategory = pill.dataset.cat;

          // Reset sub-category filter to all when main category changes
          state.selectedSubCategory = 'all';
          const subPills = document.querySelectorAll('#subCategoryPills .sub-pill');
          subPills.forEach(sp => {
            sp.classList.remove('active');
            if (sp.dataset.subcat === 'all') sp.classList.add('active');
          });

          renderMenuCatalog();
        });
      });
    }

    // Drink Sub-Category Filter Pills
    const subCategoryPills = document.getElementById('subCategoryPills');
    if (subCategoryPills) {
      subCategoryPills.querySelectorAll('.sub-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          subCategoryPills.querySelectorAll('.sub-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedSubCategory = btn.dataset.subcat;
          renderMenuCatalog();
        });
      });
    }

    // Search Menu Input
    const searchInput = document.getElementById('searchMenuInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderMenuCatalog();
      });
    }

    // Order Type Selector Buttons
    document.querySelectorAll('.order-type-selector .btn-type').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.order-type-selector .btn-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.orderType = btn.dataset.type;

        const tableGroup = document.getElementById('tableSelectGroup');
        if (tableGroup) {
          tableGroup.style.display = state.orderType === 'Dine-in' ? 'block' : 'none';
        }
      });
    });

    // Table Selector
    const tableSelect = document.getElementById('tableSelect');
    if (tableSelect) {
      tableSelect.addEventListener('change', (e) => {
        state.selectedTable = e.target.value;
      });
    }

    // Clear Cart Button
    const btnClearCart = document.getElementById('btnClearCart');
    if (btnClearCart) {
      btnClearCart.addEventListener('click', () => {
        if (state.cart.length === 0) return;
        if (confirm('Apakah Anda yakin ingin mengosongkan keranjang pesanan?')) {
          state.cart = [];
          renderCart();
          showToast('Keranjang telah dikosongkan', 'info');
        }
      });
    }

    // Checkout Button
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
      btnCheckout.addEventListener('click', openCheckoutModal);
    }

    // Customizer Modal Events (Notes Only)
    const btnCloseCustomizer = document.getElementById('btnCloseCustomizer');
    if (btnCloseCustomizer) btnCloseCustomizer.addEventListener('click', closeCustomizerModal);

    const btnAddToCartCustomized = document.getElementById('btnAddToCartCustomized');
    if (btnAddToCartCustomized) {
      btnAddToCartCustomized.addEventListener('click', () => {
        if (!state.customizingItem) return;
        const item = state.customizingItem;
        const notes = document.getElementById('customizerNotes').value.trim();

        addToCartDirectly(item, notes);
        closeCustomizerModal();
      });
    }

    // Edit Photo Modal Events
    const btnCloseEditImage = document.getElementById('btnCloseEditImage');
    const btnCancelEditImage = document.getElementById('btnCancelEditImage');
    const btnSaveEditImage = document.getElementById('btnSaveEditImage');
    const editImageFileInput = document.getElementById('editImageFileInput');
    const editImageUrlInput = document.getElementById('editImageUrlInput');
    const editImagePreview = document.getElementById('editImagePreview');

    if (btnCloseEditImage) btnCloseEditImage.addEventListener('click', closeEditImageModal);
    if (btnCancelEditImage) btnCancelEditImage.addEventListener('click', closeEditImageModal);

    if (editImageUrlInput) {
      editImageUrlInput.addEventListener('input', (e) => {
        if (editImagePreview) editImagePreview.src = e.target.value.trim();
      });
    }

    if (editImageFileInput) {
      editImageFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            if (editImagePreview) editImagePreview.src = evt.target.result;
            if (editImageUrlInput) editImageUrlInput.value = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (btnSaveEditImage) {
      btnSaveEditImage.addEventListener('click', () => {
        if (!state.editingImageItem) return;
        const url = editImageUrlInput ? editImageUrlInput.value.trim() : '';
        if (url) {
          state.customImages[state.editingImageItem.id] = url;
          saveState('custom_images');
          renderMenuCatalog();
          closeEditImageModal();
          showToast(`Foto menu ${state.editingImageItem.name} berhasil diperbarui!`, 'success');
        } else {
          showToast('Masukkan URL foto atau pilih file terlebih dahulu', 'warning');
        }
      });
    }

    // Transaction Detail Modal Events
    const btnCloseTxDetail = document.getElementById('btnCloseTxDetail');
    const btnFinishTxDetail = document.getElementById('btnFinishTxDetail');
    const btnPrintTxDetail = document.getElementById('btnPrintTxDetail');
    if (btnCloseTxDetail) btnCloseTxDetail.addEventListener('click', closeTxDetailModal);
    if (btnFinishTxDetail) btnFinishTxDetail.addEventListener('click', closeTxDetailModal);
    if (btnPrintTxDetail) {
      btnPrintTxDetail.addEventListener('click', () => {
        if (state.currentDetailTx) {
          closeTxDetailModal();
          openReceiptModal(state.currentDetailTx);
        }
      });
    }

    // Checkout Payment Modal Events
    const btnCloseCheckout = document.getElementById('btnCloseCheckout');
    const btnCancelCheckout = document.getElementById('btnCancelCheckout');
    if (btnCloseCheckout) btnCloseCheckout.addEventListener('click', closeCheckoutModal);
    if (btnCancelCheckout) btnCancelCheckout.addEventListener('click', closeCheckoutModal);

    // Pay Tabs (Cash vs QRIS)
    document.querySelectorAll('.pay-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.paymentMethod = tab.dataset.paymethod;

        if (state.paymentMethod === 'Tunai') {
          document.getElementById('payPanelCash').classList.add('active');
          document.getElementById('payPanelQris').classList.remove('active');
          updateCashChange();
        } else {
          document.getElementById('payPanelCash').classList.remove('active');
          document.getElementById('payPanelQris').classList.add('active');
          document.getElementById('btnConfirmPayment').disabled = false;
        }
      });
    });

    // Cash Given Input & Quick Cash Buttons
    const cashGivenInput = document.getElementById('cashGivenInput');
    if (cashGivenInput) {
      cashGivenInput.addEventListener('input', updateCashChange);
    }

    document.querySelectorAll('.btn-quick-cash').forEach(btn => {
      btn.addEventListener('click', () => {
        let subtotal = 0;
        state.cart.forEach(c => subtotal += (c.totalPrice * c.qty));
        const taxRate = state.settings.taxRate || 0;
        const grandTotal = subtotal + Math.round(subtotal * (taxRate / 100));

        const val = btn.dataset.amount;
        if (val === 'exact') {
          cashGivenInput.value = grandTotal;
        } else {
          cashGivenInput.value = parseInt(val);
        }
        updateCashChange();
      });
    });

    // QRIS Simulate Success
    const btnSimulateQrisSuccess = document.getElementById('btnSimulateQrisSuccess');
    if (btnSimulateQrisSuccess) {
      btnSimulateQrisSuccess.addEventListener('click', () => {
        showToast('Pembayaran QRIS Terverifikasi Sukses!', 'success');
        processPaymentSuccess();
      });
    }

    // Confirm Payment & Print Button
    const btnConfirmPayment = document.getElementById('btnConfirmPayment');
    if (btnConfirmPayment) {
      btnConfirmPayment.addEventListener('click', processPaymentSuccess);
    }

    // Receipt Modal Events
    const btnCloseReceipt = document.getElementById('btnCloseReceipt');
    const btnFinishReceipt = document.getElementById('btnFinishReceipt');
    const btnPrintReceiptAction = document.getElementById('btnPrintReceiptAction');
    if (btnCloseReceipt) btnCloseReceipt.addEventListener('click', closeReceiptModal);
    if (btnFinishReceipt) btnFinishReceipt.addEventListener('click', closeReceiptModal);
    if (btnPrintReceiptAction) {
      btnPrintReceiptAction.addEventListener('click', () => {
        window.print();
      });
    }

    // Kasir Transaction History Modal Events
    const btnKasirHistory = document.getElementById('btnKasirHistory');
    const btnCloseTxHistoryModal = document.getElementById('btnCloseTxHistoryModal');
    const btnCancelTxHistoryModal = document.getElementById('btnCancelTxHistoryModal');
    const kasirSearchTxInput = document.getElementById('kasirSearchTxInput');

    if (btnKasirHistory) {
      btnKasirHistory.addEventListener('click', openTxHistoryModal);
    }
    if (btnCloseTxHistoryModal) {
      btnCloseTxHistoryModal.addEventListener('click', closeTxHistoryModal);
    }
    if (btnCancelTxHistoryModal) {
      btnCancelTxHistoryModal.addEventListener('click', closeTxHistoryModal);
    }
    if (kasirSearchTxInput) {
      kasirSearchTxInput.addEventListener('input', renderKasirTxHistoryTable);
    }

    // Role Switcher & PIN Modal Events
    const btnSwitchRole = document.getElementById('btnSwitchRole');
    const currentRoleBadge = document.getElementById('currentRoleBadge');

    if (btnSwitchRole) {
      btnSwitchRole.addEventListener('click', () => {
        openPinModal(state.role);
      });
    }
    if (currentRoleBadge) {
      currentRoleBadge.style.cursor = 'pointer';
      currentRoleBadge.addEventListener('click', () => {
        openPinModal(state.role);
      });
    }

    const btnClosePin = document.getElementById('btnClosePin');
    if (btnClosePin) btnClosePin.addEventListener('click', closePinModal);

    document.querySelectorAll('.btn-role-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-role-choice').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.targetRoleToSwitch = btn.dataset.targetrole;

        const pinContainer = document.getElementById('pinEntryContainer');

        // If target is Kasir or Dapur, switch immediately without PIN!
        if (state.targetRoleToSwitch === 'Kasir' || state.targetRoleToSwitch === 'Dapur') {
          if (pinContainer) pinContainer.style.display = 'none';
          switchRoleTo(state.targetRoleToSwitch);
        } else {
          // If target is Owner, show PIN keypad container
          if (pinContainer) pinContainer.style.display = 'block';
          state.enteredPin = '';
          const pinDisp = document.getElementById('pinDisplay');
          if (pinDisp) pinDisp.value = '';
          showToast('Masukkan PIN Owner (Default: 9999)', 'info');
        }
      });
    });

    document.querySelectorAll('.keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === 'C') {
          state.enteredPin = '';
        } else if (key === 'OK') {
          verifyPinAndSwitchRole();
          return;
        } else {
          if (state.enteredPin.length < 6) state.enteredPin += key;
        }
        const pinDisp = document.getElementById('pinDisplay');
        if (pinDisp) pinDisp.value = '•'.repeat(state.enteredPin.length);
      });
    });

    // Restock Modal Events
    const btnRestockModal = document.getElementById('btnRestockModal');
    const btnCloseRestock = document.getElementById('btnCloseRestock');
    const btnCancelRestock = document.getElementById('btnCancelRestock');
    const btnConfirmRestock = document.getElementById('btnConfirmRestock');

    if (btnRestockModal) {
      btnRestockModal.addEventListener('click', () => {
        renderStockTable();
        document.getElementById('restockModal').classList.add('active');
      });
    }

    if (btnCloseRestock) btnCloseRestock.addEventListener('click', () => document.getElementById('restockModal').classList.remove('active'));
    if (btnCancelRestock) btnCancelRestock.addEventListener('click', () => document.getElementById('restockModal').classList.remove('active'));

    if (btnConfirmRestock) {
      btnConfirmRestock.addEventListener('click', () => {
        const itemKey = document.getElementById('restockItemSelect').value;
        const qty = parseInt(document.getElementById('restockQtyInput').value) || 0;

        if (state.stock[itemKey] && qty > 0) {
          state.stock[itemKey].stock += qty;
          saveState('stock');
          renderStockTable();
          renderMenuCatalog();
          document.getElementById('restockModal').classList.remove('active');
          showToast(`Berhasil menambah stok ${state.stock[itemKey].name} (+${qty})`, 'success');
        }
      });
    }

    // Settings Tab Events
    const btnSaveStoreSettings = document.getElementById('btnSaveStoreSettings');
    if (btnSaveStoreSettings) {
      btnSaveStoreSettings.addEventListener('click', () => {
        state.settings.storeName = document.getElementById('settingStoreName').value.trim() || DEFAULT_SETTINGS.storeName;
        state.settings.storeAddress = document.getElementById('settingStoreAddress').value.trim() || DEFAULT_SETTINGS.storeAddress;
        state.settings.storePhone = document.getElementById('settingStorePhone').value.trim() || DEFAULT_SETTINGS.storePhone;
        state.settings.storeFooter = document.getElementById('settingStoreFooter').value.trim() || DEFAULT_SETTINGS.storeFooter;

        saveState('settings');
        showToast('Pengaturan informasi warung berhasil disimpan!', 'success');
      });
    }

    const settingPaperSize = document.getElementById('settingPaperSize');
    if (settingPaperSize) {
      settingPaperSize.value = state.settings.paperSize || '58mm';
      settingPaperSize.addEventListener('change', (e) => {
        state.settings.paperSize = e.target.value;
        saveState('settings');
        showToast(`Ukuran printer diubah ke ${e.target.value}`, 'info');
      });
    }

    const settingTaxRate = document.getElementById('settingTaxRate');
    if (settingTaxRate) {
      settingTaxRate.value = state.settings.taxRate || 0;
      settingTaxRate.addEventListener('change', (e) => {
        state.settings.taxRate = parseFloat(e.target.value) || 0;
        saveState('settings');
        renderCart();
        showToast(`Pajak diubah ke ${state.settings.taxRate}%`, 'info');
      });
    }

    const btnResetAllData = document.getElementById('btnResetAllData');
    if (btnResetAllData) {
      btnResetAllData.addEventListener('click', () => {
        if (confirm('⚠️ APAKAH ANDA YAKIN? Seluruh data transaksi, stok, dan ulasan akan direset ke kondisi awal demo!')) {
          localStorage.removeItem('mya_settings');
          localStorage.removeItem('mya_stock');
          localStorage.removeItem('mya_transactions');
          localStorage.removeItem('mya_kds');
          localStorage.removeItem('mya_feedback');

          state.settings = DEFAULT_SETTINGS;
          state.stock = DEFAULT_STOCK;
          state.transactions = getDemoTransactions();
          state.kdsOrders = getDemoKdsOrders();
          state.feedbacks = getDemoFeedback();
          state.cart = [];

          saveState();
          renderMenuCatalog();
          renderCart();
          renderKdsGrid();
          renderStockTable();
          renderAnalytics();
          renderFeedbackTable();

          showToast('Data demo berhasil direset ke kondisi awal!', 'warning');
        }
      });
    }

    // Search Transactions Input
    const searchTxInput = document.getElementById('searchTxInput');
    if (searchTxInput) {
      searchTxInput.addEventListener('input', renderAnalytics);
    }

    // Cashier Keyboard Shortcuts & PIN Modal Keyboard Support
    document.addEventListener('keydown', (e) => {
      // Don't intercept key combinations like Ctrl+C
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Handle physical keyboard typing when PIN Modal is active
      const pinModal = document.getElementById('pinModal');
      if (pinModal && pinModal.classList.contains('active')) {
        if (e.key >= '0' && e.key <= '9') {
          if (state.enteredPin.length < 6) state.enteredPin += e.key;
          const disp = document.getElementById('pinDisplay');
          if (disp) disp.value = '•'.repeat(state.enteredPin.length);
          return;
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          state.enteredPin = state.enteredPin.slice(0, -1);
          const disp = document.getElementById('pinDisplay');
          if (disp) disp.value = '•'.repeat(state.enteredPin.length);
          return;
        } else if (e.key === 'Enter') {
          verifyPinAndSwitchRole();
          return;
        }
      }

      // 1. Press Slash '/' or F2 to focus Search Bar
      if ((e.key === '/' || e.key === 'F2') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('searchMenuInput');
        if (searchInput) searchInput.focus();
      }

      // 2. Press F4 to open Checkout if cart has items
      if (e.key === 'F4') {
        e.preventDefault();
        if (state.cart.length > 0) openCheckoutModal();
      }

      // 3. Press Escape to close any open modal
      if (e.key === 'Escape') {
        closeCustomizerModal();
        closeCheckoutModal();
        closeReceiptModal();
        closePinModal();
        closeEditImageModal();
        closeTxDetailModal();
        const restockM = document.getElementById('restockModal');
        if (restockM) restockM.classList.remove('active');
      }

      // 4. Press Enter inside cash given input to complete payment
      if (e.key === 'Enter' && document.activeElement.id === 'cashGivenInput') {
        e.preventDefault();
        const confirmBtn = document.getElementById('btnConfirmPayment');
        if (confirmBtn && !confirmBtn.disabled) {
          processPaymentSuccess();
        }
      }
    });
  }

  // Expose global helper methods to window object as fallback
  window.openPinModal = function(role) {
    openPinModal(role || state.role);
  };
  window.closePinModal = function() {
    closePinModal();
  };
  window.switchRoleTo = function(role) {
    switchRoleTo(role);
  };

  // ==========================================
  // 5. APP INIT ENTRY POINT
  // ==========================================
  function initApp() {
    try { setupEventListeners(); } catch(e) { console.error('setupEventListeners error:', e); }
    try { renderMenuCatalog(); } catch(e) { console.error('renderMenuCatalog error:', e); }
    try { renderCart(); } catch(e) { console.error('renderCart error:', e); }
    try { renderKdsGrid(); } catch(e) { console.error('renderKdsGrid error:', e); }
    try { renderStockTable(); } catch(e) { console.error('renderStockTable error:', e); }
    try { renderAnalytics(); } catch(e) { console.error('renderAnalytics error:', e); }
    try { renderFeedbackTable(); } catch(e) { console.error('renderFeedbackTable error:', e); }
    try { updateRoleUI(); } catch(e) { console.error('updateRoleUI error:', e); }

    // Populate Initial Setting Fields
    try {
      if (document.getElementById('settingStoreName')) document.getElementById('settingStoreName').value = state.settings.storeName;
      if (document.getElementById('settingStoreAddress')) document.getElementById('settingStoreAddress').value = state.settings.storeAddress;
      if (document.getElementById('settingStorePhone')) document.getElementById('settingStorePhone').value = state.settings.storePhone;
      if (document.getElementById('settingStoreFooter')) document.getElementById('settingStoreFooter').value = state.settings.storeFooter;
    } catch(e) {}

    // Poll KDS timer re-renders every 30s
    setInterval(() => {
      try { renderKdsGrid(); } catch(e) {}
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
