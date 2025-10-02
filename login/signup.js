// DOM Elements
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authContainer = document.getElementById('auth-container');
const profilePage = document.getElementById('profile-page');
const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');
const logoutLink = document.getElementById('logout-link');
const userName = document.getElementById('userName');
const displayUserName = document.getElementById('displayUserName');
const userEmail = document.getElementById('userEmail');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const gender = document.getElementById('gender');

// Tab Switching
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        showMessage(loginMessage, 'Please fill in all fields', 'error');
        return;
    }
    
    // Check if user exists (in a real app, this would be a server request)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage(loginMessage, 'Login successful!', 'success');
        
        // Redirect to profile after a short delay
        setTimeout(() => {
            showProfile(user);
        }, 1000);
    } else {
        showMessage(loginMessage, 'Invalid email or password', 'error');
    }
});

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage(signupMessage, 'Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage(signupMessage, 'Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(signupMessage, 'Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        showMessage(signupMessage, 'User with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In a real app, passwords should be hashed
        phone: "+92 300 1234567",
        dob: "1990-01-15",
        gender: "male",
        memberSince: new Date().getFullYear(),
        totalOrders: 5,
        totalSpent: "PKR 12,500"
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Store current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showMessage(signupMessage, 'Account created successfully!', 'success');
    
    // Redirect to profile after a short delay
    setTimeout(() => {
        showProfile(newUser);
    }, 1000);
});

// Logout Functionality
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    authContainer.style.display = 'block';
    profilePage.style.display = 'none';
    loginForm.reset();
    signupForm.reset();
    
    // Reset to login tab
    loginTab.click();
});

// Show Profile Function
function showProfile(user) {
    // Update profile information
    userName.textContent = user.name;
    displayUserName.textContent = user.name;
    userEmail.textContent = user.email;
    
    // Split name into first and last
    const nameParts = user.name.split(' ');
    firstName.value = nameParts[0] || '';
    lastName.value = nameParts.slice(1).join(' ') || '';
    email.value = user.email;
    phone.value = user.phone || '';
    dob.value = user.dob || '';
    gender.value = user.gender || 'male';
    
    // Update stats
    document.getElementById('memberSince').textContent = user.memberSince || new Date().getFullYear();
    document.getElementById('totalOrders').textContent = user.totalOrders || 0;
    document.getElementById('totalSpent').textContent = user.totalSpent || "PKR 0";
    
    // Show profile page and hide auth
    authContainer.style.display = 'none';
    profilePage.style.display = 'block';
}

// Show Message Function
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'message';
    element.classList.add(type);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        element.className = 'message';
    }, 3000);
}

// Profile Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.id === 'logout-link') return;
        
        e.preventDefault();
        
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Back to Store button
document.getElementById('back-to-store').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecting to store homepage...');
    // In a real app, this would redirect to the actual store page
});

// Toggle Edit Mode for Personal Info
function toggleEdit(section) {
    const form = document.getElementById('personalInfoForm');
    const inputs = form.querySelectorAll('input, select');
    const formActions = form.querySelector('.form-actions');
    
    if (inputs[0].readOnly) {
        // Enable editing
        inputs.forEach(input => {
            input.readOnly = false;
            if (input.tagName === 'SELECT') {
                input.disabled = false;
            }
        });
        formActions.style.display = 'flex';
    } else {
        // Disable editing
        inputs.forEach(input => {
            input.readOnly = true;
            if (input.tagName === 'SELECT') {
                input.disabled = true;
            }
        });
        formActions.style.display = 'none';
    }
}

// Cancel Edit
function cancelEdit(section) {
    // Reload user data to cancel changes
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const nameParts = currentUser.name.split(' ');
        firstName.value = nameParts[0] || '';
        lastName.value = nameParts.slice(1).join(' ') || '';
        email.value = currentUser.email;
        phone.value = currentUser.phone || '';
        dob.value = currentUser.dob || '';
        gender.value = currentUser.gender || 'male';
    }
    
    // Disable editing
    toggleEdit(section);
}

// Save Personal Info
document.getElementById('personalInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.name = `${firstName.value} ${lastName.value}`;
        currentUser.email = email.value;
        currentUser.phone = phone.value;
        currentUser.dob = dob.value;
        currentUser.gender = gender.value;
        
        // Update in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update displayed info
        userName.textContent = currentUser.name;
        displayUserName.textContent = currentUser.name;
        userEmail.textContent = currentUser.email;
        
        // Disable editing
        toggleEdit('personal-info');
        
        alert('Profile updated successfully!');
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showProfile(currentUser);
    }
});

// Avatar Modal Functions (placeholder implementations)
function openAvatarModal() {
    alert('Avatar modal would open here. This is a placeholder function.');
}

function openAddressModal() {
    alert('Address modal would open here. This is a placeholder function.');
}