// logout.mjs
// Function to handle the logout action
export function logout() {
    // Remove the isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect the user to the login page
    window.location.href = '../../protected/login/login.html';

    // Clear the inactivity timer
    clearTimeout(timeoutId);
}
