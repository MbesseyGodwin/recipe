// signup.js file
// Get the form element
const form = document.querySelector('form');

// Add an event listener to the form submit event
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the user details from the form inputs
    const email = document.getElementById('inputEmail').value;
    const username = document.getElementById('inputUsername').value;
    const fullName = document.getElementById('inputFullName').value;
    const password = document.getElementById('inputPassword').value;

    // Create a new user object
    const newUser = {
        email,
        username,
        fullName,
        password
    };

    // Get the existing users from the local storage (if any)
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const existingMail = users.find(user => user.email === email || user.username === username);
    const existingUsername = users.find(user => user.email === email || user.username === username);

    if (existingMail) {
        // Display an error message if the username or email is already taken
        alert('Email is already taken. Please choose a different one.');
        return;
    }
    if (existingUsername) {
        // Display an error message if the username or email is already taken
        alert('Username is already taken. Please choose a different one.');
        return;
    }

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array back to the local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Clear the form inputs
    form.reset();

    // Show a success message or redirect the user to another page
    alert('User created successfully!');
    window.location.href = '../../protected/login/login.html';
});