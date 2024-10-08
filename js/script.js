const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipe-container");
const searchMsg = document.getElementById("search-msg");

// Fetch and Display From API...
const loadRecipes = async (query) => {
  recipeContainer.innerHTML = `<h2 class="text-center text-2xl py-4">Searching Recipes...</h2>`;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();

  recipeContainer.innerHTML = "";
  searchMsg.style.display = "none";

  if (data.meals !== null && data.meals.length < 1) {
    console.log("no data found");
    searchMsg.textContent = "No recipes found for your search.";
    searchMsg.style.display = "block"; // Display "no data found" message
  } else if (data.meals) { // Check if data.meals exists before iterating
    data.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.innerHTML = `
          <div class="card shadow-md py-3">
    <figure>
      <img
        src="${meal.strMealThumb}"
        alt="Shoes" />
    </figure>
    <div class="px-3">
      <h2 class="card-title">${meal.strMeal}</h2>
      <p><i class="fa-solid fa-burger"></i> <span class="font-bold">Type : </span>${meal.strCategory}</p>
      <p><i class="fa-solid fa-globe"></i> <span class="font-bold">Country : </span>${meal.strArea}</p>
      <div class="divider"></div>
      <div class="card-actions justify-center">
      <button id="like-${meal.idMeal}" onclick="likeBtnClicked('${meal.idMeal}')" class="btn btn-sm"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="btn btn-sm bg-[#A0D683] btn-outline btn-error"><a class="text-black hover:text-white" href="${meal.strYoutube}" target="_blank">YouTube Link</a></button>
        <button onclick="loadDetails('${meal.idMeal}')" class="btn btn-sm btn-primary hover:bg-blue-600">Details</button>
      </div>
    </div>
  </div>
        `;

      recipeContainer.appendChild(recipeDiv);
    });
  } else {
    console.error("API error or unexpected response format");
    searchMsg.textContent = "Sorry, an error occurred. Please try again.";
    searchMsg.style.display = "block";
  }
};

searchBtn.addEventListener("click", () => {
  const searchInput = searchBox.value.trim();
  loadRecipes(searchInput);
});