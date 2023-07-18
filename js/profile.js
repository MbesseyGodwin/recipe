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
    const nameElement = document.getElementById('profile-fullname');
    const emailElement = document.getElementById('profile-email');
    const usernameElement = document.getElementById('profile-username');
    const loginTimeElement = document.getElementById('login-time');
    const nameInput = document.getElementById('inputFullName');
    const usernameInput = document.getElementById('inputUsername');

    nameElement.textContent = currentUser.fullName;
    emailElement.textContent = currentUser.email;
    usernameElement.textContent = currentUser.username;
    loginTimeElement.textContent = currentUser.loginTime;

    nameInput.value = currentUser.fullName;
    usernameInput.value = currentUser.username;
  }
}

// Function to open the profile modal
function openProfileModal() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.id = 'exampleModal';
    modalElement.tabIndex = '-1';
    modalElement.setAttribute('aria-labelledby', 'exampleModalLabel');
    modalElement.setAttribute('aria-hidden', 'true');

    const fullName = currentUser.fullName;
    const username = currentUser.username;

    modalElement.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content" style="margin-top: 150px;">
          <form id="profileForm">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit profile</h5>
              <button type="button" class="btn btn-dark btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="mb-3 row">
                  <label for="inputFullName" class="col-3 col-form-label">Full Name</label>
                  <div class="col-9">
                    <input type="text" class="form-control shadow-none border border-dark" id="inputFullName"
                      placeholder="Full Name" value="${fullName}" required>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label for="inputUsername" class="col-3 col-form-label">User Name</label>
                  <div class="col-9">
                    <input type="text" class="form-control shadow-none border border-dark" id="inputUsername"
                      placeholder="Username" value="${username}" required>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-danger">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modalElement);

    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();

    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', handleProfileUpdate);
  }
}

// Function to handle form submission for updating the profile
function handleProfileUpdate(event) {
  event.preventDefault();

  const newName = document.getElementById('inputFullName').value;
  const newUsername = document.getElementById('inputUsername').value;

  const currentUser = getCurrentUser();
  const users = getUsers();

  if (currentUser) {
    const index = users.findIndex((user) => user.email === currentUser.email);

    if (index !== -1) {
      currentUser.fullName = newName;
      currentUser.username = newUsername;

      users[index] = currentUser;
      saveUsers(users);

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      displayUserProfile();

      alert('Profile updated successfully!');
      window.location.reload();

      // const modalElement = document.getElementById('exampleModal');
      // const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      // bootstrapModal.hide();
    }
  }
}

// Call the displayUserProfile function on page load
window.addEventListener('DOMContentLoaded', displayUserProfile);

// Add an event listener to the Edit Profile button to open the modal
const editProfileBtn = document.getElementById('editProfileBtn');
editProfileBtn.addEventListener('click', openProfileModal);
