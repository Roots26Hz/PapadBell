// Enhanced authentication for the login.html page

// We'll need a way to store and retrieve user data
// In a real application, this would be a database call
// For demonstration, we'll use localStorage

function getRegisteredUsers() {
    // Try to get users from localStorage, or return empty array if none exists
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return users;
}

function isRegisteredUser(username) {
    const users = getRegisteredUsers();
    return users.some(user => user.username === username);
}

function validateUserCredentials(username, password) {
    const users = getRegisteredUsers();
    return users.some(user => user.username === username && user.password === password);
}

function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    if (!isRegisteredUser(username)) {
        // User doesn't exist
        if (confirm('No account found with this username. Would you like to sign up?')) {
            window.location.href = 'signup.html';
        }
        return;
    }
    sessionStorage.setItem('currentUser', username);
    if (validateUserCredentials(username, password)) {
        // Successful login
        alert('Login successful!');
        
        // Store current user in session
        sessionStorage.setItem('currentUser', username);
        
        window.location.href = 'index.html';
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Check if there's a return URL in the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');
        
        // Redirect to the returnTo page or to the index page
        if (returnTo) {
            window.location.href = returnTo;
        } else {
            window.location.href = 'index.html';
        }
    } else {
        // Failed login (user exists but password is wrong)
        alert('Invalid password. Please try again.');
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
});