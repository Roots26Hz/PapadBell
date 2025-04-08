

function getRegisteredUsers() {
   
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
       
        if (confirm('No account found with this username. Would you like to sign up?')) {
            window.location.href = 'signup.html';
        }
        return;
    }
    sessionStorage.setItem('currentUser', username);
    if (validateUserCredentials(username, password)) {
       
        alert('Login successful!');
        
      
        sessionStorage.setItem('currentUser', username);
        
        window.location.href = 'index.html';
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        
       
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');
        
        
        if (returnTo) {
            window.location.href = returnTo;
        } else {
            window.location.href = 'index.html';
        }
    } else {
       
        alert('Invalid password. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
});
