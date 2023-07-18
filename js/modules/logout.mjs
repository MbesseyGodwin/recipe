// logout.mjs
export function logout() {
    // Remove the isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // Redirect the user to the login page
    window.location.href = '../../protected/login/login.html';

    // Clear the inactivity timer
    clearTimeout(timeoutId);
}
