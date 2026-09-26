/* ============ Helpers ============ */
const NGN = n => '₦' + Number(n).toLocaleString('en-NG');
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const escHtml = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const WHATSAPP_NUMBER = '2347038563822';

/* ============ Icon set (inline line-icons, no external images) ============ */
const ICONS = {
  leaf: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 34C10 20 20 10 36 10c1 14-9 24-24 24Z"/><path d="M14 32C18 26 24 20 34 14"/></svg>`,
  lipstick: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="17" y="20" width="14" height="20" rx="3"/><path d="M19 20l1-8h8l1 8"/><path d="M20 12l1-4h6l1 4"/></svg>`,
  palette: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8C13 8 6 16 6 25c0 6 4 9 9 9 2 0 3-1 3-3s-1-3-1-5c0-3 3-4 6-4h5c5 0 9-4 9-9 0-3-5-5-13-5Z"/><circle cx="16" cy="20" r="2" fill="currentColor" stroke="none"/><circle cx="24" cy="15" r="2" fill="currentColor" stroke="none"/><circle cx="32" cy="20" r="2" fill="currentColor" stroke="none"/></svg>`,
  eye: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 24c4-8 12-13 18-13s14 5 18 13c-4 8-12 13-18 13S10 32 6 24Z"/><circle cx="24" cy="24" r="5"/><path d="M15 12l-2-4M24 10V6M33 12l2-4"/></svg>`,
  nail: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18h14l-2 20a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3l-2-20Z"/><rect x="19" y="10" width="10" height="8" rx="2"/></svg>`,
  mask: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6C14 6 8 14 8 24c0 10 6 18 16 18s16-8 16-18C40 14 34 6 24 6Z"/><path d="M16 22c1-2 3-2 4 0M28 22c1-2 3-2 4 0"/><path d="M18 32c3 2 9 2 12 0"/></svg>`,
  massage: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6c6 8 10 14 10 20a10 10 0 0 1-20 0c0-6 4-12 10-20Z"/><path d="M8 40c3-2 5-2 8 0s5 2 8 0 5-2 8 0 5 2 8 0"/></svg>`,
  ribbon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h20l-8 16 8 16H14l8-16Z"/></svg>`,
  perfume: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="18" width="16" height="22" rx="4"/><rect x="20" y="10" width="8" height="8" rx="2"/><path d="M24 6v4M30 12l3-2M18 12l-3-2"/></svg>`,
  gift: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="18" width="32" height="10" rx="2"/><rect x="12" y="28" width="24" height="12" rx="2"/><path d="M24 18v22"/><path d="M24 18c-3-6-11-6-11-1 0 3 5 1 11 1Zm0 0c3-6 11-6 11-1 0 3-5 1-11 1Z"/></svg>`
};
const icon = name => ICONS[name] || ICONS.leaf;

/* ============ Data ============ */
// CATEGORIES and PRODUCTS now live in products.js (edit via admin.html — they're
// loaded by index.html before this file, so they're already defined here).
// SHIPPING_ZONES lives in shipping.js, loaded the same way.
// PAYSTACK_PUBLIC_KEY lives in config.js, loaded the same way.


/* ============ State ============ */
const state = {
  cart: JSON.parse(localStorage.getItem('hbp_cart') || '{}'),
  wishlist: JSON.parse(localStorage.getItem('hbp_wishlist') || '[]'),
  activeCat: null,
  search: '',
  wishlistOnly: false
};

function saveState(){
  localStorage.setItem('hbp_cart', JSON.stringify(state.cart));
  localStorage.setItem('hbp_wishlist', JSON.stringify(state.wishlist));
  updateBadges();
}
function updateBadges(){
  const cartCount = Object.values(state.cart).reduce((a,b)=>a+b,0);
  $('#cart-count').textContent = cartCount;
  const wc = $('#wish-count');
  wc.textContent = state.wishlist.length;
  wc.classList.toggle('hidden', state.wishlist.length === 0);
}
function toast(msg){
  $('#toast-text').textContent = msg;
  const t = $('#toast');
  t.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.add('hidden'), 2400);
}
function catName(id){ return CATEGORIES.find(c => c.id === id)?.name || ''; }

