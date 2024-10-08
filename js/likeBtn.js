const likeBtnClicked = async (recipeId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );
  const data = await res.json();
  displayLikedPic(data.meals[0]);
};

const displayLikedPic = (liked) => {
  const likedContainer = document.getElementById("liked-container");
  const likedSection = document.getElementById("liked-section");

  const likedDiv = document.createElement("div");
  likedDiv.innerHTML = `
        <img class="rounded-md p-2 shadow-md" src="${liked.strMealThumb}" />
  `;
  likedContainer.appendChild(likedDiv);
  likedSection.classList.remove("hidden");
};
