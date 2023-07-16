// mealRecipe.mjs
export function getMealRecipe(e) {
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
  
  export function mealRecipeModal(meal) {
    // Code for the modal
  }
  
  export function closeRecipeModal() {
    // Code to close the modal
  }
  