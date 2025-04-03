// Enhanced user session management

// Function to check if user is logged in and update UI accordingly
function checkLoginStatus() {
    const currentUser = sessionStorage.getItem('currentUser');
    
    // Get all login buttons (both main nav and sidebar)
    const mainLoginButton = document.getElementById('loginButton');
    const sideLoginButton = document.getElementById('sideLoginButton');
    
    if (currentUser) {
        // User is logged in, update the buttons
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

// Function to handle logout with confirmation
function confirmLogout(event) {
    event.preventDefault();
    
    if (confirm('Are you sure you want to log out?')) {
        // Clear user session
        sessionStorage.removeItem('currentUser');
        localStorage.setItem('userLoggedIn', 'false');

        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Function to check if user is logged in before allowing access to certain pages
function checkAuthRequired() {
    // Add this function if you want to restrict access to certain pages
    const currentUser = sessionStorage.getItem('currentUser');
    const requiresAuth = document.body.classList.contains('requires-auth');
    
    if (requiresAuth && !currentUser) {
        // Redirect to login page if authentication is required
        alert('Please log in to access this page');
        window.location.href = 'login.html';
    }
}

// Run this when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    checkAuthRequired(); // Optional: uncomment if you want to implement restricted pages
});