// API configuration
const API_KEY = '1';
const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

// Cache frequently accessed DOM elements
const mealNameInput = document.getElementById('mealName');
const firstLetterInput = document.getElementById('firstLetter');
const outputDiv = document.getElementById('output');

// Search recipes by meal name
function searchByName() {
    const mealName = mealNameInput.value;
    const url = `${API_URL}/search.php?s=${mealName}`;
    fetchData(url);
}

// List recipes by first letter// search.js file

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

        alert('Meal Recipe Added to Collection!');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the meal to the collection.');
    }
}
function listByFirstLetter() {
    const firstLetter = firstLetterInput.value;
    const url = `${API_URL}/search.php?f=${firstLetter}`;
    fetchData(url);
}

// List all meal categories
function listAllMealCategories() {
    const url = `${API_URL}/categories.php`;
    fetchData(url);
}

// Fetch data from the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayData(data);
        } else {
            throw new Error('Network response was not OK.');
        }
    } catch (error) {
        console.error('Error:', error);
        outputDiv.textContent = 'An error occurred while fetching data.';
    }
}

// Display data on the page
function displayData(data) {
    outputDiv.innerHTML = '';

    if (data.meals) {
        // Display individual meals
        data.meals.forEach((meal) => {
            const { strMeal, idMeal, strMealThumb } = meal;
            const mealDiv = createMealDiv(strMeal, idMeal, strMealThumb);
            outputDiv.appendChild(mealDiv);
        });
    } else if (data.categories) {
        // Display meal categories
        data.categories.forEach((category) => {
            const { strCategory, strCategoryThumb } = category;
            const categoryDiv = createCategoryDiv(strCategory, strCategoryThumb);
            outputDiv.appendChild(categoryDiv);
        });
    } else {
        outputDiv.textContent = 'No results found.';
    }
}

// Create div element for an individual meal
function createMealDiv(strMeal, idMeal, strMealThumb) {
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col bg-dark m-3 rounded';
    mealDiv.innerHTML = `
    <div class='text-center'>
      <h3 class="text-light fw-bold">${strMeal}</h3>
      <p class="text-light">Meal ID: ${idMeal}</p>
      <img class="rounded m-2 d-block border-0" src="${strMealThumb}" alt="${strMeal}" width="250" height="200"/>
    </div>
  `;

    return mealDiv;
}

// Create div element for a meal category
function createCategoryDiv(strCategory, strCategoryThumb) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'col bg-dark m-3 rounded';
    categoryDiv.innerHTML = `
    <div class='text-center'>
      <h3 class="text-light fw-bold">${strCategory}</h3>
      <img src="${strCategoryThumb}" alt="${strCategory}" />
    </div>
  `;

    return categoryDiv;
}
