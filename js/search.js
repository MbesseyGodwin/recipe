// search.js file

// import { getMealList } from './modules/mealList.mjs';
// import { getMealRecipe, mealRecipeModal, closeRecipeModal } from './modules/mealRecipe.mjs';
// import { addToCollectionHandler, addToCollection } from './modules/collectionHandler.mjs';

// // Event listeners
// searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', closeRecipeModal);
// mealDetailsContent.addEventListener('click', addToCollectionHandler);


// Code for implementing recipe search functionality
const searchBtn = document.querySelector('#search-btn');
const mealList = document.querySelector('#meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('#recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeRecipeModal);
mealDetailsContent.addEventListener('click', addToCollectionHandler);

// Get meal list that matches with the ingredients
function getMealList() {
    const searchInputTxt = document.querySelector('#search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let mealListHTML = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    mealListHTML += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
                });
                mealList.classList.remove('notFound');
            } else {
                mealListHTML = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = mealListHTML;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        const mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals))
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Create a modal
function mealRecipeModal(meal) {
    meal = meal[0];

    const html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="d-flex justify-content-around">
        <div class="recipe-link btn btn-danger">
        <a href="${meal.strYoutube}" target="_blank"><i class="fa fa-toggle-right"></i>Watch Video</a>
      </div>
      <div class="add-to-collection recipe-link btn btn-danger">
        <a class="add-to-collection-btn" data-category="${meal.strCategory}" data-meal="${meal.strMeal}" data-image="${meal.strMealThumb}">Add to Collection</a>
      </div>
    </div>
   
  `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Close recipe modal
function closeRecipeModal() {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}

// Add to Collection handler
function addToCollectionHandler(e) {
    if (e.target.classList.contains('add-to-collection-btn')) {
        const categoryName = e.target.dataset.category;
        const mealName = e.target.dataset.meal;
        const mealImage = e.target.dataset.image;
        addToCollection(categoryName, mealName, mealImage);
    }
}

// Add to Collection function
function addToCollection(categoryName, mealName, mealImage) {
    try {
        const collectionItems = JSON.parse(localStorage.getItem('collectionItems')) || [];

        const existingItem = collectionItems.find(item => item.mealName === mealName);
        if (!existingItem) {
            collectionItems.push({ categoryName, mealName, mealImage });
        }

        localStorage.setItem('collectionItems', JSON.stringify(collectionItems));

        alert('Meal added to collection!');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the meal to the collection.');
    }
}