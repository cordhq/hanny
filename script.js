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

/* ============ Data — mirrors Hanni Beauty Palace's real service menu ============ */
const CATEGORIES = [
  { id:'skincare',    name:'Organic Skincare',        icon:'leaf' },
  { id:'makeup',      name:'Makeup',                  icon:'lipstick' },
  { id:'cosmetics',   name:'Cosmetics',                icon:'palette' },
  { id:'lash',        name:'Lash & Microblading',      icon:'eye' },
  { id:'nails',       name:'Pedicure & Manicure',      icon:'nail' },
  { id:'facials',     name:'Facials',                  icon:'mask' },
  { id:'massage',     name:'Body Massage & Spa',        icon:'massage' },
  { id:'enhancement', name:'Body Enhancement',          icon:'ribbon' },
  { id:'perfume',     name:'Perfume & Body Spray',      icon:'perfume' },
  { id:'wellness',    name:'Wellness Gifts',            icon:'gift' }
];

const PRODUCT_IMAGES = {
  skincare: 'images/vitamin-c-serum.webp',
  makeup: 'images/lipstick-mauve.webp',
  cosmetics: 'images/eyeshadow-palette.webp',
  lash: 'images/lash-kit.webp',
  nails: 'images/nail-polish.webp',
  facials: 'images/shea-butter.webp',
  massage: 'images/body-oil-lavender.webp',
  perfume: 'images/body-oil-lavender.webp',
  wellness: 'images/product-collection.webp',
  enhancement: 'images/salon-interior.webp',
  // per-product overrides
  byId: {
    1: 'images/vitamin-c-serum.webp',
    2: 'images/shea-butter.webp',
    3: 'images/lipstick-mauve.webp',
    4: 'images/lipstick-mauve.webp',
    5: 'images/eyeshadow-palette.webp',
    6: 'images/lash-kit.webp',
    7: 'images/nail-polish.webp',
    8: 'images/shea-butter.webp',
    9: 'images/body-oil-lavender.webp',
    10: 'images/body-oil-lavender.webp',
    11: 'images/product-collection.webp'
  }
};


const PRODUCTS = [
  { id:1,  name:'Radiance Face Serum',        cat:'skincare',    icon:'leaf',     price:8500,  best:true,  desc:'Vitamin C & botanical blend for an even, dewy glow.', image:'images/vitamin-c-serum.webp' },
  { id:2,  name:'Whipped Shea Body Butter',   cat:'skincare',    icon:'leaf',     price:6000,  best:false, desc:'Deeply nourishing, fragrance-light body butter.', image:'images/shea-butter.webp' },
  { id:3,  name:'Velvet Matte Lip Kit',       cat:'makeup',      icon:'lipstick', price:5500,  best:true,  desc:'Long-wear matte lipstick with a soft liner pencil.', image:'images/lipstick-mauve.webp' },
  { id:4,  name:'Everyday Glow Foundation',   cat:'makeup',      icon:'lipstick', price:9000,  best:false, desc:'Buildable, breathable coverage in a Nigerian shade range.', image:'images/lipstick-mauve.webp' },
  { id:5,  name:'Signature Eyeshadow Palette',cat:'cosmetics',   icon:'palette',  price:7500,  best:false, desc:'12 blendable shades, from soft nude to bold plum.', image:'images/eyeshadow-palette.webp' },
  { id:6,  name:'Luxe Lash Extension Set',    cat:'lash',        icon:'eye',      price:12000, best:true,  desc:'Salon-grade lashes for your next microblading session.', image:'images/lash-kit.webp' },
  { id:7,  name:'Gel Manicure Polish Duo',    cat:'nails',       icon:'nail',     price:7000,  best:false, desc:'Chip-resistant gel colour, two bottles of your choice.', image:'images/nail-polish.webp' },
  { id:8,  name:'Rejuvenating Clay Mask',     cat:'facials',     icon:'mask',     price:4500,  best:true,  desc:'Purifying facial clay for a fresh, even complexion.', image:'images/shea-butter.webp' },
  { id:9,  name:'Relax Massage Oil Blend',    cat:'massage',     icon:'massage',  price:6500,  best:false, desc:'Warm botanical oil used in our signature spa sessions.', image:'images/body-oil-lavender.webp' },
  { id:10, name:'Signature Body Spray Duo',   cat:'perfume',     icon:'perfume',  price:5000,  best:false, desc:'Two long-lasting fragrances, light enough for daily wear.', image:'images/body-oil-lavender.webp' },
  { id:11, name:'Wellness Gift Box',          cat:'wellness',    icon:'gift',     price:10000, best:false, desc:'A curated set of traditional care essentials, beautifully packaged.', image:'images/product-collection.webp' }
];


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

