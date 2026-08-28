/* ==========================================================================
  MieAyamin POS - Shared Storage & State Library (js/storage.js)
  ========================================================================== */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'mieayamin_pos_state_v3';

  const DEFAULT_MENU = [
    {
      id: 'mie-1',
      name: 'Mie Ayam Yamin Manis',
      cat: 'mie',
      price: 15000,
      image: 'images/mie_yamin_manis.png',
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
      image: 'images/mie_ayam_komplit.png',
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
      image: 'images/mie_yamin_manis.png',
      desc: 'Mie yamin khas otentik dengan bumbu kecap gurih manis pas.',
      ingredients: [{ id: 'mie_basah', qty: 1 }, { id: 'ayam_semur', qty: 1 }]
    },
    {
      id: 'min-1',
      name: 'Es Teh Manis Jumbo',
      cat: 'minuman',
      subcat: 'minuman_kemasan',
      price: 5000,
      image: 'images/es_teh_jumbo.png',
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
      image: 'images/es_jeruk_peras.png',
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
      image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=500&q=80',
      desc: 'Air mineral botol 600ml dingin segar.',
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
      desc: 'Kerupuk gurih khas rasa tradisional.',
      ingredients: [{ id: 'kerupuk', qty: 1 }]
    }
  ];

  const DEFAULT_INGREDIENTS = {
    mie_basah: { name: 'Mie Basah Organik', stock: 100, unit: 'porsi', minStock: 20 },
    ayam_semur: { name: 'Ayam Semur Cincang', stock: 80, unit: 'porsi', minStock: 15 },
    bakso: { name: 'Bakso Sapi Halus', stock: 150, unit: 'pcs', minStock: 30 },
    pangsit: { name: 'Pangsit Goreng/Rebus', stock: 120, unit: 'pcs', minStock: 25 },
    ceker: { name: 'Ceker Ayam Semur', stock: 60, unit: 'pcs', minStock: 10 },
    teh: { name: 'Daun Teh Spesial', stock: 200, unit: 'porsi', minStock: 40 },
    teh_botol: { name: 'Teh Botol Sosro', stock: 48, unit: 'botol', minStock: 12 },
    teh_kotak: { name: 'Teh Kotak Sosro', stock: 48, unit: 'kotak', minStock: 12 },
    jeruk: { name: 'Jeruk Peras Fresh', stock: 80, unit: 'buah', minStock: 20 },
    air_mineral: { name: 'Air Mineral 600ml', stock: 72, unit: 'botol', minStock: 24 },
    es_batu: { name: 'Es Batu Kristal', stock: 300, unit: 'porsi', minStock: 50 },
    sirsak: { name: 'Buah Sirsak Fresh', stock: 25, unit: 'porsi', minStock: 5 },
    jambu: { name: 'Buah Jambu Biji Merah', stock: 30, unit: 'porsi', minStock: 5 },
    alpukat: { name: 'Buah Alpukat Mentega', stock: 20, unit: 'porsi', minStock: 5 },
    mangga: { name: 'Buah Mangga Harum Manis', stock: 25, unit: 'porsi', minStock: 5 },
    kerupuk: { name: 'Kerupuk Kaleng/Rambak', stock: 100, unit: 'pcs', minStock: 20 }
  };

  function loadState() {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Fallback check for v2 / v1 legacy key
        saved = localStorage.getItem('mieayamin_pos_state_v2') || localStorage.getItem('mieayamin_pos_state');
      }
      if (!saved) return initializeDefaultState();
      
      const parsed = JSON.parse(saved);

      // Auto-migrate legacy pig photo / telur puyuh menu to Ceker Pedas
      if (Array.isArray(parsed.customMenu)) {
        parsed.customMenu = parsed.customMenu.map(item => {
          const isTelurPuyuh = (item.id === 'top-4') || 
                               (item.name && item.name.toLowerCase().includes('puyuh')) || 
                               (item.name && item.name.toLowerCase().includes('telur')) || 
                               (item.image && item.image.includes('photo-1516467508483-a7212febe31a')) ||
                               (item.image && item.image.includes('unsplash.com') && item.name && item.name.includes('Puyuh'));
          
          if (isTelurPuyuh) {
            return {
              id: 'top-4',
              name: 'Extra Ceker Pedas (3 pcs)',
              cat: 'topping',
              price: 6000,
              image: 'images/ceker_pedas.png',
              desc: 'Ceker ayam empuk bumbu pedas mercon meresap.',
              ingredients: [{ id: 'ceker', qty: 3 }]
            };
          }
          return item;
        });
      }

      const todayStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
      if (parsed.lastActiveDate && parsed.lastActiveDate !== todayStr) {
        // Auto-rollover day change: clear active drafts & old kitchen queue
        parsed.draftOrders = [];
        if (Array.isArray(parsed.kitchenOrders)) {
          parsed.kitchenOrders = parsed.kitchenOrders.filter(o => o.status === 'Selesai');
        }
      }

      // Re-save sanitized state to v3 key
      const newState = {
        role: parsed.role || 'Kasir',
        lastActiveDate: todayStr,
        customMenu: parsed.customMenu || JSON.parse(JSON.stringify(DEFAULT_MENU)),
        stock: parsed.stock || JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS)),
        cart: parsed.cart || [],
        draftOrders: parsed.draftOrders || [],
        orderType: parsed.orderType || 'dinein',
        tableNo: parsed.tableNo || 'Meja 01',
        customerName: parsed.customerName || '',
        discount: parsed.discount || 0,
        taxRate: parsed.taxRate || 0,
        kdsOrders: parsed.kdsOrders || generateInitialKdsOrders(),
        transactions: parsed.transactions || generateInitialTransactions(),
        closingReports: parsed.closingReports || [],
        feedbacks: parsed.feedbacks || generateInitialFeedbacks()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    } catch (e) {
      console.error('Error loading state:', e);
      return initializeDefaultState();
    }
  }

  function initializeDefaultState() {
    const initState = {
      role: 'Kasir',
      customMenu: JSON.parse(JSON.stringify(DEFAULT_MENU)),
      stock: JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS)),
      cart: [],
      orderType: 'dinein',
      tableNo: 'Meja 01',
      customerName: '',
      discount: 0,
      taxRate: 0,
      kdsOrders: generateInitialKdsOrders(),
      transactions: generateInitialTransactions(),
      feedbacks: generateInitialFeedbacks()
    };
    saveState(initState);
    return initState;
  }

  function saveState(stateObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  function generateInitialKdsOrders() {
    return [
      {
        id: 'ORD-101',
        table: 'Meja 02',
        customer: 'Bpk. Ahmad',
        time: '12:15',
        type: 'Dine-in',
        status: 'Masuk',
        items: [
          { name: 'Mie Ayam Yamin Manis', qty: 2, notesText: 'Tanpa daun bawang' },
          { name: 'Es Teh Manis Jumbo', qty: 2, notesText: 'Es sedikit' }
        ]
      },
      {
        id: 'ORD-102',
        table: 'Meja 05',
        customer: 'Ibu Siska',
        time: '12:22',
        type: 'Dine-in',
        status: 'Diproses',
        items: [
          { name: 'Mie Ayam Komplit (Bakso + Pangsit)', qty: 1, notesText: 'Kuah pisah' },
          { name: 'Es Jeruk Peras Asli', qty: 1, notesText: '' }
        ]
      }
    ];
  }

  function generateInitialTransactions() {
    return [
      {
        id: 'TRX-20260805-001',
        time: '11:30:15',
        date: '2026-08-05',
        type: 'Dine-in',
        table: 'Meja 01',
        customer: 'Pak Budi',
        items: [
          { name: 'Mie Ayam Yamin Manis', qty: 2, unitPrice: 15000, totalPrice: 30000, notesText: '' },
          { name: 'Es Teh Manis Jumbo', qty: 2, unitPrice: 5000, totalPrice: 10000, notesText: '' }
        ],
        subtotal: 40000,
        tax: 0,
        discount: 0,
        total: 40000,
        method: 'Tunai',
        given: 50000,
        change: 10000,
        status: 'Lunas'
      },
      {
        id: 'TRX-20260805-002',
        time: '12:05:40',
        date: '2026-08-05',
        type: 'Bungkus',
        table: '-',
        customer: 'Mba Rina',
        items: [
          { name: 'Mie Ayam Jamur', qty: 1, unitPrice: 17000, totalPrice: 17000, notesText: 'Pedas sedang' },
          { name: 'Jus Alpukat', qty: 1, unitPrice: 12000, totalPrice: 12000, notesText: '' }
        ],
        subtotal: 29000,
        tax: 0,
        discount: 0,
        total: 29000,
        method: 'QRIS',
        given: 29000,
        change: 0,
        status: 'Lunas'
      }
    ];
  }

  function generateInitialFeedbacks() {
    return [
      {
        id: 'FB-001',
        date: '05 Aug 2026 - 12:45',
        name: 'Andi Saputra',
        rating: 5,
        review: 'Mie yaminnya manisnya pas, ayam semurnya melimpah! Tempatnya bersih & pelayanan kasir ramah sekali.',
        table: 'Meja 03'
      },
      {
        id: 'FB-002',
        date: '05 Aug 2026 - 13:10',
        name: 'Maya Indah',
        rating: 5,
        review: 'Es jeruknya segar beneran dari jeruk asli. Pangsit gorengnya renyah garing!',
        table: 'Meja 01'
      }
    ];
  }

  // --- UTILITY HELPERS ---
  function formatRp(num) {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
  }

  function formatDateTime(d = new Date()) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const dayName = days[d.getDay()];
    const dayDate = String(d.getDate()).padStart(2, '0');
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const secs = String(d.getSeconds()).padStart(2, '0');

    return `${dayName}, ${dayDate} ${monthName} ${year} - ${hours}:${mins}:${secs}`;
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

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

  function startLiveClock(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const update = () => { el.textContent = formatDateTime(); };
    update();
    setInterval(update, 1000);
  }

  function playChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start();
      osc1.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio playback prevented or unsupported:', e);
    }
  }

  function exportBackup() {
    try {
      const state = loadState();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      const today = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `backup_pos_mieayamin_${today}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Backup data berhasil diunduh ke file JSON!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal mengunduh backup data: ' + err.message, 'danger');
    }
  }

  function importBackup(jsonText, onSuccess) {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || typeof parsed !== 'object') throw new Error('Format file backup JSON tidak valid');
      saveState(parsed);
      showToast('Data berhasil dipulihkan (Restore Success)!', 'success');
      if (typeof onSuccess === 'function') onSuccess(parsed);
      setTimeout(() => location.reload(), 1000);
    } catch (err) {
      console.error(err);
      showToast('Gagal restore data: ' + err.message, 'danger');
    }
  }

  // Export Storage API globally
  window.POSStorage = {
    STORAGE_KEY,
    DEFAULT_MENU,
    DEFAULT_INGREDIENTS,
    loadState,
    saveState,
    exportBackup,
    importBackup,
    formatRp,
    formatDateTime,
    showToast,
    startLiveClock,
    playChimeSound
  };

})(window);
