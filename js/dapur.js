/* ==========================================================================
   MieAyamin POS - Dapur (KDS) Module (js/dapur.js)
   Clean & Professional KDS logic without excessive emojis
   ========================================================================== */

(function () {
  'use strict';

  const { loadState, saveState, showToast, startLiveClock, playChimeSound } = window.POSStorage;

  let state = loadState();
  let previousKdsLength = (state.kitchenOrders || []).length;
  let timerInterval = null;
  let currentFilter = 'all';

  document.addEventListener('DOMContentLoaded', () => {
    initDapur();
  });

  function initDapur() {
    startLiveClock('liveClock');
    renderKdsGrid();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateLiveTimers, 1000);

    window.addEventListener('storage', (e) => {
      if (e.key === window.POSStorage.STORAGE_KEY) {
        state = loadState();
        const orders = state.kitchenOrders || [];
        const currentLength = orders.length;
        if (currentLength > previousKdsLength) {
          playChimeSound();
          showToast('Pesanan Baru Masuk dari Kasir', 'warning');
        }
        previousKdsLength = currentLength;
        renderKdsGrid(currentFilter);
      }
    });

    document.querySelectorAll('.kds-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.kds-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.status;
        renderKdsGrid(currentFilter);
      });
    });
  }

  function getTimerClass(elapsedSec) {
    if (elapsedSec >= 600) return 'urgent';
    if (elapsedSec >= 300) return 'warn';
    return '';
  }

  function getStatusLabel(status) {
    if (status === 'Masuk') return 'Baru Masuk';
    if (status === 'Diproses') return 'Sedang Dimasak';
    if (status === 'Selesai') return 'Selesai';
    return status;
  }

  function getTypeLabel(type) {
    if (!type) return '';
    if (type.toLowerCase().includes('bungkus')) return 'Bungkus';
    if (type.toLowerCase().includes('ojol')) return 'Ojol';
    return 'Dine-in';
  }

  function renderKdsGrid(statusFilter = 'all') {
    const grid = document.getElementById('kdsOrdersGrid');
    const badgeCount = document.getElementById('kdsActiveCountBadge');
    if (!grid) return;

    let orders = state.kitchenOrders || [];

    const activeOrders = orders.filter(o => o.status !== 'Selesai');
    if (badgeCount) badgeCount.textContent = activeOrders.length;

    if (statusFilter !== 'all') {
      orders = orders.filter(o => o.status === statusFilter);
    }

    if (orders.length === 0) {
      grid.innerHTML = `
        <div class="kds-empty">
          <h3>Tidak Ada Antrean Masakan</h3>
          <p>Semua pesanan selesai dimasak, atau belum ada pesanan baru dari kasir.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = orders.map(ord => {
      const createdAt = ord.createdAt || Date.now();
      const elapsedSec = Math.max(0, Math.floor((Date.now() - createdAt) / 1000));
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const secs = String(elapsedSec % 60).padStart(2, '0');
      const timerCls = getTimerClass(elapsedSec);

      const cardStatus = {
        'Masuk': 'status-masuk',
        'Diproses': 'status-diproses',
        'Selesai': 'status-selesai'
      }[ord.status] || 'status-masuk';

      let nextActionBtn = '';
      if (ord.status === 'Masuk') {
        nextActionBtn = `<button class="kds-btn-next btn-kds-process" data-id="${ord.id}">Mulai Masak</button>`;
      } else if (ord.status === 'Diproses') {
        nextActionBtn = `<button class="kds-btn-next btn-kds-done" data-id="${ord.id}" style="background: linear-gradient(135deg, #10b981, #047857);">Selesai Dimasak</button>`;
      } else {
        nextActionBtn = `<button class="kds-btn-next" disabled>Pesanan Selesai</button>`;
      }

      return `
        <div class="kds-card ${cardStatus}" data-id="${ord.id}" data-created="${createdAt}">
          <div class="kds-card-header">
            <div>
              <strong class="kds-table">${ord.table}</strong>
              <small class="kds-customer">${ord.customer || 'Pelanggan'}</small>
            </div>
            <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
              <span class="kds-type-badge">${getTypeLabel(ord.type)}</span>
              <span class="kds-timer ${timerCls}" data-created="${createdAt}">
                ⏱️ <span class="timer-val">${mins}:${secs}</span>
              </span>
            </div>
          </div>
          <div class="kds-card-body">
            <ul class="kds-item-list">
              ${(ord.items || []).map(it => `
                <li>
                  <span class="kds-item-qty">${it.qty}x</span>
                  <div>
                    <span class="kds-item-name">${it.name}</span>
                    ${it.notesText ? `<span class="kds-item-note">Catatan: ${it.notesText}</span>` : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="kds-card-footer">
            <span class="kds-status-label">${getStatusLabel(ord.status)}</span>
            ${nextActionBtn}
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-kds-process').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = (state.kitchenOrders || []).find(o => o.id === id);
        if (target) {
          target.status = 'Diproses';
          saveState(state);
          renderKdsGrid(currentFilter);
          showToast(`${target.table} sedang dimasak`, 'warning');
        }
      });
    });

    grid.querySelectorAll('.btn-kds-done').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = (state.kitchenOrders || []).find(o => o.id === id);
        if (target) {
          target.status = 'Selesai';
          saveState(state);
          renderKdsGrid(currentFilter);
          playChimeSound();
          showToast(`${target.table} selesai dimasak`, 'success');
        }
      });
    });
  }

  function updateLiveTimers() {
    document.querySelectorAll('.kds-timer[data-created]').forEach(badge => {
      const createdAt = parseInt(badge.dataset.created);
      if (!createdAt) return;
      const elapsedSec = Math.max(0, Math.floor((Date.now() - createdAt) / 1000));
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const secs = String(elapsedSec % 60).padStart(2, '0');

      const valEl = badge.querySelector('.timer-val');
      if (valEl) valEl.textContent = `${mins}:${secs}`;

      badge.className = `kds-timer ${getTimerClass(elapsedSec)}`;
    });
  }

})();
