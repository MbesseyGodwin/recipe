const apiKey = '1';
const apiUrl = 'https://www.themealdb.com/api/json/v1/' + apiKey;

function searchByName() {
    const mealName = document.getElementById('mealName').value;
    const url = `${apiUrl}/search.php?s=${mealName}`;
    fetchUrl(url);
}

function listByFirstLetter() {
    const firstLetter = document.getElementById('firstLetter').value;
    const url = `${apiUrl}/search.php?f=${firstLetter}`;
    fetchUrl(url);
}

function lookupById() {
    const mealId = document.getElementById('mealId').value;
    const url = `${apiUrl}/lookup.php?i=${mealId}`;
    fetchUrl(url);
}

function listAllMealCategory() {
    const url = `${apiUrl}/categories.php`;
    fetchCategories(url);
}

function fetchUrl(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchCategories(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayResults(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealName = meal.strMeal;
            const mealId = meal.idMeal;
            const mealImage = meal.strMealThumb;

            const mealDiv = document.createElement('div');
            mealDiv.innerHTML = `
        <h3>${mealName}</h3>
        <p>Meal ID: ${mealId}</p>
        <img src="${mealImage}" alt="${mealName}" width="200" height="150" />
      `;

            outputDiv.appendChild(mealDiv);
        });
    } else {
        outputDiv.textContent = 'No results found.';
    }
}

function displayCategories(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'All categories';
    outputDiv.appendChild(title);

    if (data.categories) {
        data.categories.forEach(category => {
            const categoryName = category.strCategory;
            const categoryImage = category.strCategoryThumb;

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'col bg-info m-3';
            categoryDiv.innerHTML = `
            <div class=''>
              <h3>${categoryName}</h3>
              <img src="${categoryImage}" alt="${categoryName}" />
            </div>
            `;

            outputDiv.appendChild(categoryDiv);
        });
    } else {
        outputDiv.textContent = 'No results found.';
    }
}

