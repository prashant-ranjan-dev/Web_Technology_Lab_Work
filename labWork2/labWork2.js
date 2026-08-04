const productsData = [
    { id: 1, name: 'HouseOfCommon Men Striped High Neck Wool Blend Black T-Shirt', desc: 'Premium wool blend winter T-shirt with high neck design', price: 272, img: 'https://rukminim2.flixcart.com/image/1272/1272/xif0q/t-shirt/u/3/9/s-dhneck-1-hoc-houseofcommon-original-imahjpm6knecvgwd.jpeg?q=90' },
    { id: 2, name: 'Samsung Galaxy M17e', desc: '6 GB RAM • 128 GB Storage • Blitz Blue', price: 16107, img: 'https://rukminim2.flixcart.com/image/1272/1272/xif0q/mobile/g/g/w/galaxy-m17e-sm-m076b-samsung-original-imahm8hmqjcryhmz.jpeg?q=90' },
    { id: 3, name: 'Elkos QUICK FLOW LITE Ball Pens', desc: 'Pack of 30 premium blue ink ball pens.', price: 300, img: 'https://rukminim2.flixcart.com/image/1272/1272/xif0q/pen/f/o/s/quick-flow-lite-ball-pen-blue-ink-pack-of-30-pcs-elkos-original-imahzffhzcyvgsvh.jpeg?q=90' },
    { id: 4, name: 'SONATA SF Hexa Digital Watch', desc: 'Stainless steel digital watch for men & women.', price: 1269, img: 'https://rukminim2.flixcart.com/image/1272/1272/xif0q/watch/y/b/4/-watermarked-original-imahexncudhkfgr4.jpeg?q=90' },
    { id: 5, name: 'Mixer Grinder', desc: 'Crompton 500W Mixer Grinder', price: 1799, img: 'https://rukminim1.flixcart.com/image/1272/1272/xif0q/mixer-grinder-juicer/s/o/f/acgm-ds500w3j-blk-crompton-enriched-transparent-original-imags4eghgrkwmgg.png?q=90' }
];

const state = { cart: [] };

function renderProducts() {
    const el = document.getElementById('products'); el.innerHTML = '';
    productsData.forEach(p => {
        const card = document.createElement('div'); card.className = 'card';
        card.innerHTML = `
					<img src="${p.img}" alt="${p.name}">
					<div class="body">
						<h4>${p.name}</h4>
						<p>${p.desc}</p>
						<div class="price">₹ ${p.price}</div>
						<div class="actions"><button class="btn" onclick="addToCart(${p.id})">Add to Cart</button></div>
					</div>`;
        el.appendChild(card);
    });
}

function saveCart() { localStorage.setItem('simple_shop_cart', JSON.stringify(state.cart)); updateCartCount(); }
function loadCart() { state.cart = JSON.parse(localStorage.getItem('simple_shop_cart') || '[]'); updateCartCount(); }

function addToCart(id) {
    const p = productsData.find(x => x.id === id); if (!p) return;
    const item = { ...p, qty: 1 };
    const exists = state.cart.find(c => c.id === id);
    if (exists) exists.qty++;
    else state.cart.push(item);
    saveCart();
    alert('Added to cart');
}

function updateCartCount() {
    const count = state.cart.reduce((s, it) => s + it.qty, 0);
    document.getElementById('cart-count').textContent = count;
}

function navigate(view) {
    ['products', 'cart', 'checkout', 'bill', 'success'].forEach(v => document.getElementById(v + '-view').style.display = 'none');
    document.getElementById(view + '-view').style.display = '';
    if (view === 'cart') renderCart();
    if (view === 'products') renderProducts();
    if (view === 'bill') renderBill();
}

function renderCart() {
    const area = document.getElementById('cart-area');
    if (state.cart.length === 0) { area.innerHTML = '<p>Cart is empty.</p>'; return; }
    let html = '<table><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th></th></tr>';
    state.cart.forEach(it => { html += `<tr><td>${it.name}</td><td>${it.qty}</td><td>₹ ${it.price}</td><td>₹ ${it.price * it.qty}</td><td><button class="btn muted" onclick="removeItem(${it.id})">Remove</button></td></tr>` });
    const grand = state.cart.reduce((s, it) => s + it.price * it.qty, 0);
    html += `<tr><td colspan="3"><strong>Grand Total</strong></td><td><strong>₹ ${grand}</strong></td><td></td></tr></table>`;
    area.innerHTML = html;
}

function removeItem(id) { state.cart = state.cart.filter(c => c.id !== id); saveCart(); renderCart(); }
function clearCart() { if (confirm('Clear cart?')) { state.cart = []; saveCart(); renderCart(); } }

function submitCheckout(e) {
    e.preventDefault();
    if (state.cart.length === 0) { alert('Cart is empty'); navigate('products'); return false; }
    const name = document.getElementById('cust-name').value.trim();
    const mobile = document.getElementById('cust-mobile').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const order = { customer: { name, mobile, address }, items: state.cart, grand: state.cart.reduce((s, it) => s + it.price * it.qty, 0) };
    localStorage.setItem('simple_shop_order', JSON.stringify(order));
    navigate('bill');
    return false;
}

function renderBill() {
    const order = JSON.parse(localStorage.getItem('simple_shop_order') || 'null');
    if (!order) { document.getElementById('bill-area').innerHTML = '<p>No order found.</p>'; return; }
    let html = `<h3>Customer</h3><p>${order.customer.name}<br>${order.customer.mobile}<br>${order.customer.address}</p>`;
    html += '<h3>Items</h3><table><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>';
    order.items.forEach(it => { html += `<tr><td>${it.name}</td><td>${it.qty}</td><td>₹ ${it.price}</td><td>₹ ${it.price * it.qty}</td></tr>` });
    html += `</table><h3>Grand Total: ₹ ${order.grand}</h3>`;
    document.getElementById('bill-area').innerHTML = html;
}

function completeOrder() { localStorage.removeItem('simple_shop_cart'); state.cart = []; updateCartCount(); navigate('success'); }

function printBill() { window.print(); }

// init
loadCart(); renderProducts();