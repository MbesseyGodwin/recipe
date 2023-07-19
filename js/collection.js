// collection.js file
import { showAlert } from "./modules/showAlert.mjs";

// Cache frequently accessed DOM elements
const cartItemsDiv = document.getElementById('cartItems');
const feedbackStorageKey = 'feedback';
const collectionItemsStorageKey = 'collectionItems';

// Retrieve collection items from local storage
function getCollectionItems() {
    const collectionItems = JSON.parse(localStorage.getItem(collectionItemsStorageKey)) || [];
    return collectionItems;
}

// Display collection items on the page
function displayCollectionItems() {
    cartItemsDiv.innerHTML = '';

    const collectionItems = getCollectionItems();
    if (collectionItems.length === 0) {
        cartItemsDiv.textContent = 'Collection is empty.';
        return;
    }

    const feedback = JSON.parse(localStorage.getItem(feedbackStorageKey)) || {};

    collectionItems.forEach((item) => {
        const { categoryName, mealName, mealImage } = item;

        const cartItemDiv = createCartItemElement(categoryName, mealName, mealImage);
        const feedbackItems = feedback[mealName] || [];
        feedbackItems.forEach((feedbackItem) => {
            const { comment, rating, dateSubmitted } = feedbackItem;
            const feedbackDiv = createFeedbackElement(comment, rating, dateSubmitted);
            cartItemDiv.appendChild(feedbackDiv);
        });

        const commentInput = cartItemDiv.querySelector('.comment-input');
        const ratingInput = cartItemDiv.querySelector('.rating-input');
        const submitButton = cartItemDiv.querySelector('.submit-button');
        const commentButton = cartItemDiv.querySelector('.comment-button');

        submitButton.addEventListener('click', () => {
            submitFeedback(mealName, commentInput, ratingInput);
        });

        commentButton.addEventListener('click', () => {
            openModal(feedbackItems);
        });

        cartItemsDiv.appendChild(cartItemDiv);
    });
}

// Create cart item element
function createCartItemElement(categoryName, mealName, mealImage) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'col-4 cart-item';
    cartItemDiv.innerHTML = `
    <div class="p-3" data-aos="fade-up" data-aos-delay="100">
        <div class="collection-card rounded p-2 text-center shadow-lg d-flex flex-column justify-content-center align-items-center">
            <h4 class="text-dark fw-bold m-0 p-0">${categoryName}</h4>
            <p class="text-dark small mb-2 p-0">${mealName}</p>
            <div class="meal-img">
                <img class="w-50 mb-2 rounded" src="${mealImage}" alt="food">
            </div>
            <textarea class="comment-input form-control mb-2 shadow-none" placeholder="Add comment"></textarea>
            <select class="rating-input form-control shadow-none">
                <option value="">Select rating</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>
            <div class="d-flex justify-content-between">
                <button title="save comment" class="btn m-2 btn-danger submit-button"><i class="fa fa-check"></i></button>
                <button title="view comment" class="btn m-2 btn-dark comment-button"><i class="fa fa-eye"></i></button>
            </div>
        </div>
    </div>
  `;
    return cartItemDiv;
}

// Submit feedback for a meal
function submitFeedback(mealName, commentInput, ratingInput) {
    const comment = commentInput.value.trim();
    const rating = ratingInput.value;

    if (comment === '' || rating === '') {
        showAlert('Please provide a comment and rating.');
        return;
    }

    const date = new Date();
    const dateSubmitted = date.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    const feedbackItem = { comment, rating, dateSubmitted };
    const feedback = JSON.parse(localStorage.getItem(feedbackStorageKey)) || {};
    feedback[mealName] = feedback[mealName] || [];
    feedback[mealName].push(feedbackItem);

    localStorage.setItem(feedbackStorageKey, JSON.stringify(feedback));

    commentInput.value = '';
    ratingInput.value = '';

    showAlert('Feedback submitted!');
    const cartItem = commentInput.closest('.cart-item');
    const feedbackDiv = createFeedbackElement(comment, rating, dateSubmitted);
    cartItem.appendChild(feedbackDiv);
}

// Create feedback element
function createFeedbackElement(comment, rating, dateSubmitted) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-item';

    //     feedbackDiv.innerHTML = `
    //     <div class="card m-3 p-2">
    //         <p>Comment: ${comment}</p>
    //         <p>Rating: ${rating} stars</p>
    //         <p>Date: ${dateSubmitted}</p>
    //     </div>
    //   `;

    return feedbackDiv;
}

// Open modal to display comments
function openModal(feedbackItems) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Comments</h2>
        <div class="comments-container">
            ${feedbackItems.map((feedbackItem) => createCommentElement(feedbackItem)).join('')}
        </div>
    </div>
  `;

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        closeModal(modal);
    });

    document.body.appendChild(modal);
}

// Create comment element
function createCommentElement(feedbackItem) {
    const { comment, rating, dateSubmitted } = feedbackItem;
    return `
    <div class="comment-item">
        <div class="card p-2">
            <p>Comment: ${comment}</p>
            <p>Rating: ${rating} stars</p>
            <p>Date: ${dateSubmitted}</p>
        </div>
    </div>
  `;
}


// Close modal
function closeModal(modal) {
    modal.remove();
}

// Event listener when the page loads
window.addEventListener('load', function () {
    displayCollectionItems();
});
