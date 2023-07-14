const cartItemsDiv = document.getElementById('cartItems');
const feedbackStorageKey = 'feedback';

function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems;
}

function displayCartItems() {
    cartItemsDiv.innerHTML = '';

    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        cartItemsDiv.textContent = 'Cart is empty.';
        return;
    }

    const feedback = JSON.parse(localStorage.getItem(feedbackStorageKey)) || {};

    cartItems.forEach(item => {
        const { categoryName, quantity } = item;

        const cartItemDiv = createCartItemElement(categoryName, quantity);
        const { commentInput, ratingInput } = preFillFeedback(categoryName, cartItemDiv);

        const itemFeedback = feedback[categoryName];
        if (itemFeedback) {
            const { comment, rating, dateSubmitted } = itemFeedback;
            const feedbackDiv = createFeedbackElement(comment, rating, dateSubmitted);
            cartItemDiv.appendChild(feedbackDiv);
        }

        cartItemsDiv.appendChild(cartItemDiv);
    });
}

function createCartItemElement(categoryName, quantity) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'col-4 cart-item';
    cartItemDiv.innerHTML = `
      <div class="p-3" data-aos="fade-up" data-aos-delay="200">
          <div class="icon-box shadow d-flex flex-column justify-content-center align-items-center">
              <h3>${categoryName}</h3>
              <p>Quantity: ${quantity}</p>
              
              <button class="btn btn-dark view-comments" data-category="${categoryName}" type="button" data-toggle="modal" data-target="#commentsModal-${categoryName}">View Comments</button>
              <textarea class="comment-input form-control" placeholder="Add comment"></textarea>
              <select class="rating-input form-control">
                  <option value="">Select rating</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
              </select>
              <button class="submit-btn btn-primary" onclick="submitFeedback('${categoryName}')">Submit</button>
          </div>
      </div>
    `;
    return cartItemDiv;
}

function createCommentsModal(categoryName) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = `commentsModal-${categoryName}`;
    modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${categoryName} Comments</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="commentsList-${categoryName}"></div>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(modal);
}

function createFeedbackElement(comment, rating, dateSubmitted) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.innerHTML = `
    <p>Comment: ${comment}</p>
    <p>Rating: ${rating} stars</p>
    <p>Date: ${dateSubmitted}</p>
  `;
    return feedbackDiv;
}

function submitFeedback(categoryName) {
    const cartItems = Array.from(document.querySelectorAll('.cart-item'));
    const cartItem = cartItems.find(item => item.querySelector('h3').textContent === categoryName);

    if (!cartItem) {
        alert('Cart item not found.');
        return;
    }

    const commentInput = cartItem.querySelector('.comment-input');
    const ratingInput = cartItem.querySelector('.rating-input');

    const comment = commentInput.value.trim();
    const rating = ratingInput.value;

    if (comment === '' || rating === '') {
        alert('Please provide a comment and rating.');
        return;
    }

    const date = new Date();
    const dateSubmitted = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const feedback = JSON.parse(localStorage.getItem(feedbackStorageKey)) || {};
    feedback[categoryName] = { comment, rating, dateSubmitted };

    localStorage.setItem(feedbackStorageKey, JSON.stringify(feedback));

    commentInput.value = '';
    ratingInput.value = '';

    alert('Feedback submitted!');
    updateFeedbackElement(categoryName, comment, rating, dateSubmitted);
}

function preFillFeedback(categoryName, cartItemDiv) {
    const feedback = JSON.parse(localStorage.getItem(feedbackStorageKey)) || {};
    const itemFeedback = feedback[categoryName];
    const commentInput = cartItemDiv.querySelector('.comment-input');
    const ratingInput = cartItemDiv.querySelector('.rating-input');

    if (itemFeedback) {
        commentInput.value = itemFeedback.comment;
        ratingInput.value = itemFeedback.rating;
    }

    return { commentInput, ratingInput };
}

function updateFeedbackElement(categoryName, comment, rating, dateSubmitted) {
    const cartItems = Array.from(document.querySelectorAll('.cart-item'));
    const cartItem = cartItems.find(item => item.querySelector('h3').textContent === categoryName);

    if (cartItem) {
        const feedbackDiv = createFeedbackElement(comment, rating, dateSubmitted);
        cartItem.appendChild(feedbackDiv);
    }
}

window.addEventListener('load', function () {
    displayCartItems();
});
