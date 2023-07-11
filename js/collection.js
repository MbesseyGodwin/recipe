// Code for managing user's meal collections

// Cache frequently accessed DOM elements
const cartItemsDiv = document.getElementById('cartItems');

// Retrieve cart items from local storage
function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems;
}

// Display cart items
function displayCartItems() {
    cartItemsDiv.innerHTML = '';

    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        cartItemsDiv.textContent = 'Cart is empty.';
        return;
    }

    const feedback = JSON.parse(localStorage.getItem('feedback')) || {};

    cartItems.forEach(item => {
        const { categoryName, quantity } = item;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
        <h3>${categoryName}</h3>
        <p>Quantity: ${quantity}</p>
        <textarea class="comment-input" placeholder="Add comment"></textarea>
        <select class="rating-input">
          <option value="">Select rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
        <button class="submit-btn" onclick="submitFeedback('${categoryName}')">Submit</button>
      `;

        // Pre-fill feedback if available
        const commentInput = cartItemDiv.querySelector('.comment-input');
        const ratingInput = cartItemDiv.querySelector('.rating-input');
        preFillFeedback(categoryName, commentInput, ratingInput);

        // Display existing feedback
        const itemFeedback = feedback[categoryName];
        if (itemFeedback) {
            const { comment, rating, dateSubmitted } = itemFeedback;
            const feedbackDiv = document.createElement('div');
            feedbackDiv.innerHTML = `
          <p>Comment: ${comment}</p>
          <p>Rating: ${rating} stars</p>
          <p>date: ${dateSubmitted}</p>
        `;
            cartItemDiv.appendChild(feedbackDiv);
        }

        cartItemsDiv.appendChild(cartItemDiv);
    });
}


// Submit feedback for a cart item
// Submit feedback for a cart item
function submitFeedback(categoryName) {
    const cartItems = document.getElementsByClassName('cart-item');

    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const itemName = cartItem.querySelector('h3').textContent;

        if (itemName === categoryName) {
            const commentInput = cartItem.querySelector('.comment-input');
            const ratingInput = cartItem.querySelector('.rating-input');

            const comment = commentInput.value.trim();
            const rating = ratingInput.value;
            const date = new Date();
            const dateSubmitted = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

            console.log(`Date and Time: ${formattedDateTime}`);


            // Perform validation if needed
            if (comment === '' || rating === '') {
                alert('Please provide a comment and rating.');
                return;
            }

            // Get existing feedback from localStorage
            let feedback = JSON.parse(localStorage.getItem('feedback')) || {};

            // Update feedback object with new comment and rating
            feedback[categoryName] = { comment, rating, dateSubmitted };

            // Save updated feedback in localStorage
            localStorage.setItem('feedback', JSON.stringify(feedback));

            // Clear the input fields
            commentInput.value = '';
            ratingInput.value = '';

            // Provide visual feedback to the user
            alert('Feedback submitted!');
            return;
        }
    }

    alert('Cart item not found.');
}

function preFillFeedback(categoryName, commentInput, ratingInput) {
    const feedback = JSON.parse(localStorage.getItem('feedback')) || {};
    const itemFeedback = feedback[categoryName];

    if (itemFeedback) {
        commentInput.value = itemFeedback.comment;
        ratingInput.value = itemFeedback.rating;
    }
}



// Call the displayCartItems function when the page loads
window.addEventListener('load', function () {
    displayCartItems();
    preFillFeedback();
});
