// Timeout duration in milliseconds (e.g., 5 minutes)
const timeoutDuration = 5 * 60 * 1000; // 5 minutes

let timeoutId;

// Function to check if the user is logged in
function checkLogin() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    } else {
        // Start the inactivity timer
        startInactivityTimer();
    }
}

// Function to handle the logout action
function logout() {
    // Remove the isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect the user to the login page
    window.location.href = 'login.html';

    // Clear the inactivity timer
    clearTimeout(timeoutId);
}

// Function to start the inactivity timer
function startInactivityTimer() {
    // Clear any existing timers
    clearTimeout(timeoutId);

    // Set a new timer for the specified duration
    timeoutId = setTimeout(logout, timeoutDuration);
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
    // Start the timer again
    startInactivityTimer();
}

// Check if the user is logged in on page load
checkLogin();

// Add event listeners to reset the inactivity timer on user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
// Add more events as needed (e.g., click, touch, etc.)
