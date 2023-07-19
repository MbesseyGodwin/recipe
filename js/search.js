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

// List recipes by first letter
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