/* ============ Services section: wire "Book this" buttons on each photo card ============ */
function bindServiceCards(){
  $$('.service-card .service-book').forEach(btn => {
    btn.onclick = () => {
      openModal('#booking-modal');
      const sel = $('#bk-service');
      if(sel && [...sel.options].some(o => o.value === btn.dataset.service)){
        sel.value = btn.dataset.service;
      }
    };
  });
}

/* ============ Render: filter pills ============ */
function renderFilterRow(){
  const pills = [{ id:null, name:'All' }, ...CATEGORIES];
  $('#filter-row').innerHTML = pills.map(c => `
    <button class="pill ${state.activeCat === c.id ? 'active' : ''}" data-cat="${c.id ?? ''}">${escHtml(c.name)}</button>
  `).join('');
  $$('#filter-row .pill').forEach(btn => {
    btn.onclick = () => {
      state.activeCat = btn.dataset.cat || null;
      state.wishlistOnly = false;
      $('#wishlist-toggle').classList.remove('active-icon');
      renderFilterRow();
      renderProducts();
    };
  });
}

/* ============ Render: product grid ============ */
function filteredProducts(){
  let list = [...PRODUCTS];
  if(state.wishlistOnly){
    list = list.filter(p => state.wishlist.includes(p.id));
  } else if(state.activeCat){
    list = list.filter(p => p.cat === state.activeCat);
  }
  const q = state.search.trim().toLowerCase();
  if(q) list = list.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    catName(p.cat).toLowerCase().includes(q)
  );
  return list;
}

