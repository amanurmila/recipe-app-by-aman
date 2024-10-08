const loadCategories = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button onclick="searchByCategory('${category.strCategory}')" class="btn mx-5">${category.strCategory}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

// Load Filter By Category...
const searchByCategory = async (catId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`
  );
  const data = await res.json();
  displayByCategory(data.meals);
};

// Display Data By Category...
const displayByCategory = (data) => {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";

  data.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("card");
    recipeDiv.innerHTML = `
        <img class="rounded-md p-2 shadow-md" src="${meal.strMealThumb}"/>
        <h2 class="text-lg font-bold text-center p-2">Name : ${meal.strMeal}</h2>
    `;
    recipeContainer.appendChild(recipeDiv);
  });
};

// Call the functions...
loadCategories();
