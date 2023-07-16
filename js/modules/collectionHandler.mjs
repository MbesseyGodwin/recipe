// collectionHandler.mjs
export function addToCollectionHandler(e) {
    if (e.target.classList.contains('add-to-collection-btn')) {
        const categoryName = e.target.dataset.category;
        const mealName = e.target.dataset.meal;
        const mealImage = e.target.dataset.image;
        addToCollection(categoryName, mealName, mealImage);
    }
}

export function addToCollection(categoryName, mealName, mealImage) {
    // Code to add the meal to the collection
}
