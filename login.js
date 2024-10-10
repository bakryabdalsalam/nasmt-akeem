document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    const storedUsername = 'Bakry';
    const storedPassword = 'A&b01201361436';

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'admin.html';
        } else {
            loginError.textContent = 'Invalid username or password.';
            loginError.style.display = 'block';
        }
    });
});
