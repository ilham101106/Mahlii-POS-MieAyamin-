/* ==========================================================================
   MieAyamin POS - Amber Gold Modern POS Module (js/kasir.js)
   Klasifikasi Menu: Makanan/Mie Ayam, Minuman & Aneka Jus, Extra Topping, Kerupuk
   ========================================================================== */

(function () {
  'use strict';

  const { loadState, saveState, formatRp, showToast, startLiveClock, playChimeSound } = window.POSStorage;

  let state = loadState();
  let currentCategory = 'all';
  let currentViewMode = 'grid';
  let searchQuery = '';
  let activePayMethod = 'Tunai';

  document.addEventListener('DOMContentLoaded', () => {
    initKasir();
  });

  function initKasir() {
    startLiveClock('liveClock');
    renderMenuGrid();
    renderCart();
    renderDraftBadge();
    bindEvents();

    window.addEventListener('storage', (e) => {
      if (e.key === window.POSStorage.STORAGE_KEY) {
        state = loadState();
        renderMenuGrid();
        renderCart();
        renderDraftBadge();
      }
    });
  }

  // --- CATALOG GRID & LIST RENDER ---
  function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    grid.className = currentViewMode === 'list' ? 'menu-grid list-view' : 'menu-grid';

    const items = state.customMenu || window.POSStorage.DEFAULT_MENU;

    const filtered = items.filter(item => {
      const matchCat = currentCategory === 'all' || item.cat === currentCategory;
      const matchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
          <strong style="font-size:1.1rem; display:block; margin-bottom:4px;">Menu Tidak Ditemukan</strong>
          <p style="font-size:0.85rem;">Tidak ada menu pada kategori atau kata kunci pencarian ini.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-img-wrapper">
          <img src="${item.customImage || item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="menu-card-body">
          <div>
            <div class="menu-title">${item.name}</div>
            <div class="menu-desc">${item.desc || ''}</div>
          </div>
          <div class="menu-card-footer">
            <span class="menu-price">${formatRp(item.price)}</span>
            <button class="btn-add-item" title="Tambah ke Keranjang">+</button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const item = items.find(m => m.id === id);
        if (item) addToCart(item);
      });
    });
  }

  // --- CART OPERATIONS & RENDER ---
  function addToCart(item) {
    const existingIndex = state.cart.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
        qty: 1,
        image: item.customImage || item.image,
        notesText: ''
      });
    }

    saveState(state);
    renderCart();
    showToast(`+1 ${item.name} ditambahkan`, 'success');
  }

  function updateCartQty(index, delta) {
    if (!state.cart[index]) return;
    state.cart[index].qty += delta;

    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }

    saveState(state);
    renderCart();
  }

  function renderCart() {
    const list = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('btnCheckout');

    if (!list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <strong style="display:block; color:var(--text-main); font-size:1.05rem; margin-bottom:4px;">Keranjang Masih Kosong</strong>
          <small>Pilih menu makanan atau minuman di sebelah kiri untuk menambah pesanan.</small>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'Rp 0';
      if (taxEl) taxEl.textContent = 'Rp 0';
      if (totalEl) totalEl.textContent = 'Rp 0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    list.innerHTML = state.cart.map((item, index) => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <small class="text-primary">${formatRp(item.unitPrice)} x ${item.qty}</small>
        </div>
        <div class="cart-item-controls">
          <button class="btn-qty btn-sub-qty" data-index="${index}">-</button>
          <strong style="min-width: 20px; text-align: center;">${item.qty}</strong>
          <button class="btn-qty btn-add-qty" data-index="${index}">+</button>
          <strong style="margin-left: 8px; font-size: 0.95rem;">${formatRp(item.unitPrice * item.qty)}</strong>
        </div>
      </div>
    `).join('');

    let subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let grandTotal = subtotal;

    if (subtotalEl) subtotalEl.textContent = formatRp(subtotal);
    if (taxEl) taxEl.textContent = 'Rp 0';
    if (totalEl) totalEl.textContent = formatRp(grandTotal);
    if (checkoutBtn) checkoutBtn.disabled = false;

    list.querySelectorAll('.btn-sub-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCartQty(parseInt(btn.dataset.index), -1);
      });
    });

    list.querySelectorAll('.btn-add-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCartQty(parseInt(btn.dataset.index), 1);
      });
    });
  }

  function resetCart() {
    if (state.cart.length === 0) return;
    if (confirm('Kosongkan keranjang belanja?')) {
      state.cart = [];
      saveState(state);
      renderCart();
      showToast('Keranjang berhasil dikosongkan', 'success');
    }
  }

  // --- HOLD ORDERS & DRAFTS ---
  function holdCurrentOrder() {
    if (state.cart.length === 0) {
      showToast('Keranjang kosong, tidak ada pesanan untuk di-hold!', 'danger');
      return;
    }

    const draft = {
      id: 'DRAFT-' + Date.now().toString().slice(-4),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      table: document.getElementById('tableSelect')?.value || 'Meja 01',
      customer: document.getElementById('customerNameInput')?.value.trim() || 'Pelanggan',
      type: document.querySelector('.btn-order-type.active')?.dataset.type || 'dinein',
      cart: JSON.parse(JSON.stringify(state.cart))
    };

    if (!state.draftOrders) state.draftOrders = [];
    state.draftOrders.push(draft);
    state.cart = [];
    saveState(state);

    renderCart();
    renderDraftBadge();
    showToast(`Pesanan ${draft.id} berhasil di-hold!`, 'success');
  }

  function renderDraftBadge() {
    const badge = document.getElementById('draftCountBadge');
    if (badge) badge.textContent = (state.draftOrders || []).length;
  }

  function openHoldOrdersModal() {
    const modal = document.getElementById('holdOrdersModal');
    const list = document.getElementById('holdOrdersList');
    if (!modal || !list) return;

    const drafts = state.draftOrders || [];
    if (drafts.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">Belum ada pesanan yang disimpan.</div>`;
    } else {
      list.innerHTML = drafts.map((d, index) => {
        const total = d.cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
        return `
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-color); padding:12px 16px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${d.id} (${d.customer} - ${d.table})</strong><br>
              <small style="color:var(--text-muted);">${d.time} • ${d.cart.length} item • Total: ${formatRp(total)}</small>
            </div>
            <button class="btn btn-primary btn-sm btn-restore-draft" data-index="${index}">Buka Draft ➔</button>
          </div>
        `;
      }).join('');

      list.querySelectorAll('.btn-restore-draft').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const restored = state.draftOrders.splice(idx, 1)[0];
          if (restored) {
            state.cart = restored.cart;
            saveState(state);
            renderCart();
            renderDraftBadge();
            closeHoldOrdersModal();
            showToast(`Draft ${restored.id} berhasil dimuat kembali!`, 'success');
          }
        });
      });
    }

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeHoldOrdersModal() {
    const modal = document.getElementById('holdOrdersModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  // --- CHECKOUT & PAYMENT MODAL ---
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast('Keranjang masih kosong!', 'danger');
      return;
    }

    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    let subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let grandTotal = subtotal;

    document.getElementById('checkoutSubtotal').textContent = formatRp(subtotal);
    document.getElementById('checkoutTax').textContent = 'Rp 0';
    document.getElementById('checkoutGrandTotal').textContent = formatRp(grandTotal);

    const cashInput = document.getElementById('payGivenInput');
    if (cashInput) {
      cashInput.value = grandTotal;
      calculateChange(grandTotal);
    }

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function calculateChange(grandTotal) {
    if (grandTotal === undefined || grandTotal === null) {
      grandTotal = parseInt(document.getElementById('checkoutGrandTotal')?.textContent.replace(/[^0-9]/g, '')) || 0;
    }
    const given = parseInt(document.getElementById('payGivenInput')?.value) || 0;
    const change = given - grandTotal;
    const changeEl = document.getElementById('payChangeText');
    if (changeEl) {
      changeEl.textContent = formatRp(Math.max(0, change));
      changeEl.style.color = change >= 0 ? '#047857' : '#dc2626';
    }
  }

  function processPayment() {
    if (state.cart.length === 0) return;

    let subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let grandTotal = subtotal;

    const given = parseInt(document.getElementById('payGivenInput')?.value) || grandTotal;

    if (activePayMethod === 'Tunai' && given < grandTotal) {
      showToast('Uang diterima kurang dari total tagihan!', 'danger');
      return;
    }

    const txId = 'TRX-' + Date.now().toString().slice(-6);
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const tbl = document.getElementById('tableSelect')?.value || 'Meja 01';
    const cust = document.getElementById('customerNameInput')?.value.trim() || 'Pelanggan Umum';
    const typeLabel = document.querySelector('.btn-order-type.active')?.textContent.trim() || 'Dine-in';

    const newTx = {
      id: txId,
      date: dateStr,
      time: timeStr,
      table: tbl,
      customer: cust,
      type: typeLabel,
      method: activePayMethod,
      subtotal,
      tax: 0,
      total: grandTotal,
      given,
      change: Math.max(0, given - grandTotal),
      items: JSON.parse(JSON.stringify(state.cart)),
      status: 'Selesai'
    };

    if (!state.transactions) state.transactions = [];
    state.transactions.unshift(newTx);

    // Push to Kitchen (KDS)
    const kdsOrder = {
      id: txId,
      time: timeStr,
      table: tbl,
      type: typeLabel,
      customer: cust,
      status: 'Menunggu',
      createdAt: Date.now(),
      items: JSON.parse(JSON.stringify(state.cart))
    };

    if (!state.kitchenOrders) state.kitchenOrders = [];
    state.kitchenOrders.unshift(kdsOrder);

    // Clear Cart
    state.cart = [];
    saveState(state);

    playChimeSound();
    renderCart();
    closeCheckoutModal();
    openReceiptModal(newTx);
    showToast(`Transaksi ${txId} Berhasil!`, 'success');
  }

  // --- RECEIPT MODAL ---
  function openReceiptModal(tx) {
    const modal = document.getElementById('receiptModal');
    if (!modal) return;

    document.getElementById('receiptTxId').textContent = tx.id;
    document.getElementById('receiptDateTime').textContent = `${tx.date} ${tx.time}`;
    document.getElementById('receiptCustomer').textContent = `${tx.customer} (${tx.table})`;
    document.getElementById('receiptType').textContent = tx.type;

    const list = document.getElementById('receiptItemsList');
    if (list) {
      list.innerHTML = tx.items.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <div>
            <strong>${item.name}</strong> x ${item.qty}
          </div>
          <div>${formatRp(item.unitPrice * item.qty)}</div>
        </div>
      `).join('');
    }

    document.getElementById('receiptSubtotal').textContent = formatRp(tx.subtotal);
    document.getElementById('receiptTax').textContent = 'Rp 0';
    document.getElementById('receiptTotal').textContent = formatRp(tx.total);
    document.getElementById('receiptPayMethod').textContent = tx.method;
    document.getElementById('receiptPayGiven').textContent = formatRp(tx.given);
    document.getElementById('receiptChange').textContent = formatRp(tx.change);

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    // Search Bar Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenuGrid();
      });
    }

    // View Mode Switcher (Grid vs List)
    const btnViewGrid = document.getElementById('btnViewGrid');
    const btnViewList = document.getElementById('btnViewList');

    if (btnViewGrid) {
      btnViewGrid.addEventListener('click', () => {
        btnViewGrid.classList.add('active');
        if (btnViewList) btnViewList.classList.remove('active');
        currentViewMode = 'grid';
        renderMenuGrid();
      });
    }

    if (btnViewList) {
      btnViewList.addEventListener('click', () => {
        btnViewList.classList.add('active');
        if (btnViewGrid) btnViewGrid.classList.remove('active');
        currentViewMode = 'list';
        renderMenuGrid();
      });
    }

    // Category Tabs Filter
    document.querySelectorAll('.cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.cat;
        renderMenuGrid();
      });
    });

    // Order Type Selector
    document.querySelectorAll('.btn-order-type').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-order-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Reset Cart
    const btnResetCart = document.getElementById('btnResetCart');
    if (btnResetCart) btnResetCart.addEventListener('click', resetCart);

    // Hold Order & Drafts
    const btnHoldOrder = document.getElementById('btnHoldOrder');
    if (btnHoldOrder) btnHoldOrder.addEventListener('click', holdCurrentOrder);

    const btnViewDrafts = document.getElementById('btnViewDrafts');
    if (btnViewDrafts) btnViewDrafts.addEventListener('click', openHoldOrdersModal);

    const btnCloseHoldOrders = document.getElementById('btnCloseHoldOrders');
    const btnCancelHoldOrders = document.getElementById('btnCancelHoldOrders');
    if (btnCloseHoldOrders) btnCloseHoldOrders.addEventListener('click', closeHoldOrdersModal);
    if (btnCancelHoldOrders) btnCancelHoldOrders.addEventListener('click', closeHoldOrdersModal);

    // Checkout Modal Triggers
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) btnCheckout.addEventListener('click', openCheckoutModal);

    const btnCloseCheckout = document.getElementById('btnCloseCheckout');
    const btnCancelCheckout = document.getElementById('btnCancelCheckout');
    if (btnCloseCheckout) btnCloseCheckout.addEventListener('click', closeCheckoutModal);
    if (btnCancelCheckout) btnCancelCheckout.addEventListener('click', closeCheckoutModal);

    const btnConfirmPay = document.getElementById('btnConfirmPay');
    if (btnConfirmPay) btnConfirmPay.addEventListener('click', processPayment);

    // Payment Method Selector
    document.querySelectorAll('.btn-pay-method').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-pay-method').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePayMethod = btn.dataset.method;
      });
    });

    // Direct Cash Input Listener
    const payGivenInput = document.getElementById('payGivenInput');
    if (payGivenInput) {
      ['input', 'keyup', 'change'].forEach(evt => {
        payGivenInput.addEventListener(evt, () => {
          calculateChange();
        });
      });
    }

    // Quick Cash Buttons
    document.querySelectorAll('.btn-quick-cash').forEach(btn => {
      btn.addEventListener('click', () => {
        const cashVal = btn.dataset.cash;
        const cashInput = document.getElementById('payGivenInput');
        let grandTotal = parseInt(document.getElementById('checkoutGrandTotal')?.textContent.replace(/[^0-9]/g, '')) || 0;

        if (cashVal === 'pas') {
          cashInput.value = grandTotal;
        } else {
          cashInput.value = parseInt(cashVal);
        }
        calculateChange(grandTotal);
      });
    });

    // Numpad Buttons
    document.querySelectorAll('.cashier-numpad').forEach(btn => {
      btn.addEventListener('click', () => {
        const num = btn.dataset.num;
        const cashInput = document.getElementById('payGivenInput');
        let currentVal = cashInput.value || '';
        let grandTotal = parseInt(document.getElementById('checkoutGrandTotal')?.textContent.replace(/[^0-9]/g, '')) || 0;

        if (num === 'C') {
          currentVal = '';
        } else {
          currentVal += num;
        }
        cashInput.value = currentVal;
        calculateChange(grandTotal);
      });
    });

    // Switch Role Modal Trigger
    const triggerRole = document.getElementById('btnSwitchRoleModalTrigger');
    const switchRoleModal = document.getElementById('switchRoleModal');
    const btnCloseSwitchRole = document.getElementById('btnCloseSwitchRole');
    const btnSelectOwner = document.getElementById('btnSelectOwnerRole');
    const portalPinModal = document.getElementById('portalPinModal');
    const btnClosePortalPin = document.getElementById('btnClosePortalPin');
    const pinDisp = document.getElementById('portalPinDisplay');

    let enteredPin = '';

    if (triggerRole && switchRoleModal) {
      triggerRole.addEventListener('click', () => {
        switchRoleModal.classList.add('active');
        switchRoleModal.style.setProperty('display', 'flex', 'important');
      });
    }

    if (btnCloseSwitchRole && switchRoleModal) {
      btnCloseSwitchRole.addEventListener('click', () => {
        switchRoleModal.classList.remove('active');
        switchRoleModal.style.setProperty('display', 'none', 'important');
      });
    }

    if (btnSelectOwner) {
      btnSelectOwner.addEventListener('click', () => {
        if (switchRoleModal) {
          switchRoleModal.classList.remove('active');
          switchRoleModal.style.setProperty('display', 'none', 'important');
        }
        enteredPin = '';
        if (pinDisp) pinDisp.value = '';
        if (portalPinModal) {
          portalPinModal.classList.add('active');
          portalPinModal.style.setProperty('display', 'flex', 'important');
        }
      });
    }

    if (btnClosePortalPin && portalPinModal) {
      btnClosePortalPin.addEventListener('click', () => {
        portalPinModal.classList.remove('active');
        portalPinModal.style.setProperty('display', 'none', 'important');
      });
    }

    document.querySelectorAll('.owner-pin-key').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === 'C') {
          enteredPin = '';
        } else if (key === 'OK') {
          if (enteredPin === '9999') {
            sessionStorage.setItem('mieayamin_owner_authed', 'true');
            window.location.href = 'admin.html';
          } else {
            showToast('PIN Owner Salah! (Default: 9999)', 'danger');
            enteredPin = '';
          }
        } else {
          if (enteredPin.length < 6) enteredPin += key;
        }
        if (pinDisp) pinDisp.value = '•'.repeat(enteredPin.length);
      });
    });

    // Kasir History Modal Triggers
    const btnKasirHistory = document.getElementById('btnKasirHistory');
    const btnCloseKasirHistory = document.getElementById('btnCloseKasirHistory');
    const btnCloseKasirHistoryFooter = document.getElementById('btnCloseKasirHistoryFooter');
    const searchKasirTxInput = document.getElementById('searchKasirTxInput');

    if (btnKasirHistory) {
      btnKasirHistory.addEventListener('click', openKasirHistoryModal);
    }
    if (btnCloseKasirHistory) {
      btnCloseKasirHistory.addEventListener('click', closeKasirHistoryModal);
    }
    if (btnCloseKasirHistoryFooter) {
      btnCloseKasirHistoryFooter.addEventListener('click', closeKasirHistoryModal);
    }
    if (searchKasirTxInput) {
      searchKasirTxInput.addEventListener('input', renderKasirHistoryList);
    }

    // Receipt Modal Buttons
    const btnCloseReceipt = document.getElementById('btnCloseReceipt');
    const btnFinishReceipt = document.getElementById('btnFinishReceipt');
    const btnPrintReceipt = document.getElementById('btnPrintReceipt');

    if (btnCloseReceipt) btnCloseReceipt.addEventListener('click', closeReceiptModal);
    if (btnFinishReceipt) btnFinishReceipt.addEventListener('click', closeReceiptModal);
    if (btnPrintReceipt) btnPrintReceipt.addEventListener('click', () => window.print());
  }

  // --- KASIR HISTORY MODAL FUNCTIONS ---
  function openKasirHistoryModal() {
    const modal = document.getElementById('kasirHistoryModal');
    if (!modal) return;
    renderKasirHistoryList();
    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeKasirHistoryModal() {
    const modal = document.getElementById('kasirHistoryModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function renderKasirHistoryList() {
    const list = document.getElementById('kasirHistoryList');
    if (!list) return;

    const query = (document.getElementById('searchKasirTxInput')?.value || '').toLowerCase().trim();
    const txs = state.transactions || [];

    const filtered = txs.filter(tx =>
      tx.id.toLowerCase().includes(query) ||
      (tx.customer && tx.customer.toLowerCase().includes(query)) ||
      (tx.table && tx.table.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:30px; color:var(--text-muted);">
          <strong>Belum Ada Riwayat Transaksi</strong>
          <p style="font-size:0.85rem; margin-top:4px;">Transaksi yang diselesaikan di kasir akan muncul di sini.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(tx => `
      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-color); padding:12px 16px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <div>
          <strong style="color:var(--text-main); font-size:0.95rem; display:block;">${tx.id} — ${tx.customer} (${tx.table})</strong>
          <small style="color:var(--text-muted);">${tx.date} ${tx.time} • ${tx.method} • <span style="color:var(--primary); font-weight:700;">${formatRp(tx.total)}</span></small>
        </div>
        <button class="btn btn-secondary btn-sm btn-reprint-tx" data-id="${tx.id}">Cetak Struk</button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-reprint-tx').forEach(btn => {
      btn.addEventListener('click', () => {
        const txId = btn.dataset.id;
        const tx = txs.find(t => t.id === txId);
        if (tx) {
          closeKasirHistoryModal();
          openReceiptModal(tx);
        }
      });
    });
  }

})();
