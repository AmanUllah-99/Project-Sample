// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    const cart = JSON.parse(localStorage.getItem('dryfruitCart')) || [];
    let discountApplied = false;
    
    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartElement = document.getElementById('emptyCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const quickCheckoutBtn = document.getElementById('quickCheckout');
    
    // Initialize cart display
    renderCart();
    updateSummary();
    updateCartStats();
    
    // Event Listeners
    document.addEventListener('click', handleCartActions);
    document.addEventListener('change', handleQuantityChange);
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    if (quickCheckoutBtn) {
        quickCheckoutBtn.addEventListener('click', quickCheckout);
    }
    
    // Discount code handling
    const applyDiscountBtn = document.getElementById('applyDiscount');
    const discountCodeInput = document.getElementById('discountCode');
    
    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener('click', applyDiscount);
    }
    
    if (discountCodeInput) {
        discountCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyDiscount();
            }
        });
    }
    
    // Functions
    function renderCart() {
        if (cart.length === 0) {
            emptyCartElement.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            return;
        }
        
        emptyCartElement.style.display = 'none';
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-item="${item.name}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatCurrency(item.price)}/kg</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-name="${item.name}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-name="${item.name}">
                        <button class="quantity-btn increase" data-name="${item.name}">+</button>
                    </div>
                </div>
                <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
                <button class="remove-btn" data-name="${item.name}" title="Remove item">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    function handleCartActions(e) {
        const target = e.target.closest('button');
        if (!target) return;
        
        const name = target.getAttribute('data-name');
        
        if (target.classList.contains('increase')) {
            updateItemQuantity(name, 1);
        } else if (target.classList.contains('decrease')) {
            updateItemQuantity(name, -1);
        } else if (target.classList.contains('remove-btn')) {
            removeItem(name);
        } else if (target.classList.contains('btn-add')) {
            const price = target.getAttribute('data-price');
            addItem(name, price, target.getAttribute('data-image'));
        }
    }
    
    function handleQuantityChange(e) {
        if (e.target.classList.contains('quantity-input')) {
            const name = e.target.getAttribute('data-name');
            const quantity = parseInt(e.target.value) || 1;
            setItemQuantity(name, quantity);
        }
    }
    
    function addItem(name, price, image) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: parseInt(price),
                image: image || getProductImage(name),
                quantity: 1
            });
        }
        
        saveCart();
        renderCart();
        updateSummary();
        updateCartStats();
        showNotification(`${name} added to cart!`, 'success');
    }
    
    function removeItem(name) {
        const index = cart.findIndex(item => item.name === name);
        if (index > -1) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
            updateSummary();
            updateCartStats();
            showNotification(`${name} removed from cart`, 'warning');
        }
    }
    
    function updateItemQuantity(name, change) {
        const item = cart.find(item => item.name === name);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity < 1) {
                removeItem(name);
            } else {
                item.quantity = newQuantity;
                saveCart();
                renderCart();
                updateSummary();
            }
        }
    }
    
    function setItemQuantity(name, quantity) {
        const item = cart.find(item => item.name === name);
        if (item) {
            if (quantity < 1) {
                removeItem(name);
            } else {
                item.quantity = quantity;
                saveCart();
                renderCart();
                updateSummary();
            }
        }
    }
    
    function updateSummary() {
        const totals = calculateTotals();
        
        document.getElementById('subtotal').textContent = totals.subtotal;
        document.getElementById('shipping').textContent = totals.shipping;
        document.getElementById('tax').textContent = totals.tax;
        document.getElementById('discount').textContent = `-${totals.discount}`;
        document.getElementById('total').textContent = totals.total;
        
        // Update shipping message
        if (totals.rawSubtotal > 5000) {
            document.getElementById('shipping').innerHTML = '<span class="text-success">FREE</span>';
        }
    }
    
    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 5000 ? 0 : 200;
        const tax = subtotal * 0.13;
        
        let discount = 0;
        if (discountApplied && subtotal > 0) {
            discount = subtotal * 0.1;
        }
        
        const total = Math.max(0, subtotal + shipping + tax - discount);
        
        return {
            subtotal: formatCurrency(subtotal),
            shipping: formatCurrency(shipping),
            tax: formatCurrency(tax),
            discount: formatCurrency(discount),
            total: formatCurrency(total),
            rawSubtotal: subtotal
        };
    }
    
    function updateCartStats() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        document.getElementById('cartItemCount').textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        document.getElementById('headerCartCount').textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        
        // Update floating button
        const fab = document.getElementById('quickCheckout');
        if (fab) {
            fab.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        // Update header cart badge
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    }
    
    function applyDiscount() {
        const code = discountCodeInput.value.trim();
        if (code.toUpperCase() === 'DRYFRUIT10') {
            discountApplied = true;
            showNotification('🎉 10% discount applied!', 'success');
            updateSummary();
        } else {
            showNotification('Invalid discount code', 'error');
            discountApplied = false;
            updateSummary();
        }
    }
    
    function proceedToCheckout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        const btn = checkoutBtn;
        btn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Processing...';
        btn.disabled = true;
        
        setTimeout(() => {
            showNotification('🎉 Order completed successfully!', 'success');
            cart.length = 0;
            saveCart();
            renderCart();
            updateSummary();
            updateCartStats();
            
            btn.innerHTML = '<i class="fa fa-lock me-2"></i>Proceed to Secure Checkout<span class="btn-arrow">→</span>';
            btn.disabled = false;
        }, 2000);
    }
    
    function quickCheckout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        showNotification('🚀 Processing quick checkout...', 'info');
        
        setTimeout(() => {
            showNotification('✅ Order placed successfully!', 'success');
            cart.length = 0;
            saveCart();
            renderCart();
            updateSummary();
            updateCartStats();
        }, 1500);
    }
    
    function saveCart() {
        localStorage.setItem('dryfruitCart', JSON.stringify(cart));
    }
    
    function formatCurrency(amount) {
        return `PKR ${amount.toLocaleString()}`;
    }
    
    function getProductImage(name) {
        const images = {
            'Almonds': '../Backdround/badam.png',
            'Cashews': '../Backdround/kaju.png',
            'Pistachios': '../Backdround/targa.png'
        };
        return images[name] || '../Backdround/default.png';
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fa fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'} me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
});