document.addEventListener('DOMContentLoaded', () => {
    // --- Core Elements ---
    const authContainer = document.getElementById('authContainer');
    const authPanel = document.getElementById('authPanel');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signUpSwitchBtn = document.getElementById('signUpSwitch');
    const loginSwitchBtn = document.getElementById('loginSwitch');
    
    // --- Authentication Flow State ---
    let isLoginMode = true;

    // --- Feature 1: Animated Login/Sign-up Switch ---
    const switchForm = () => {
        isLoginMode = !isLoginMode;

        if (!isLoginMode) {
            // Switch to Sign-up
            authContainer.classList.add('move-form');
            authPanel.classList.add('right-shift');
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        } else {
            // Switch back to Login
            authContainer.classList.remove('move-form');
            authPanel.classList.remove('right-shift');
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        }
    };

    signUpSwitchBtn.addEventListener('click', switchForm);
    loginSwitchBtn.addEventListener('click', switchForm);

    // --- Feature 2: Password Visibility Toggle ---
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            toggle.textContent = type === 'password' ? 'visibility_off' : 'visibility';
        });
    });

    // --- Feature 3: Real-time Password Strength Meter (Sign-up) ---
    const signupPasswordInput = document.getElementById('signupPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');

    const checkPasswordStrength = (password) => {
        let score = 0;
        
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthBar.className = 'strength-bar';
            strengthLabel.className = 'strength-label';
            strengthLabel.textContent = 'Enter a strong password';
            return;
        }

        if (password.length >= 8) score += 20;
        if (/[a-z]/.test(password)) score += 20; // Lowercase
        if (/[A-Z]/.test(password)) score += 20; // Uppercase
        if (/\d/.test(password)) score += 20; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) score += 20; // Special characters

        let percentage = Math.min(100, score);
        let strengthClass = '';
        let labelText = '';

        if (score < 40) {
            strengthClass = 'weak';
            labelText = 'Weak: Add more variety.';
        } else if (score < 80) {
            strengthClass = 'medium';
            labelText = 'Medium: Getting safer...';
        } else {
            strengthClass = 'strong';
            labelText = 'Strong! Excellent security.';
        }

        strengthBar.style.width = `${percentage}%`;
        strengthBar.className = `strength-bar ${strengthClass}`;
        strengthLabel.className = `strength-label ${strengthClass}`;
        strengthLabel.textContent = labelText;
    };

    signupPasswordInput.addEventListener('input', (e) => {
        checkPasswordStrength(e.target.value);
    });

    // --- Feature 4: Form Submission with Animated Loading State ---
    const handleFormSubmission = (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('.auth-submit-btn');
        
        // Disable button and show loading spinner
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // --- SIMULATED ASYNCHRONOUS BACKEND CALL ---
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Simple success/error logic
            if (form.id === 'loginForm') {
                alert('Login successful! Welcome back to Organic Apricots.');
                // Redirect user: window.location.href = '../Home.html';
            } else if (form.id === 'signupForm') {
                alert('Account created! Please verify your email.');
                switchForm(); // Switch back to login after sign-up
            }
            
            submitBtn.querySelector('.btn-text').textContent = (form.id === 'loginForm' ? 'Sign In' : 'Create Account');

        }, 2000); // 2 second delay for simulation
    };

    loginForm.addEventListener('submit', handleFormSubmission);
    signupForm.addEventListener('submit', handleFormSubmission);
    
    // --- Feature 5: Magic Link Placeholder ---
    document.getElementById('magicLinkBtn').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        if (email) {
            alert(`Magic link sent to ${email}! Check your inbox. (Simulated)`);
        } else {
            alert('Please enter your email address first.');
        }
    });
});