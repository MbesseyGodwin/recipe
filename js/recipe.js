const apiKey = '1';
const apiUrl = `https://www.themealdb.com/api/json/v1/${apiKey}`;

// Cache frequently accessed DOM elements
const mealNameInput = document.getElementById('mealName');
const firstLetterInput = document.getElementById('firstLetter');
// const mealIdInput = document.getElementById('mealId');
const outputDiv = document.getElementById('output');

function searchByName() {
    const mealName = mealNameInput.value;
    const url = `${apiUrl}/search.php?s=${mealName}`;
    fetchUrl(url);
}

function listByFirstLetter() {
    const firstLetter = firstLetterInput.value;
    const url = `${apiUrl}/search.php?f=${firstLetter}`;
    fetchUrl(url);
}

// function lookupById() {
//     const mealId = mealIdInput.value;
//     const url = `${apiUrl}/lookup.php?i=${mealId}`;
//     fetchUrl(url);
// }

function listAllMealCategory() {
    const url = `${apiUrl}/categories.php`;
    fetchCategories(url);
}

async function fetchUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error('Network response was not OK.');
        }
    } catch (error) {
        console.error('Error:', error);
        outputDiv.textContent = 'An error occurred while fetching data.';
    }
}

async function fetchCategories(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCategories(data);
        } else {
            throw new Error('Network response was not OK.');
        }
    } catch (error) {
        console.error('Error:', error);
        outputDiv.textContent = 'An error occurred while fetching categories.';
    }
}

function displayResults(data) {
    outputDiv.innerHTML = '';

    if (data.meals) {
        data.meals.forEach(meal => {
            const { strMeal, idMeal, strMealThumb } = meal;

            const mealDiv = document.createElement('div');
            mealDiv.innerHTML = `
        <h3>${strMeal}</h3>
        <p>Meal ID: ${idMeal}</p>
        <img src="${strMealThumb}" alt="${strMeal}" width="200" height="150" />
      `;

            outputDiv.appendChild(mealDiv);
        });
    } else {
        outputDiv.textContent = 'No results found.';
    }
}

function displayCategories(data) {
    outputDiv.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'All categories';
    outputDiv.appendChild(title);

    if (data.categories) {
        data.categories.forEach(category => {
            const { strCategory, strCategoryThumb } = category;

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'col bg-info m-3';
            categoryDiv.innerHTML = `
        <div class=''>
          <h3>${strCategory}</h3>
          <img src="${strCategoryThumb}" alt="${strCategory}" />
          <button onclick="addToCollection('${strCategory}')">Add to Collection</button>
        </div>
      `;

            outputDiv.appendChild(categoryDiv);
        });
    } else {
        outputDiv.textContent = 'No results found.';
    }
}

function addToCollection(categoryName) {
    try {
        const collectionItems = JSON.parse(localStorage.getItem('collectionItems')) || [];

        const existingItem = collectionItems.find(item => item.categoryName === categoryName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            collectionItems.push({ categoryName, quantity: 1 });
        }

        localStorage.setItem('collectionItems', JSON.stringify(collectionItems));

        alert('Meal added to collection!');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the meal to the collection.');
    }
}
