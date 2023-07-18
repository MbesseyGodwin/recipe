// profileUtils.mjs

// Function to update the current user's profile
export function updateProfile(newName, newUsername) {
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
        }
    }
}

// Function to open the profile modal and handle form submission
export function openProfileModalAndHandleUpdate() {
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