/* ============ Render: shop-by-service tiles ============ */
function renderServices(){
  $('#service-grid').innerHTML = CATEGORIES.map(c => `
    <button class="service-tile" data-cat="${c.id}">
      <span class="s-icon">${icon(c.icon)}</span>
      <span class="s-name">${escHtml(c.name)}</span>
    </button>`).join('');
  $$('#service-grid .service-tile').forEach(btn => {
    btn.onclick = () => {
      state.activeCat = btn.dataset.cat;
      state.wishlistOnly = false;
      $('#wishlist-toggle').classList.remove('active-icon');
      renderFilterRow();
      renderProducts();
      $('#shop').scrollIntoView({ behavior:'smooth', block:'start' });
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
      <div class="p-media">
        ${p.best ? '<span class="p-best">Best seller</span>' : ''}
        <button class="p-wish ${state.wishlist.includes(p.id) ? 'active' : ''}" data-wish="${p.id}" aria-label="Save to wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M12 19.4l-7-6.8a4.3 4.3 0 0 1 6.2-6l.8.8.8-.8a4.3 4.3 0 0 1 6.2 6l-7 6.8Z"/></svg>
        </button>
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
        <div class="cl-media"><img src="${(PRODUCT_IMAGES.byId && PRODUCT_IMAGES.byId[l.id]) || PRODUCT_IMAGES[l.cat] || 'images/product-collection.webp'}" alt="${l.name}" loading="lazy"></div>
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

/* ============ Checkout (sent via WhatsApp — no payment gateway on file) ============ */
function renderCheckoutSummary(){
  const lines = cartLines();
  const rows = lines.map(l => `<div class="os-row"><span>${escHtml(l.name)} × ${l.qty}</span><span>${NGN(l.price * l.qty)}</span></div>`).join('');
  $('#checkout-summary').innerHTML = rows + `<div class="os-row os-total"><span>Total</span><span>${NGN(cartTotal())}</span></div>`;
}

$('#cart-checkout').onclick = () => {
  if(!cartLines().length){ toast('Your bag is empty'); return; }
  closeCart();
  renderCheckoutSummary();
  openModal('#checkout-modal');
};
$('#checkout-close').onclick = closeModals;
$('#co-address-field').style.display = 'none';
$('#co-method').onchange = e => { $('#co-address-field').style.display = e.target.value === 'Delivery' ? 'block' : 'none'; };

$('#checkout-form').onsubmit = e => {
  e.preventDefault();
  const name = $('#co-name').value.trim();
  const phone = $('#co-phone').value.trim();
  const method = $('#co-method').value;
  const address = $('#co-address').value.trim();
  const lines = cartLines();

  let msg = `Hi Hanni Beauty Palace, I'd like to place an order:\n\n`;
  lines.forEach(l => msg += `• ${l.name} x${l.qty} — ${NGN(l.price * l.qty)}\n`);
  msg += `\nTotal: ${NGN(cartTotal())}\n\nName: ${name}\nPhone: ${phone}\nDelivery: ${method}`;
  if(method === 'Delivery' && address) msg += `\nAddress: ${address}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  state.cart = {};
  saveState();
  renderCart();
  closeModals();
  e.target.reset();
  toast('Order sent — check WhatsApp');
};

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
  renderServices();
  renderFilterRow();
  populateBookingServices();
  renderProducts();
  renderCart();
  updateBadges();
  const today = new Date().toISOString().split('T')[0];
  $('#bk-date').min = today;
}
init();
