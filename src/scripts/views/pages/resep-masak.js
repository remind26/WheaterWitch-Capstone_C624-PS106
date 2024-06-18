/* eslint-disable no-param-reassign */
const Recipes = {
  async render() {
    return `
      <div class="hero" id="hero">
        <img src="./images/heros/hero-image_2.jpg" alt="Hero Image">
        <div class="hero-text" tabindex="0">
          <h1>Welcome to WeatherWitch</h1>
          <p>Reliable activity detection with weather</p>
        </div>
      </div>
      <div id="recipes" class="recipes">
        <h2>Recipes List</h2>
        <div class="search-container">
          <input type="text" id="searchInput" placeholder="Search..." tabindex="0">
          <button id="searchButton" tabindex="0">Cari</button>
        </div>
        <div id="recipe-list"></div>
      </div>
      <div id="recipe-modal" class="modal">
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <div id="modal-recipe-details"></div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const recipeListContainer = document.getElementById('recipe-list');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('recipe-modal');
    const closeButton = document.querySelector('.close-button');

    searchButton.addEventListener('click', async () => {
      const query = searchInput.value;
      await this.searchRecipes(query, recipeListContainer);
    });

    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    await this.searchRecipes('', recipeListContainer);
  },

  async searchRecipes(query, container) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      const recipes = data.meals;

      container.innerHTML = '';

      if (recipes && recipes.length > 0) {
        recipes.forEach((recipe) => {
          const recipeItem = document.createElement('div');
          recipeItem.classList.add('recipe-item');
          recipeItem.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strInstructions.substring(0, 100)}...</p>
          `;

          recipeItem.addEventListener('click', () => {
            this.showRecipeDetails(recipe);
          });

          container.appendChild(recipeItem);
        });
      } else {
        container.innerHTML = '<p>No recipes found</p>';
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      container.innerHTML = '<p>Failed to fetch recipes. Please try again later.</p>';
    }
  },

  showRecipeDetails(recipe) {
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('modal-recipe-details');

    modalContent.innerHTML = `
      <h2>${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <p>${recipe.strInstructions}</p>
    `;

    modal.style.display = 'block';
  },
};

export default Recipes;
