  
        // Navbar scroll effect
        const bottomNavbar = document.querySelector(".bottom-navbar");
        
        window.addEventListener("scroll", function () {
            if (window.scrollY > 150) {
                bottomNavbar.classList.add("fixed-top");
            } else {
                bottomNavbar.classList.remove("fixed-top");
            }
        });

        // Cart functionality
        class CartManager {
            constructor() {
                this.cart = this.loadCart();
                this.updateCartCounter();
            }
            
            loadCart() {
                try {
                    return JSON.parse(localStorage.getItem('dryfruitCart')) || [];
                } catch (error) {
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
                this.showNotification(`${name} added to cart!`);
            }
            
            updateCartCounter() {
                const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
                const badges = document.querySelectorAll('.cart-badge');
                
                badges.forEach(badge => {
                    badge.textContent = totalItems;
                });
            }
            
            showNotification(message) {
                // Create a simple notification
                const notification = document.createElement('div');
                notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
                notification.style.zIndex = '1050';
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        }

        // Initialize cart manager
        const cartManager = new CartManager();
        
        // Add to cart functionality
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const button = e.target;
                const name = button.getAttribute('data-name');
                const price = button.getAttribute('data-price');
                const image = button.getAttribute('data-image');
                
                // Add to cart
                cartManager.addItem(name, price, image);
                
                // Visual feedback
                button.innerHTML = '<i class="fa fa-check me-1"></i>Added!';
                button.classList.add('btn-success');
                
                setTimeout(() => {
                    button.innerHTML = 'Order Now';
                    button.classList.remove('btn-success');
                }, 2000);
            }
        });
        
        // Favorite icon functionality
        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                this.classList.toggle('active');
                const heartIcon = this.querySelector('i');
                
                if (this.classList.contains('active')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    console.log(`Added ${this.dataset.product} to favorites`);
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    console.log(`Removed ${this.dataset.product} from favorites`);
                }
            });
        });

        
    