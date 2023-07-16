// mealList.mjs
export function getMealList() {
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
  