function renderProducts(){
  const list = filteredProducts();
  $('#showing-text').textContent = state.wishlistOnly
    ? `${list.length} saved item${list.length === 1 ? '' : 's'}`
    : `Showing ${list.length} of ${PRODUCTS.length} items`;

  const grid = $('#product-grid');
  if(!list.length){
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--ink-60);padding:40px 0;">No products match — try a different search or category.</p>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="p-card">
      <div class="p-media${p.image ? ' has-img' : ''}">
        ${p.best ? '<span class="p-best">Best seller</span>' : ''}
        <button class="p-wish ${state.wishlist.includes(p.id) ? 'active' : ''}" data-wish="${p.id}" aria-label="Save to wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M12 19.4l-7-6.8a4.3 4.3 0 0 1 6.2-6l.8.8.8-.8a4.3 4.3 0 0 1 6.2 6l-7 6.8Z"/></svg>
        </button>
        ${p.image ? `<img src="${escHtml(p.image)}" alt="${escHtml(p.name)}" loading="lazy" onerror="this.remove(); this.closest('.p-media').classList.remove('has-img');">` : ''}
        ${icon(p.icon)}
      </div>
      <div class="p-body">
        <p class="p-cat">${escHtml(catName(p.cat))}</p>
        <p class="p-name">${escHtml(p.name)}</p>
        <p class="p-desc">${escHtml(p.desc)}</p>
        <div class="p-foot">
          <span class="p-price">${NGN(p.price)}</span>
          <button class="p-add" data-add="${p.id}">Add to bag</button>
        </div>
      </div>
    </div>`).join('');

  $$('#product-grid [data-add]').forEach(btn => btn.onclick = () => addToCart(+btn.dataset.add));
  $$('#product-grid [data-wish]').forEach(btn => btn.onclick = () => toggleWishlist(+btn.dataset.wish));
}

function toggleWishlist(id){
  const i = state.wishlist.indexOf(id);
  if(i > -1) state.wishlist.splice(i, 1); else state.wishlist.push(id);
  saveState();
  renderProducts();
}

/* ============ Cart ============ */
function addToCart(id){
  state.cart[id] = (state.cart[id] || 0) + 1;
  saveState();
  renderCart();
  toast('Added to bag');
}
function setQty(id, qty){
  if(qty <= 0) delete state.cart[id]; else state.cart[id] = qty;
  saveState();
  renderCart();
}
function removeFromCart(id){
  delete state.cart[id];
  saveState();
  renderCart();
  toast('Removed from bag');
}
function cartLines(){
  return Object.entries(state.cart)
    .map(([id, qty]) => { const p = PRODUCTS.find(x => x.id === +id); return p ? { ...p, qty } : null; })
    .filter(Boolean);
}
function cartTotal(){ return cartLines().reduce((sum, l) => sum + l.price * l.qty, 0); }

function renderCart(){
  const lines = cartLines();
  const body = $('#cart-items');
  if(!lines.length){
    body.innerHTML = `<div class="drawer-empty">Your bag is empty.<br>Add something from the shop.</div>`;
  } else {
    body.innerHTML = lines.map(l => `
      <div class="cart-line">
        <div class="cl-media"><img src="${escHtml(l.image || 'images/product-collection.webp')}" alt="${escHtml(l.name)}" loading="lazy"></div>
        <div class="cl-body">
          <p class="cl-name">${escHtml(l.name)}</p>
          <p class="cl-price">${NGN(l.price)} each</p>
          <div class="cl-row">
            <div class="qty-stepper">
              <button data-dec="${l.id}" aria-label="Decrease quantity">−</button>
              <span>${l.qty}</span>
              <button data-inc="${l.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cl-remove" data-remove="${l.id}">Remove</button>
          </div>
        </div>
      </div>`).join('');
    $$('#cart-items [data-inc]').forEach(b => b.onclick = () => setQty(+b.dataset.inc, (state.cart[b.dataset.inc] || 0) + 1));
    $$('#cart-items [data-dec]').forEach(b => b.onclick = () => setQty(+b.dataset.dec, (state.cart[b.dataset.dec] || 0) - 1));
    $$('#cart-items [data-remove]').forEach(b => b.onclick = () => removeFromCart(+b.dataset.remove));
  }
  $('#cart-subtotal').textContent = NGN(cartTotal());
}

/* ============ Drawer / modal open-close ============ */
function openCart(){ $('#cart-drawer').classList.add('open'); $('#overlay').classList.remove('hidden'); }
function closeCart(){ $('#cart-drawer').classList.remove('open'); if(everyModalHidden()) $('#overlay').classList.add('hidden'); }
function openModal(sel){ $(sel).classList.remove('hidden'); $('#overlay').classList.remove('hidden'); }
function closeModals(){ $$('.modal').forEach(m => m.classList.add('hidden')); if(!$('#cart-drawer').classList.contains('open')) $('#overlay').classList.add('hidden'); }
function everyModalHidden(){ return [...$$('.modal')].every(m => m.classList.contains('hidden')); }

$('#cart-toggle').onclick = () => { renderCart(); openCart(); };
$('#cart-close').onclick = closeCart;
$('#overlay').onclick = () => { closeCart(); closeModals(); };
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeCart(); closeModals(); } });

$('#wishlist-toggle').onclick = () => {
  state.wishlistOnly = !state.wishlistOnly;
  state.activeCat = null;
  $('#wishlist-toggle').classList.toggle('active-icon', state.wishlistOnly);
  renderFilterRow();
  renderProducts();
  $('#shop').scrollIntoView({ behavior:'smooth', block:'start' });
};

/* ============ Mobile menu & search ============ */
$('#menu-toggle').onclick = () => $('#mobile-menu').classList.toggle('hidden');
function closeMobileMenu(){ $('#mobile-menu').classList.add('hidden'); }
$$('#mobile-menu a').forEach(a => a.onclick = closeMobileMenu);

function handleSearch(v){
  state.search = v;
  state.wishlistOnly = false;
  renderProducts();
}
$('#search-input').oninput = e => handleSearch(e.target.value);
$('#search-input-mobile').oninput = e => { $('#search-input').value = e.target.value; handleSearch(e.target.value); };

/* ============ Checkout (Paystack payment + shipping fee) ============ */
const VERIFY_ENDPOINT = (typeof VERIFY_PAYMENT_ENDPOINT !== 'undefined' && VERIFY_PAYMENT_ENDPOINT) || '/api/verify-payment';

// Builds <optgroup> markup from SHIPPING_ZONES (loaded from shipping.js).
function populateShippingSelect(){
  const sel = $('#co-shipping');
  if(!sel || typeof SHIPPING_ZONES === 'undefined') return;
  const groups = {};
  SHIPPING_ZONES.forEach((z, i) => {
    const g = z.group || 'Delivery';
    (groups[g] = groups[g] || []).push({ ...z, _idx: i });
  });
  sel.innerHTML = Object.keys(groups).map(g => `
    <optgroup label="${escHtml(g)}">
      ${groups[g].map(z => `<option value="${z._idx}">${escHtml(z.label)}${z.fee ? ' — ' + NGN(z.fee) : ' — Free'}</option>`).join('')}
    </optgroup>`).join('');
  onShippingChange();
}
function selectedShippingZone(){
  const sel = $('#co-shipping');
  if(!sel || typeof SHIPPING_ZONES === 'undefined' || sel.value === '') return null;
  return SHIPPING_ZONES[Number(sel.value)] || null;
}
function shippingFee(){
  const z = selectedShippingZone();
  return z ? (Number(z.fee) || 0) : 0;
}
function onShippingChange(){
  const z = selectedShippingZone();
  const isPickup = !z || /pickup/i.test(z.label || '') || Number(z.fee) === 0;
  $('#co-address-field').style.display = isPickup ? 'none' : 'block';
  const noteEl = $('#co-shipping-note');
  if(noteEl){
    noteEl.textContent = z && z.note ? z.note : '';
    noteEl.style.display = z && z.note ? 'block' : 'none';
  }
  renderCheckoutSummary();
}
$('#co-shipping') && ($('#co-shipping').onchange = onShippingChange);

function renderCheckoutSummary(){
  const lines = cartLines();
  const fee = shippingFee();
  const rows = lines.map(l => `<div class="os-row"><span>${escHtml(l.name)} × ${l.qty}</span><span>${NGN(l.price * l.qty)}</span></div>`).join('');
  const feeRow = `<div class="os-row"><span>Delivery</span><span>${fee ? NGN(fee) : 'Free'}</span></div>`;
  $('#checkout-summary').innerHTML = rows + feeRow + `<div class="os-row os-total"><span>Total</span><span>${NGN(cartTotal() + fee)}</span></div>`;
}

$('#cart-checkout').onclick = () => {
  if(!cartLines().length){ toast('Your bag is empty'); return; }
  closeCart();
  populateShippingSelect();
  renderCheckoutSummary();
  openModal('#checkout-modal');
};
$('#checkout-close').onclick = closeModals;

function buildOrderRef(){
  return 'HBP-' + Date.now().toString(36).toUpperCase();
}

$('#checkout-form').onsubmit = e => {
  e.preventDefault();
  const name = $('#co-name').value.trim();
  const phone = $('#co-phone').value.trim();
  const email = $('#co-email').value.trim();
  const zone = selectedShippingZone();
  const address = $('#co-address').value.trim();
  const lines = cartLines();
  const fee = shippingFee();
  const total = cartTotal() + fee;

  if(!name || !phone || !email){ toast('Please fill in your name, phone and email'); return; }
  if(zone && Number(zone.fee) > 0 && !address){ toast('Please add a delivery address'); return; }

  if(typeof PaystackPop === 'undefined' || typeof PAYSTACK_PUBLIC_KEY === 'undefined' || !PAYSTACK_PUBLIC_KEY){
    toast('Payment is not set up yet — please message us on WhatsApp instead.');
    return;
  }

  const ref = buildOrderRef();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Opening payment…'; }

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: Math.round(total * 100), // kobo
    currency: 'NGN',
    ref,
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
        { display_name: 'Phone', variable_name: 'phone', value: phone },
        { display_name: 'Delivery', variable_name: 'delivery', value: zone ? zone.label : 'Pickup' },
        { display_name: 'Items', variable_name: 'items', value: lines.map(l => `${l.name} x${l.qty}`).join(', ') }
      ]
    },
    callback: response => {
      verifyAndRedirect(response.reference, { name, email, zone, address, total, itemsCount: lines.reduce((a,l)=>a+l.qty,0) });
    },
    onClose: () => {
      if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Pay & place order'; }
      window.location.href = `payment-declined.html?ref=${encodeURIComponent(ref)}&items=${lines.length}&reason=cancelled`;
    }
  });
  handler.openIframe();
};

async function verifyAndRedirect(reference, order){
  const qs = new URLSearchParams({
    ref: reference,
    name: order.name,
    email: order.email,
    total: order.total,
    items: order.itemsCount
  });
  if(order.zone){
    qs.set('city', order.zone.label);
    qs.set('state', order.zone.group || '');
  }
  try{
    const res = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference })
    });
    const data = await res.json().catch(() => ({}));
    if(res.ok && data.status === 'success'){
      state.cart = {};
      saveState();
      renderCart();
      window.location.href = `payment-success.html?${qs.toString()}`;
    } else if(res.ok && data.status === 'pending'){
      state.cart = {};
      saveState();
      renderCart();
      window.location.href = `payment-success.html?${qs.toString()}&pending=1`;
    } else {
      window.location.href = `payment-declined.html?${qs.toString()}&reason=declined`;
    }
  } catch(err){
    // Payment likely went through on Paystack's side, but we couldn't reach
    // our own verification endpoint — send them to the "unverified" state
    // rather than telling them it failed outright.
    window.location.href = `payment-declined.html?${qs.toString()}&reason=unverified`;
  }
}

/* ============ Booking (sent via WhatsApp) ============ */
function populateBookingServices(){
  $('#bk-service').innerHTML = CATEGORIES.map(c => `<option value="${escHtml(c.name)}">${escHtml(c.name)}</option>`).join('');
}
function openBooking(){ openModal('#booking-modal'); }
$('#book-open-header').onclick = openBooking;
$('#book-open-mobile').onclick = () => { closeMobileMenu(); openBooking(); };
$('#book-open-hero').onclick = openBooking;
$('#book-open-promo').onclick = openBooking;
$('#booking-close').onclick = closeModals;

$('#booking-form').onsubmit = e => {
  e.preventDefault();
  const name = $('#bk-name').value.trim();
  const phone = $('#bk-phone').value.trim();
  const service = $('#bk-service').value;
  const date = $('#bk-date').value;
  const time = $('#bk-time').value;
  const notes = $('#bk-notes').value.trim();

  let msg = `Hi Hanni Beauty Palace, I'd like to book a session:\n\nService: ${service}\nDate: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}`;
  if(notes) msg += `\nNotes: ${notes}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  closeModals();
  e.target.reset();
  toast('Booking request sent — check WhatsApp');
};

/* ============ Newsletter (front-end only — connect to a real list before launch) ============ */
$('#newsletter-form').onsubmit = e => {
  e.preventDefault();
  toast("Thanks — you're on the list!");
  e.target.reset();
};


/* ============ FAQ accordion ============ */
document.addEventListener('click', (e)=>{
  const summary = e.target.closest('.faq-q');
  if(!summary) return;
  const details = summary.closest('.faq-item');
  // close others (optional - keep only one open)
  document.querySelectorAll('.faq-item[open]').forEach(d=>{
    if(d!==details) d.removeAttribute('open');
  });
});

/* ============ Map copy buttons ============ */
window.copyText = (txt)=>{
  navigator.clipboard.writeText(txt).then(()=> toast('Copied: '+txt));
};

/* ============ Init ============ */
function init(){
  bindServiceCards();
  renderFilterRow();
  populateBookingServices();
  renderProducts();
  renderCart();
  updateBadges();
  const today = new Date().toISOString().split('T')[0];
  $('#bk-date').min = today;
}
init();
