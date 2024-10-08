const loadDetails = async (recipeId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );
  const data = await res.json();
  displayDetails(data.meals[0]);
};

const displayDetails = (recipes) => {
  console.log(recipes);
  const modalContainer = document.getElementById("modal-content");
  const modalCard = document.createElement("div");
  modalCard.innerHTML = `
    <div class="card bg-gray-400 p-5">
  <figure>
    <img class="w-[50%] rounded-md shadow-md p-3 border m-2"
      src="${recipes.strMealThumb}" />
  </figure>
  <div>
    <div class="text-blue-800 font-bold p-2 border border-gray-700 rounded-md bg-gray-500">
        <span class="font-bold text-lg">Ingredients: </span><br>
                     ${recipes.strIngredient1}, ${recipes.strIngredient2}, ${recipes.strIngredient3}
    </div>
    <h1 class="text-center text-2xl font-bold pt-5">Instructions : </h1>
    <div class="m-2 p-3 rounded-md shadow-md bg-gray-600 text-white">${recipes.strInstructions}</div>
  </div>
</div>
  `;
  modalContainer.appendChild(modalCard);

  document.getElementById("my_modal_1").showModal();
};
