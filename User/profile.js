// User Profile Management System
class UserProfile {
    constructor() {
        this.userData = this.loadUserData();
        this.init();
    }

    init() {
        this.loadUserProfile();
        this.setupNavigation();
        this.loadOrders();
        this.loadAddresses();
        this.loadWishlist();
        this.setupEventListeners();
    }

    loadUserData() {
        // Try to load from localStorage, otherwise use default data
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            return JSON.parse(savedData);
        }

        // Default user data
        return {
            personalInfo: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@email.com",
                phone: "+92 300 1234567",
                dob: "1990-01-15",
                gender: "male",
                avatar: "../Backdround/user-avatar.jpg"
            },
            addresses: [
                {
                    id: 1,
                    type: "Home",
                    fullName: "John Doe",
                    phone: "+92 300 1234567",
                    line1: "House #123, Street #45",
                    line2: "Sector G-10/4",
                    city: "Islamabad",
                    state: "Federal Capital",
                    zipCode: "44000",
                    isDefault: true
                },
                {
                    id: 2,
                    type: "Work",
                    fullName: "John Doe",
                    phone: "+92 300 1234567",
                    line1: "Office #45, Blue Area",
                    line2: "Floor 3, Tech Hub",
                    city: "Islamabad",
                    state: "Federal Capital",
                    zipCode: "44001",
                    isDefault: false
                }
            ],
            orders: [
                {
                    id: "ORD-001",
                    date: "2024-01-15",
                    status: "delivered",
                    items: ["Almonds (1kg)", "Cashews (500g)"],
                    total: 2700,
                    trackingNumber: "TRK789456123"
                },
                {
                    id: "ORD-002",
                    date: "2024-01-10",
                    status: "pending",
                    items: ["Pistachios (1kg)", "Walnuts (500g)"],
                    total: 2300,
                    trackingNumber: "TRK789456124"
                }
            ],
            wishlist: [
                {
                    id: 1,
                    name: "Premium Almonds",
                    price: 1200,
                    image: "../Backdround/badam.png",
                    inStock: true
                },
                {
                    id: 2,
                    name: "Crunchy Cashews",
                    price: 1500,
                    image: "../Backdround/kaju.png",
                    inStock: true
                }
            ],
            stats: {
                totalOrders: 5,
                totalSpent: 12500,
                memberSince: 2024
            }
        };
    }

    saveUserData() {
        localStorage.setItem('userProfile', JSON.stringify(this.userData));
        this.showNotification('Profile updated successfully!', 'success');
    }

    loadUserProfile() {
        const { personalInfo, stats } = this.userData;
        
        // Update personal info
        document.getElementById('userName').textContent = personalInfo.firstName;
        document.getElementById('displayUserName').textContent = `${personalInfo.firstName} ${personalInfo.lastName}`;
        document.getElementById('userEmail').textContent = personalInfo.email;
        document.getElementById('userAvatar').src = personalInfo.avatar;
        
        // Update form fields
        document.getElementById('firstName').value = personalInfo.firstName;
        document.getElementById('lastName').value = personalInfo.lastName;
        document.getElementById('email').value = personalInfo.email;
        document.getElementById('phone').value = personalInfo.phone;
        document.getElementById('dob').value = personalInfo.dob;
        document.getElementById('gender').value = personalInfo.gender;
        
        // Update stats
        document.getElementById('totalOrders').textContent = stats.totalOrders;
        document.getElementById('totalSpent').textContent = `PKR ${stats.totalSpent.toLocaleString()}`;
        document.getElementById('memberSince').textContent = stats.memberSince;
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Show corresponding section
                const sectionId = item.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
            });
        });
    }

    loadOrders() {
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) return;

        ordersList.innerHTML = this.userData.orders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id}</div>
                        <div class="order-date">Placed on ${this.formatDate(order.date)}</div>
                    </div>
                    <div class="order-status status-${order.status}">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                </div>
                <div class="order-details">
                    <div class="order-items">
                        <strong>Items:</strong> ${order.items.join(', ')}
                    </div>
                    <div class="order-total">
                        <strong>Total:</strong> PKR ${order.total.toLocaleString()}
                    </div>
                    <div class="order-tracking">
                        <strong>Tracking:</strong> ${order.trackingNumber}
                    </div>
                </div>
                <div class="order-actions">
                    <button class="btn btn-sm btn-outline-primary">View Details</button>
                    <button class="btn btn-sm btn-outline-secondary">Track Order</button>
                    ${order.status === 'delivered' ? 
                        '<button class="btn btn-sm btn-outline-success">Reorder</button>' : ''}
                </div>
            </div>
        `).join('');
    }

    loadAddresses() {
        const addressesGrid = document.querySelector('.addresses-grid');
        if (!addressesGrid) return;

        addressesGrid.innerHTML = this.userData.addresses.map(address => `
            <div class="address-card ${address.isDefault ? 'default' : ''}">
                <div class="address-header">
                    <div class="address-type">${address.type} Address</div>
                    ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
                </div>
                <div class="address-body">
                    <p><strong>${address.fullName}</strong></p>
                    <p>${address.line1}</p>
                    ${address.line2 ? `<p>${address.line2}</p>` : ''}
                    <p>${address.city}, ${address.state} ${address.zipCode}</p>
                    <p>Phone: ${address.phone}</p>
                </div>
                <div class="address-actions">
                    <button class="address-action" onclick="editAddress(${address.id})" title="Edit">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="address-action" onclick="deleteAddress(${address.id})" title="Delete">
                        <i class="fa fa-trash"></i>
                    </button>
                    ${!address.isDefault ? 
                        `<button class="address-action" onclick="setDefaultAddress(${address.id})" title="Set as Default">
                            <i class="fa fa-star"></i>
                        </button>` : ''}
                </div>
            </div>
        `).join('');
    }

    loadWishlist() {
        const wishlistItems = document.querySelector('.wishlist-items');
        if (!wishlistItems) return;

        wishlistItems.innerHTML = this.userData.wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <h5>${item.name}</h5>
                <div class="wishlist-price">PKR ${item.price.toLocaleString()}</div>
                <div class="wishlist-actions">
                    <button class="btn btn-sm btn-primary" onclick="addToCartFromWishlist(${item.id})">
                        <i class="fa fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Personal info form submission
        document.getElementById('personalInfoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePersonalInfo();
        });

        // Order filter
        const orderFilter = document.getElementById('orderFilter');
        if (orderFilter) {
            orderFilter.addEventListener('change', (e) => {
                this.filterOrders(e.target.value);
            });
        }

        // Avatar upload
        const avatarUpload = document.getElementById('avatarUpload');
        if (avatarUpload) {
            avatarUpload.addEventListener('change', (e) => {
                this.previewAvatar(e.target.files[0]);
            });
        }
    }

    savePersonalInfo() {
        this.userData.personalInfo = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            avatar: this.userData.personalInfo.avatar
        };

        this.saveUserData();
        this.loadUserProfile();
        this.toggleEdit('personal-info', false);
    }

    filterOrders(status) {
        // Implement order filtering logic
        console.log('Filtering orders by:', status);
    }

    previewAvatar(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('avatarPreview').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    showNotification(message, type = 'info') {
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
}

// Global functions for HTML onclick events
function toggleEdit(sectionId) {
    const section = document.getElementById(sectionId);
    const form = section.querySelector('form');
    const inputs = form.querySelectorAll('input, select');
    const editBtn = section.querySelector('.btn-edit');
    const formActions = section.querySelector('.form-actions');

    if (form.classList.contains('form-editing')) {
        // Cancel editing
        form.classList.remove('form-editing');
        inputs.forEach(input => {
            if (input.type !== 'submit') {
                input.readOnly = true;
                input.disabled = true;
            }
        });
        editBtn.innerHTML = '<i class="fa fa-edit"></i> Edit';
        formActions.style.display = 'none';
    } else {
        // Start editing
        form.classList.add('form-editing');
        inputs.forEach(input => {
            if (input.type !== 'submit') {
                input.readOnly = false;
                input.disabled = false;
            }
        });
        editBtn.innerHTML = '<i class="fa fa-times"></i> Cancel';
        formActions.style.display = 'flex';
    }
}

function cancelEdit(sectionId) {
    const section = document.getElementById(sectionId);
    const form = section.querySelector('form');
    const userProfile = window.userProfile;
    
    // Reload original data
    userProfile.loadUserProfile();
    toggleEdit(sectionId);
}

function openAvatarModal() {
    const modal = new bootstrap.Modal(document.getElementById('avatarModal'));
    modal.show();
}

function useDefaultAvatar() {
    document.getElementById('avatarPreview').src = '../Backdround/user-avatar.jpg';
}

function saveAvatar() {
    const newAvatar = document.getElementById('avatarPreview').src;
    window.userProfile.userData.personalInfo.avatar = newAvatar;
    window.userProfile.saveUserData();
    window.userProfile.loadUserProfile();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('avatarModal'));
    modal.hide();
}

function openAddressModal() {
    const modal = new bootstrap.Modal(document.getElementById('addressModal'));
    modal.show();
}

function saveAddress() {
    // Implement address saving logic
    window.userProfile.showNotification('Address saved successfully!', 'success');
    const modal = bootstrap.Modal.getInstance(document.getElementById('addressModal'));
    modal.hide();
}

function editAddress(addressId) {
    // Implement address editing logic
    console.log('Editing address:', addressId);
}

function deleteAddress(addressId) {
    if (confirm('Are you sure you want to delete this address?')) {
        window.userProfile.userData.addresses = window.userProfile.userData.addresses.filter(
            addr => addr.id !== addressId
        );
        window.userProfile.saveUserData();
        window.userProfile.loadAddresses();
    }
}

function setDefaultAddress(addressId) {
    window.userProfile.userData.addresses.forEach(addr => {
        addr.isDefault = addr.id === addressId;
    });
    window.userProfile.saveUserData();
    window.userProfile.loadAddresses();
}

function addToCartFromWishlist(itemId) {
    // Implement add to cart from wishlist
    window.userProfile.showNotification('Item added to cart!', 'success');
}

function removeFromWishlist(itemId) {
    if (confirm('Remove this item from your wishlist?')) {
        window.userProfile.userData.wishlist = window.userProfile.userData.wishlist.filter(
            item => item.id !== itemId
        );
        window.userProfile.saveUserData();
        window.userProfile.loadWishlist();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.userProfile = new UserProfile();
});