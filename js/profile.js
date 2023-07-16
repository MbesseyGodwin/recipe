// Function to retrieve current user data from localStorage
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        return JSON.parse(currentUser);
    }

    return null;
}

// Function to retrieve users data from localStorage
function getUsers() {
    const users = localStorage.getItem('users');

    if (users) {
        return JSON.parse(users);
    }

    return [];
}

// Function to save users data to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to display user profile
function displayUserProfile() {
    const currentUser = getCurrentUser();

    if (currentUser) {
        // Get the HTML elements to display user information
        const nameElement = document.getElementById('profile-fullname');
        const emailElement = document.getElementById('profile-email');
        const usernameElement = document.getElementById('profile-username');
        const loginTimeElement = document.getElementById('login-time');

        // Get the form input elements
        const nameInput = document.getElementById('inputFullName');
        const usernameInput = document.getElementById('inputUsername');

        // Display user information in the HTML elements
        nameElement.textContent = currentUser.fullName;
        emailElement.textContent = currentUser.email;
        usernameElement.textContent = currentUser.username;
        loginTimeElement.textContent = currentUser.loginTime;

        // Set the input values
        nameInput.value = currentUser.fullName;
        usernameInput.value = currentUser.username;
    }
}

// Function to handle form submission for updating the profile
function handleProfileUpdate(event) {
    event.preventDefault();

    // Get the updated values from the form fields
    const newName = document.getElementById('inputFullName').value;
    const newUsername = document.getElementById('inputUsername').value;

    // Get the current user from localStorage
    const currentUser = getCurrentUser();
    const users = getUsers();

    if (currentUser) {
        // Find the index of the current user in the users array
        const index = users.findIndex((user) => user.email === currentUser.email);

        if (index !== -1) {
            // Update the profile information in the currentUser object
            currentUser.fullName = newName;
            currentUser.username = newUsername;

            // Update the corresponding user's data in the users array
            users[index] = currentUser;

            // Save the updated users array to localStorage
            saveUsers(users);

            // Update the currentUser in localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Display the updated profile information
            displayUserProfile();

            // Show a success message to the user
            alert('Profile updated successfully!');

            // Close the modal
            const modalElement = document.getElementById('exampleModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
            bootstrapModal.hide();
        }
    }
}

// Call the displayUserProfile function on page load
window.addEventListener('DOMContentLoaded', displayUserProfile);

// Add an event listener to the profile update form
const profileForm = document.getElementById('exampleModal').querySelector('form');
profileForm.addEventListener('submit', handleProfileUpdate);
