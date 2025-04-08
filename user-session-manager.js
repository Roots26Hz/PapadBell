
function checkLoginStatus() {
    const currentUser = sessionStorage.getItem('currentUser');
    
    const mainLoginButton = document.getElementById('loginButton');
    const sideLoginButton = document.getElementById('sideLoginButton');
    
    if (currentUser) {
        
        if (mainLoginButton) {
            mainLoginButton.textContent = `Welcome, ${currentUser}`;
            mainLoginButton.href = "#";
            mainLoginButton.onclick = confirmLogout;
        }
        
        if (sideLoginButton) {
            sideLoginButton.textContent = `Welcome, ${currentUser}`;
            sideLoginButton.href = "#";
            sideLoginButton.onclick = confirmLogout;
        }
    }
}


function confirmLogout(event) {
    event.preventDefault();
    
    if (confirm('Are you sure you want to log out?')) {
        
        sessionStorage.removeItem('currentUser');
        localStorage.setItem('userLoggedIn', 'false');

        
        
        window.location.href = 'login.html';
    }
}


function checkAuthRequired() {
    
    const currentUser = sessionStorage.getItem('currentUser');
    const requiresAuth = document.body.classList.contains('requires-auth');
    
    if (requiresAuth && !currentUser) {
        
        alert('Please log in to access this page');
        window.location.href = 'login.html';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    checkAuthRequired(); 
});
