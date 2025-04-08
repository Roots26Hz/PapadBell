

function getRegisteredUsers() {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return users;
}

function saveUser(username, email, password) {
    const users = getRegisteredUsers();
    
    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose another one.');
        return false;
    }
    
    if (users.some(user => user.email === email)) {
        alert('Email already registered. Please use another email or login.');
        return false;
    }
    
    
    users.push({
        username,
        email,
        password,
        dateRegistered: new Date().toISOString()
    });
    
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return true;
}

function validateSignup(username, email, password, confirmPassword) {
   
    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }
    
    
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
           
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        alert('Account created successfully! You are now logged in.');
        
        
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');
        
        
        if (returnTo) {
            window.location.href = returnTo;
        } else {
            window.location.href = 'index.html';
        }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
});
