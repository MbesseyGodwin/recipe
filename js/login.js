// login.js file
// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get the values from the form fields
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // Call the loginUser function with the email and password
    loginUser(email, password);
}

// Function to check if the email and password match a user in the localStorage
function loginUser(email, password) {
    // Get the user data from localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email and password match a user
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            // Set the isLoggedIn flag in localStorage
            localStorage.setItem('isLoggedIn', true);

            // Create an object to store user information
            var currentUser = {
                email: users[i].email,
                password: users[i].password,
                fullName: users[i].fullName,
                username: users[i].username,
                loginTime: new Date().toString(),
            };

            // Store the current user information in localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Redirect the user to the profile page
            window.location.href = '../../protected/profile/profile.html';
            return;
        }
    }

    // If no matching user is found, display an error message
    alert('Invalid email or password');
}

// Add an event listener to the form submit event
var loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
}