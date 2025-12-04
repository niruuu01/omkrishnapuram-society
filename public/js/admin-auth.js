// Admin Authentication System - Updated to use backend API

// Login form handler
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');

        if (togglePassword) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Handle form submission
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const errorMessage = document.getElementById('errorMessage');
            const loginText = document.getElementById('loginText');
            const loginLoader = document.getElementById('loginLoader');

            // Clear previous error
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Show loading state
            loginText.style.display = 'none';
            loginLoader.style.display = 'inline-block';


            try {
                // Call API login
                console.log('Attempting login for user:', username);
                const response = await api.login(username, password);
                console.log('Login response:', response);

                if (response && response.success) {
                    // Successful login
                    console.log('Login successful, setting session storage');
                    sessionStorage.setItem('adminLoggedIn', 'true');
                    sessionStorage.setItem('adminUsername', response.user.username);
                    sessionStorage.setItem('adminUserId', response.user.id);

                    if (rememberMe) {
                        localStorage.setItem('rememberAdmin', username);
                    }

                    console.log('Redirecting to dashboard...');
                    // Redirect to dashboard
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Response received but not successful
                    throw new Error(response?.error || 'Login failed');
                }
            } catch (error) {
                // Failed login
                console.error('Login error:', error);
                loginText.style.display = 'inline';
                loginLoader.style.display = 'none';

                errorMessage.textContent = `❌ ${error.message || 'Invalid username or password. Please try again.'}`;
                errorMessage.style.display = 'block';

                // Shake animation
                loginForm.classList.add('shake');
                setTimeout(() => loginForm.classList.remove('shake'), 500);

                // Clear password field
                document.getElementById('password').value = '';
            }
        });

        // Check if user should be remembered
        const rememberedUser = localStorage.getItem('rememberAdmin');
        if (rememberedUser) {
            document.getElementById('username').value = rememberedUser;
            document.getElementById('rememberMe').checked = true;
        }
    }

    // Forgot password handler
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Please contact the society secretary to reset your password.\\n\\nContact: +91 XXXX XXXXXX\\nEmail: info@omkrishnapuram.org');
        });
    }
});

// Check authentication status
async function checkAuth() {
    try {
        const response = await api.verifyAuth();
        return response.success;
    } catch (error) {
        return false;
    }
}

// Protect admin pages
async function protectAdminPage() {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('adminUserId');
        window.location.href = 'admin-login.html';
    }
}

// Logout function
async function logout() {
    try {
        await api.logout();
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('adminUserId');
        window.location.href = 'admin-login.html';
    }
}

// Auto-logout after inactivity (30 minutes)
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(async function () {
        if (sessionStorage.getItem('adminLoggedIn')) {
            alert('You have been logged out due to inactivity.');
            await logout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
if (sessionStorage.getItem('adminLoggedIn')) {
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    resetInactivityTimer();
}
