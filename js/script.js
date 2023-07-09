const searchBtn = document.querySelector('#search-btn');
const mealList = document.querySelector('#meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('#recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeRecipeModal);

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
    <div class="recipe-link btn btn-danger">
      <a href="${meal.strYoutube}" target="_blank"><i class="fa fa-toggle-right"></i>Watch Video</a>
    </div>
  `;

  console.log(meal.strInstructions);
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Close recipe modal
function closeRecipeModal() {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
}
