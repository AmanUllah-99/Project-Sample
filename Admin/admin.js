// admin-access.js - Authentication and Admin Access Management
class AdminAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserData();
        this.checkAdminAccess();
    }

    loadUserData() {
        try {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        } catch (error) {
            this.currentUser = null;
        }
    }

    saveUserData(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'Home.html';
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    checkAdminAccess() {
        // Add admin link to navbar if user is admin
        if (this.isAdmin()) {
            this.addAdminLink();
        }
    }

    addAdminLink() {
        // Check if admin link already exists
        if (document.querySelector('.admin-access-link')) return;

        const adminLink = document.createElement('li');
        adminLink.className = 'nav-item admin-access-link';
        adminLink.innerHTML = `
            <a class="nav-link" href="admin.html" style="color: #ffd700 !important;">
                <i class="fas fa-cog me-1"></i>Admin Panel
            </a>
        `;

        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            navbar.appendChild(adminLink);
        }
    }
}

// Initialize admin authentication
const adminAuth = new AdminAuth();

// test-admin.js - For testing admin access (remove in production)
function simulateAdminLogin() {
    const adminUser = {
        name: 'Admin User',
        email: 'admin@organicapricots.com',
        role: 'admin'
    };
    adminAuth.saveUserData(adminUser);
    adminAuth.checkAdminAccess();
    updateAccountDisplay();
    alert('Admin login simulated for testing');
}

// Add test button (remove in production)
document.addEventListener('DOMContentLoaded', function() {
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Admin Login';
    testButton.className = 'btn btn-warning btn-sm position-fixed';
    testButton.style.bottom = '20px';
    testButton.style.right = '20px';
    testButton.style.zIndex = '9999';
    testButton.onclick = simulateAdminLogin;
    document.body.appendChild(testButton);
});