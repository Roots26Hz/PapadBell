// Enhanced JavaScript for handling signup functionality

function getRegisteredUsers() {
    // Try to get users from localStorage, or return empty array if none exists
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return users;
}

function saveUser(username, email, password) {
    const users = getRegisteredUsers();
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose another one.');
        return false;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered. Please use another email or login.');
        return false;
    }
    
    // Add new user
    users.push({
        username,
        email,
        password,
        dateRegistered: new Date().toISOString()
    });
    
    // Save updated users array
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return true;
}

function validateSignup(username, email, password, confirmPassword) {
    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function handleSignupSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (validateSignup(username, email, password, confirmPassword)) {
        if (saveUser(username, email, password)) {
            // Set login state after successful signup
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        alert('Account created successfully! You are now logged in.');
        
        // Check if there's a return URL in the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');
        
        // Redirect to the returnTo page or to the index page
        if (returnTo) {
            window.location.href = returnTo;
        } else {
            window.location.href = 'index.html';
        }
        }
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
});