/* ==========================================================================
   MieAyamin POS - Owner / Admin Module (js/admin.js)
   Full CRUD for Menu Catalog & Raw Material Stock Inventory
   ========================================================================== */

(function () {
  'use strict';

  const { loadState, saveState, formatRp, showToast, startLiveClock } = window.POSStorage;

  let state = loadState();
  let editingMenuId = null;

  document.addEventListener('DOMContentLoaded', () => {
    initAdmin();
  });

  function initAdmin() {
    checkOwnerAuth();
    startLiveClock('liveClock');
    renderAnalytics();
    renderAdminMenuGrid();
    renderStockTable();
    renderFeedbackTable();
    bindAdminEvents();
  }

  // --- OWNER AUTH CHECK ---
  function checkOwnerAuth() {
    const isAuthed = sessionStorage.getItem('mieayamin_owner_authed');
    const modal = document.getElementById('ownerPinModal');
    if (!isAuthed && modal) {
      modal.classList.add('active');
      modal.style.setProperty('display', 'flex', 'important');
    }
  }

  function verifyOwnerPin() {
    const entered = window.enteredOwnerPin || '';
    if (entered === '9999') {
      sessionStorage.setItem('mieayamin_owner_authed', 'true');
      const modal = document.getElementById('ownerPinModal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.setProperty('display', 'none', 'important');
      }
      showToast('Akses Owner Berhasil Diverifikasi!', 'success');
    } else {
      showToast('PIN Owner Salah! (Default: 9999)', 'danger');
      window.enteredOwnerPin = '';
      const disp = document.getElementById('ownerPinDisplay');
      if (disp) disp.value = '';
    }
  }

  // --- ANALYTICS & DASHBOARD ---
  function renderAnalytics() {
    const txs = state.transactions || [];

    const totalOmset = txs.reduce((sum, t) => sum + (t.total || 0), 0);
    const totalTxCount = txs.length;
    const estProfit = Math.round(totalOmset * 0.45);
    const qrisTotal = txs.filter(t => t.method === 'QRIS').reduce((sum, t) => sum + (t.total || 0), 0);

    const omsetEl = document.getElementById('totalOmsetVal');
    const countEl = document.getElementById('totalTxCountVal');
    const profitEl = document.getElementById('estProfitVal');
    const qrisEl = document.getElementById('qrisIncomeVal');

    if (omsetEl) omsetEl.textContent = formatRp(totalOmset);
    if (countEl) countEl.textContent = totalTxCount + ' Transaksi';
    if (profitEl) profitEl.textContent = formatRp(estProfit);
    if (qrisEl) qrisEl.textContent = formatRp(qrisTotal);

    renderHourlyChart(txs);
    renderBestSellers(txs);
    renderAdminTxTable(txs);
    renderAdminClosingReportsTable();
  }

  function renderHourlyChart(txs) {
    const chartContainer = document.getElementById('hourlySalesChart');
    if (!chartContainer) return;

    const hoursMap = {};
    for (let h = 10; h <= 21; h++) {
      hoursMap[h] = 0;
    }

    txs.forEach(t => {
      if (t.time) {
        const hour = parseInt(t.time.split(':')[0]);
        if (hoursMap[hour] !== undefined) {
          hoursMap[hour] += t.total || 0;
        }
      }
    });

    const maxVal = Math.max(...Object.values(hoursMap), 100000);

    chartContainer.innerHTML = Object.keys(hoursMap).map(h => {
      const val = hoursMap[h];
      const heightPct = Math.max(10, Math.round((val / maxVal) * 100));
      return `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
          <small style="font-size:0.7rem; font-weight:700; color:var(--primary); margin-bottom:4px;">${val > 0 ? (val/1000)+'k' : ''}</small>
          <div style="width:100%; max-width:28px; background:linear-gradient(to top, var(--primary), #f59e0b); height:${heightPct}%; border-radius:6px 6px 0 0;" title="${h}:00 - ${formatRp(val)}"></div>
          <small style="font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-top:6px;">${h}:00</small>
        </div>
      `;
    }).join('');
  }

  function renderBestSellers(txs) {
    const bestSellerList = document.getElementById('bestSellerList');
    if (!bestSellerList) return;

    const itemCounts = {};
    txs.forEach(t => {
      (t.items || []).forEach(it => {
        itemCounts[it.name] = (itemCounts[it.name] || 0) + it.qty;
      });
    });

    const sortedItems = Object.keys(itemCounts)
      .map(name => ({ name, qty: itemCounts[name] }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    if (sortedItems.length === 0) {
      bestSellerList.innerHTML = '<li class="text-muted" style="padding:10px;">Belum ada data penjualan</li>';
    } else {
      bestSellerList.innerHTML = sortedItems.map((item, i) => `
        <li class="best-seller-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px dashed var(--border-color);">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="rank-num" style="background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:99px; font-weight:800; font-size:0.8rem;">#${i + 1}</span>
            <span class="item-name" style="font-weight:700;">${item.name}</span>
          </div>
          <strong class="item-sold" style="color:var(--primary); font-size:0.9rem;">${item.qty} Porsi</strong>
        </li>
      `).join('');
    }
  }

  function renderAdminTxTable(txs) {
    const txTable = document.getElementById('adminTxTableBody');
    if (!txTable) return;

    const query = (document.getElementById('searchTxInput')?.value || '').toLowerCase().trim();
    const filtered = txs.filter(tx =>
      tx.id.toLowerCase().includes(query) ||
      (tx.customer && tx.customer.toLowerCase().includes(query)) ||
      (tx.table && tx.table.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      txTable.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:20px;">Tidak ada data transaksi ditemukan</td></tr>`;
    } else {
      txTable.innerHTML = filtered.map(tx => `
        <tr>
          <td><strong>${tx.id}</strong></td>
          <td><small>${tx.date} ${tx.time}</small></td>
          <td><span class="badge badge-secondary">${tx.type}</span></td>
          <td>${tx.customer} (${tx.table})</td>
          <td><strong>${formatRp(tx.total)}</strong></td>
          <td><span class="badge ${tx.method === 'QRIS' ? 'badge-info' : 'badge-success'}">${tx.method}</span></td>
          <td><span class="badge badge-success">${tx.status}</span></td>
          <td style="display:flex; gap:6px;">
            <button class="btn btn-primary btn-sm btn-admin-detail" data-id="${tx.id}">Detail</button>
            <button class="btn btn-secondary btn-sm btn-admin-reprint" data-id="${tx.id}">Struk</button>
          </td>
        </tr>
      `).join('');

      txTable.querySelectorAll('.btn-admin-detail').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const target = txs.find(t => t.id === id);
          if (target) openTxDetailModal(target);
        });
      });

      txTable.querySelectorAll('.btn-admin-reprint').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const target = txs.find(t => t.id === id);
          if (target) openReceiptModal(target);
        });
      });
    }
  }

  function renderAdminClosingReportsTable() {
    const tableBody = document.getElementById('adminClosingTableBody');
    if (!tableBody) return;

    const reports = state.closingReports || [];
    if (reports.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:20px;">Belum ada laporan closing shift kasir yang tercatat</td></tr>`;
      return;
    }

    tableBody.innerHTML = reports.map(r => {
      let statusBadge = '<span class="badge badge-success">Sesuai / Pas</span>';
      if (r.diff > 0) statusBadge = `<span class="badge badge-info">+${formatRp(r.diff)} (Lebih)</span>`;
      else if (r.diff < 0) statusBadge = `<span class="badge badge-danger">${formatRp(r.diff)} (Selisih)</span>`;

      const dateDisplay = r.fullDateTime || `${r.date} (${r.time})`;

      return `
        <tr>
          <td><strong>${dateDisplay}</strong></td>
          <td><span class="badge badge-secondary">${r.cashier || 'Kasir'}</span></td>
          <td><strong style="color:var(--primary);">${formatRp(r.totalOmset)}</strong></td>
          <td>${formatRp(r.expectedCash)}</td>
          <td><strong>${formatRp(r.actualCash)}</strong></td>
          <td><span style="font-weight:700; color:${r.diff === 0 ? '#047857' : (r.diff > 0 ? '#3b82f6' : '#dc2626')}">${formatRp(r.diff)}</span></td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-primary btn-sm btn-admin-cs-detail" data-id="${r.id}">🔍 Detail</button>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.querySelectorAll('.btn-admin-cs-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = reports.find(r => r.id === id);
        if (target) openCsDetailModal(target);
      });
    });
  }

  // --- KELOLA MENU PRODUK (FULL CRUD: CREATE, READ, UPDATE, DELETE) ---
  function renderAdminMenuGrid() {
    const grid = document.getElementById('adminMenuGrid');
    if (!grid) return;

    if (!state.customMenu) state.customMenu = JSON.parse(JSON.stringify(window.POSStorage.DEFAULT_MENU));
    const items = state.customMenu;

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:var(--text-muted);">Belum ada produk di katalog menu.</div>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="menu-card" style="background:#fff; border:1px solid var(--border-color); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; box-shadow:var(--shadow-sm);">
        <div style="position:relative; width:100%; height:140px; background:#f1f5f9;">
          <img src="${item.customImage || item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
          <span class="badge badge-warning" style="position:absolute; top:6px; left:6px;">${item.cat}</span>
        </div>
        <div style="padding:14px; flex:1; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <h4 style="font-weight:800; font-size:0.95rem; margin-bottom:4px;">${item.name}</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${item.desc || ''}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:8px; border-top:1px dashed var(--border-color);">
            <strong style="color:var(--primary); font-size:1.05rem;">${formatRp(item.price)}</strong>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary btn-sm btn-admin-edit-detail" data-id="${item.id}">Edit Detail</button>
              <button class="btn btn-secondary btn-sm btn-admin-delete-menu" data-id="${item.id}" style="color:var(--danger); border-color:#fee2e2; background:#fff5f5;">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Bind Edit Detail
    grid.querySelectorAll('.btn-admin-edit-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = items.find(m => m.id === id);
        if (target) openEditMenuModal(target);
      });
    });

    // Bind Delete Menu
    grid.querySelectorAll('.btn-admin-delete-menu').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = items.find(m => m.id === id);
        if (target && confirm(`Apakah Anda yakin ingin menghapus menu "${target.name}"?`)) {
          state.customMenu = state.customMenu.filter(m => m.id !== id);
          saveState(state);
          renderAdminMenuGrid();
          showToast(`Menu "${target.name}" telah dihapus`, 'success');
        }
      });
    });
  }

  function openAddMenuModal() {
    editingMenuId = null;
    const modal = document.getElementById('addMenuModal');
    const titleEl = document.getElementById('addMenuModalTitle');
    if (!modal) return;

    if (titleEl) titleEl.textContent = 'Tambah Menu Produk Baru';
    document.getElementById('newMenuName').value = '';
    document.getElementById('newMenuPrice').value = '';
    document.getElementById('newMenuDesc').value = '';
    document.getElementById('newMenuImgUrl').value = '';
    document.getElementById('newMenuImgFile').value = '';

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function openEditMenuModal(item) {
    editingMenuId = item.id;
    const modal = document.getElementById('addMenuModal');
    const titleEl = document.getElementById('addMenuModalTitle');
    if (!modal) return;

    if (titleEl) titleEl.textContent = `Edit Detail Menu: ${item.name}`;
    document.getElementById('newMenuName').value = item.name;
    document.getElementById('newMenuCat').value = item.cat || 'mie';
    document.getElementById('newMenuPrice').value = item.price;
    document.getElementById('newMenuDesc').value = item.desc || '';
    document.getElementById('newMenuImgUrl').value = item.customImage || item.image || '';
    document.getElementById('newMenuImgFile').value = '';

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeAddMenuModal() {
    editingMenuId = null;
    const modal = document.getElementById('addMenuModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function saveNewMenu() {
    const name = document.getElementById('newMenuName')?.value.trim();
    const cat = document.getElementById('newMenuCat')?.value;
    const price = parseInt(document.getElementById('newMenuPrice')?.value) || 0;
    const desc = document.getElementById('newMenuDesc')?.value.trim();
    const imgUrl = document.getElementById('newMenuImgUrl')?.value.trim();

    if (!name || price <= 0) {
      showToast('Mohon isi nama menu dan harga yang valid!', 'danger');
      return;
    }

    if (!state.customMenu) state.customMenu = JSON.parse(JSON.stringify(window.POSStorage.DEFAULT_MENU));

    if (editingMenuId) {
      // UPDATE existing item
      const idx = state.customMenu.findIndex(m => m.id === editingMenuId);
      if (idx > -1) {
        state.customMenu[idx].name = name;
        state.customMenu[idx].cat = cat;
        state.customMenu[idx].price = price;
        state.customMenu[idx].desc = desc || 'Menu lezat pilihan warung.';
        if (imgUrl) {
          state.customMenu[idx].customImage = imgUrl;
          state.customMenu[idx].image = imgUrl;
        }
        showToast(`Detail menu "${name}" berhasil diperbarui!`, 'success');
      }
    } else {
      // CREATE new item
      const newItem = {
        id: 'menu-' + Date.now(),
        name,
        cat,
        price,
        desc: desc || 'Menu lezat pilihan warung.',
        image: imgUrl || 'images/mie_yamin_manis.png',
        customImage: imgUrl || '',
        ingredients: [{ id: 'mie_basah', qty: 1 }]
      };
      state.customMenu.unshift(newItem);
      showToast(`Menu "${name}" berhasil ditambahkan ke katalog!`, 'success');
    }

    saveState(state);
    renderAdminMenuGrid();
    closeAddMenuModal();
  }

  // --- KELOLA STOK & BAHAN BAKU (FULL CRUD) ---
  function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    if (!state.stock) state.stock = JSON.parse(JSON.stringify(window.POSStorage.DEFAULT_INGREDIENTS));
    const stockData = state.stock;

    tbody.innerHTML = Object.keys(stockData).map(key => {
      const item = stockData[key];
      const isLow = item.stock <= item.minStock;

      return `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn-qty btn-quick-sub-stock" data-key="${key}" style="width:28px; height:28px; border-radius:6px; border:1px solid var(--border-color); background:#fff; font-weight:800; cursor:pointer;">-</button>
              <strong style="color: ${isLow ? 'var(--danger)' : 'var(--text-main)'}; font-size:1.1rem; min-width:60px; text-align:center;">
                ${item.stock} ${item.unit}
              </strong>
              <button class="btn-qty btn-quick-add-stock" data-key="${key}" style="width:28px; height:28px; border-radius:6px; border:1px solid var(--border-color); background:#fff; font-weight:800; cursor:pointer;">+</button>
            </div>
          </td>
          <td><small class="text-muted">Batas Minimal: ${item.minStock} ${item.unit}</small></td>
          <td>
            ${isLow
              ? '<span class="badge badge-danger">Stok Menipis</span>'
              : '<span class="badge badge-success">Aman</span>'}
          </td>
          <td style="display:flex; gap:6px;">
            <button class="btn btn-secondary btn-sm btn-restock-ten" data-key="${key}">Restock +10</button>
            <button class="btn btn-secondary btn-sm btn-edit-stock-details" data-key="${key}">Edit</button>
            <button class="btn btn-secondary btn-sm btn-delete-stock" data-key="${key}" style="color:var(--danger); border-color:#fee2e2; background:#fff5f5;">Hapus</button>
          </td>
        </tr>
      `;
    }).join('');

    // -1 Stock
    tbody.querySelectorAll('.btn-quick-sub-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (state.stock[key] && state.stock[key].stock > 0) {
          state.stock[key].stock -= 1;
          saveState(state);
          renderStockTable();
          renderAnalytics();
        }
      });
    });

    // +1 Stock
    tbody.querySelectorAll('.btn-quick-add-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (state.stock[key]) {
          state.stock[key].stock += 1;
          saveState(state);
          renderStockTable();
          renderAnalytics();
        }
      });
    });

    // Restock +10
    tbody.querySelectorAll('.btn-restock-ten').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (state.stock[key]) {
          state.stock[key].stock += 10;
          saveState(state);
          renderStockTable();
          renderAnalytics();
          showToast(`Stok ${state.stock[key].name} +10 ${state.stock[key].unit}`, 'success');
        }
      });
    });

    // Edit Stock Details
    tbody.querySelectorAll('.btn-edit-stock-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const item = state.stock[key];
        if (!item) return;

        const newName = prompt(`Ubah Nama Bahan Baku "${item.name}":`, item.name);
        if (newName === null) return;
        const newQtyStr = prompt(`Ubah Jumlah Stok "${item.name}":`, item.stock);
        if (newQtyStr === null) return;
        const newMinStr = prompt(`Ubah Batas Minimal Stok "${item.name}":`, item.minStock);
        if (newMinStr === null) return;

        item.name = newName.trim() || item.name;
        item.stock = parseInt(newQtyStr) || 0;
        item.minStock = parseInt(newMinStr) || item.minStock;

        saveState(state);
        renderStockTable();
        renderAnalytics();
        showToast(`Stok ${item.name} berhasil diperbarui!`, 'success');
      });
    });

    // Delete Stock Item
    tbody.querySelectorAll('.btn-delete-stock').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const item = state.stock[key];
        if (item && confirm(`Yakin ingin menghapus bahan baku "${item.name}"?`)) {
          delete state.stock[key];
          saveState(state);
          renderStockTable();
          renderAnalytics();
          showToast(`Bahan baku "${item.name}" dihapus`, 'success');
        }
      });
    });
  }

  function openAddStockModal() {
    const modal = document.getElementById('addStockModal');
    if (!modal) return;
    document.getElementById('newStockName').value = '';
    document.getElementById('newStockQty').value = '';
    document.getElementById('newStockMin').value = '10';
    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeAddStockModal() {
    const modal = document.getElementById('addStockModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function saveNewStock() {
    const name = document.getElementById('newStockName')?.value.trim();
    const qty = parseInt(document.getElementById('newStockQty')?.value) || 0;
    const unit = document.getElementById('newStockUnit')?.value || 'porsi';
    const minStock = parseInt(document.getElementById('newStockMin')?.value) || 10;

    if (!name) {
      showToast('Mohon isi nama bahan baku!', 'danger');
      return;
    }

    const key = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (!state.stock) state.stock = JSON.parse(JSON.stringify(window.POSStorage.DEFAULT_INGREDIENTS));

    state.stock[key] = {
      name,
      stock: qty,
      unit,
      minStock
    };

    saveState(state);
    renderStockTable();
    closeAddStockModal();
    showToast(`Bahan baku "${name}" berhasil ditambahkan!`, 'success');
  }

  // --- CUSTOMER REVIEWS FEEDBACK ---
  function renderFeedbackTable() {
    const tbody = document.getElementById('feedbackTableBody');
    if (!tbody) return;

    const feedbacks = state.feedbacks || [];
    if (feedbacks.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding:20px;">Belum ada ulasan dari pelanggan</td></tr>`;
      return;
    }

    tbody.innerHTML = feedbacks.map(fb => `
      <tr>
        <td><small>${fb.date}</small></td>
        <td><strong>${fb.name}</strong> <small class="text-muted">(${fb.table || 'Meja Umum'})</small></td>
        <td><span style="color:#f59e0b; font-weight:700;">${'⭐'.repeat(fb.rating)} (${fb.rating}/5)</span></td>
        <td>"${fb.review}"</td>
        <td><span class="badge badge-success">Terverifikasi</span></td>
      </tr>
    `).join('');
  }

  // --- DETAIL & RECEIPT MODALS IN ADMIN ---
  function openTxDetailModal(tx) {
    const modal = document.getElementById('txDetailModal');
    if (!modal) return;

    document.getElementById('tdTxId').textContent = tx.id;
    document.getElementById('tdDateTime').textContent = tx.date + ' ' + tx.time;
    document.getElementById('tdCustomer').textContent = `${tx.customer} (${tx.table})`;
    document.getElementById('tdType').textContent = tx.type;

    const list = document.getElementById('tdItemsList');
    if (list) {
      list.innerHTML = tx.items.map(item => `
        <div class="checkout-detail-item">
          <div>
            <strong>${item.name}</strong> x ${item.qty}
            ${item.notesText ? `<br><small style="color:#666;">(${item.notesText})</small>` : ''}
          </div>
          <div>${formatRp(item.unitPrice * item.qty)}</div>
        </div>
      `).join('');
    }

    document.getElementById('tdSubtotal').textContent = formatRp(tx.subtotal);
    document.getElementById('tdTax').textContent = formatRp(tx.tax);
    document.getElementById('tdTotal').textContent = formatRp(tx.total);
    document.getElementById('tdPayMethod').textContent = tx.method;
    document.getElementById('tdPayGiven').textContent = formatRp(tx.given);
    document.getElementById('tdChange').textContent = formatRp(tx.change);

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeTxDetailModal() {
    const modal = document.getElementById('txDetailModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  function openReceiptModal(tx) {
    const modal = document.getElementById('receiptModal');
    if (!modal) return;

    document.getElementById('receiptTxId').textContent = tx.id;
    document.getElementById('receiptDateTime').textContent = tx.date + ' ' + tx.time;
    document.getElementById('receiptCustomer').textContent = `${tx.customer} (${tx.table})`;
    document.getElementById('receiptType').textContent = tx.type;

    const list = document.getElementById('receiptItemsList');
    if (list) {
      list.innerHTML = tx.items.map(item => `
        <div class="receipt-item-row">
          <div>
            <strong>${item.name}</strong> x ${item.qty}
            ${item.notesText ? `<br><small style="color:#666;">(${item.notesText})</small>` : ''}
          </div>
          <div>${formatRp(item.unitPrice * item.qty)}</div>
        </div>
      `).join('');
    }

    document.getElementById('receiptSubtotal').textContent = formatRp(tx.subtotal);
    document.getElementById('receiptTax').textContent = formatRp(tx.tax);
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

  // --- DETAIL LAPORAN CLOSING MODAL IN ADMIN ---
  function openCsDetailModal(r) {
    const modal = document.getElementById('csDetailModal');
    if (!modal) return;

    const elDate = document.getElementById('csdDateTime');
    const elCashier = document.getElementById('csdCashier');
    const elBadge = document.getElementById('csdStatusBadge');
    const elOmset = document.getElementById('csdTotalOmset');
    const elTxCount = document.getElementById('csdTxCount');
    const elCash = document.getElementById('csdTotalCash');
    const elQris = document.getElementById('csdTotalQris');
    const elTransfer = document.getElementById('csdTotalTransfer');
    const elActual = document.getElementById('csdActualCash');
    const elDiff = document.getElementById('csdDiffVal');

    const dateDisplay = r.fullDateTime || `${r.date} (${r.time})`;
    if (elDate) elDate.textContent = dateDisplay;
    if (elCashier) elCashier.textContent = `Kasir: ${r.cashier || 'Kasir'}`;

    if (elBadge) {
      if (r.diff === 0) {
        elBadge.className = 'badge badge-success';
        elBadge.textContent = 'Sesuai (Rp 0)';
      } else if (r.diff > 0) {
        elBadge.className = 'badge badge-info';
        elBadge.textContent = `+${formatRp(r.diff)} (Uang Lebih)`;
      } else {
        elBadge.className = 'badge badge-danger';
        elBadge.textContent = `${formatRp(r.diff)} (Uang Kurang/Selisih)`;
      }
    }

    if (elOmset) elOmset.textContent = formatRp(r.totalOmset);
    if (elTxCount) elTxCount.textContent = `${r.txCount || 0} Transaksi (${r.totalItemsSold || 0} Porsi Terjual)`;
    if (elCash) elCash.textContent = formatRp(r.expectedCash);
    if (elQris) elQris.textContent = formatRp(r.qrisTotal || 0);
    if (elTransfer) elTransfer.textContent = formatRp(r.transferTotal || 0);
    if (elActual) elActual.textContent = formatRp(r.actualCash);

    if (elDiff) {
      if (r.diff === 0) {
        elDiff.textContent = 'Rp 0 (Sesuai / Pas)';
        elDiff.style.color = '#047857';
      } else if (r.diff > 0) {
        elDiff.textContent = `+${formatRp(r.diff)} (Uang Lebih)`;
        elDiff.style.color = '#3b82f6';
      } else {
        elDiff.textContent = `${formatRp(r.diff)} (Selisih Kurang)`;
        elDiff.style.color = '#dc2626';
      }
    }

    modal.classList.add('active');
    modal.style.setProperty('display', 'flex', 'important');
  }

  function closeCsDetailModal() {
    const modal = document.getElementById('csDetailModal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.setProperty('display', 'none', 'important');
    }
  }

  // --- ADMIN EVENT BINDINGS ---
  function bindAdminEvents() {
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const tabId = item.dataset.tab;
        document.querySelectorAll('.admin-tab-page').forEach(page => {
          page.classList.remove('active');
          if (page.id === tabId) page.classList.add('active');
        });
      });
    });

    // Add Menu Modal Triggers
    const btnOpenAddMenu = document.getElementById('btnOpenAddMenuModal');
    const btnCloseAddMenu = document.getElementById('btnCloseAddMenu');
    const btnCancelAddMenu = document.getElementById('btnCancelAddMenu');
    const btnSaveNewMenu = document.getElementById('btnSaveNewMenu');

    if (btnOpenAddMenu) btnOpenAddMenu.addEventListener('click', openAddMenuModal);
    if (btnCloseAddMenu) btnCloseAddMenu.addEventListener('click', closeAddMenuModal);
    if (btnCancelAddMenu) btnCancelAddMenu.addEventListener('click', closeAddMenuModal);
    if (btnSaveNewMenu) btnSaveNewMenu.addEventListener('click', saveNewMenu);

    // Add Stock Modal Triggers
    const btnOpenAddStock = document.getElementById('btnRestockModal');
    const btnCloseAddStock = document.getElementById('btnCloseAddStock');
    const btnCancelAddStock = document.getElementById('btnCancelAddStock');
    const btnSaveNewStock = document.getElementById('btnSaveNewStock');

    if (btnOpenAddStock) btnOpenAddStock.addEventListener('click', openAddStockModal);
    if (btnCloseAddStock) btnCloseAddStock.addEventListener('click', closeAddStockModal);
    if (btnCancelAddStock) btnCancelAddStock.addEventListener('click', closeAddStockModal);
    if (btnSaveNewStock) btnSaveNewStock.addEventListener('click', saveNewStock);

    // File Input for New Menu Image
    const newMenuImgFile = document.getElementById('newMenuImgFile');
    if (newMenuImgFile) {
      newMenuImgFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            document.getElementById('newMenuImgUrl').value = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Owner PIN Keypad
    document.querySelectorAll('.owner-keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (!window.enteredOwnerPin) window.enteredOwnerPin = '';

        if (key === 'C') {
          window.enteredOwnerPin = '';
        } else if (key === 'OK') {
          verifyOwnerPin();
          return;
        } else {
          if (window.enteredOwnerPin.length < 6) window.enteredOwnerPin += key;
        }
        const disp = document.getElementById('ownerPinDisplay');
        if (disp) disp.value = '•'.repeat(window.enteredOwnerPin.length);
      });
    });

    // Search Filter
    const searchTxInput = document.getElementById('searchTxInput');
    if (searchTxInput) searchTxInput.addEventListener('input', renderAnalytics);

    // Detail & Receipt Modal Buttons
    const btnCloseTxDetail = document.getElementById('btnCloseTxDetail');
    const btnFinishTxDetail = document.getElementById('btnFinishTxDetail');
    const btnCloseReceipt = document.getElementById('btnCloseReceipt');
    const btnFinishReceipt = document.getElementById('btnFinishReceipt');
    const btnCloseCsDetail = document.getElementById('btnCloseCsDetail');
    const btnFinishCsDetail = document.getElementById('btnFinishCsDetail');

    if (btnCloseTxDetail) btnCloseTxDetail.addEventListener('click', closeTxDetailModal);
    if (btnFinishTxDetail) btnFinishTxDetail.addEventListener('click', closeTxDetailModal);
    if (btnCloseReceipt) btnCloseReceipt.addEventListener('click', closeReceiptModal);
    if (btnFinishReceipt) btnFinishReceipt.addEventListener('click', closeReceiptModal);
    if (btnCloseCsDetail) btnCloseCsDetail.addEventListener('click', closeCsDetailModal);
    if (btnFinishCsDetail) btnFinishCsDetail.addEventListener('click', closeCsDetailModal);
  }

})();
