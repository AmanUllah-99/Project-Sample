// Shared Cart Manager - Used by both Home and Cart pages
class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        try {
            return JSON.parse(localStorage.getItem('dryfruitCart')) || [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('dryfruitCart', JSON.stringify(this.cart));
            this.updateCartCounter();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(name, price, image) {
        const existingItem = this.cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name: name,
                price: parseInt(price),
                image: image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(`${name} added to cart!`, 'success');
        return this.cart;
    }

    removeItem(name) {
        this.cart = this.cart.filter(item => item.name !== name);
        this.saveCart();
        this.showNotification(`${name} removed from cart`, 'warning');
        return this.cart;
    }

    updateQuantity(name, quantity) {
        const item = this.cart.find(item => item.name === name);
        if (item) {
            if (quantity < 1) {
                this.removeItem(name);
            } else {
                item.quantity = parseInt(quantity);
                this.saveCart();
            }
        }
        return this.cart;
    }

    getCart() {
        return this.cart;
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartCounter() {
        const totalItems = this.getTotalItems();
        const cartBadges = document.querySelectorAll('.cart-badge');
        
        cartBadges.forEach(badge => {
            badge.textContent = totalItems;
        });

        // Update cart count in header if exists
        const headerCartCount = document.getElementById('headerCartCount');
        if (headerCartCount) {
            headerCartCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification
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
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        return this.cart;
    }
}

// Initialize global cart manager
window.cartManager = new CartManager();