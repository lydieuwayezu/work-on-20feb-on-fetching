const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const card = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");
const darkToggle = document.querySelector("#darkToggle");

darkToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

button.addEventListener("click", fetchPokemon);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fetchPokemon();
});



async function fetchPokemon() {
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  card.innerHTML = "";
  loading.classList.remove("hidden");
  button.disabled = true;

  try {
    const response = await fetch(`g/${query}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon not found!");
      } else {
        throw new Error("Something went wrong.");
      }
    }

    
    const data = await response.json();
    displayPokemon(data);

  } catch (error) {
    card.innerHTML = `
      <p class="text-red-500 font-semibold">${error.message}</p>
    `;
  } finally {
    loading.classList.add("hidden");
    button.disabled = false;
  }
}




function displayPokemon(data) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const id = `#${data.id.toString().padStart(3, "0")}`;
  const height = data.height / 10;
  const weight = data.weight / 10;
  const baseExp = data.base_experience;

  const types = data.types.map(type =>
    `<span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm mr-1 dark:bg-indigo-700 dark:text-white">
      ${type.type.name}
    </span>`
  ).join("");

  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add(
    "animate-fadeIn",
    "transition-all",
    "duration-500"
  );


  
  pokemonDiv.innerHTML = `
    <h2 class="text-xl font-bold text-gray-800 dark:text-white">${name}</h2>
    <p class="text-gray-500 dark:text-gray-400">${id}</p>

    <div class="flex justify-center gap-2 my-3">
      <img src="${data.sprites.front_default}" alt="front">
      <img src="${data.sprites.back_default}" alt="back">
      <img src="${data.sprites.front_shiny}" alt="shiny">
    </div>

    <p class="dark:text-gray-300">Height: ${height} m</p>
    <p class="dark:text-gray-300">Weight: ${weight} kg</p>
    <p class="dark:text-gray-300">Base Exp: ${baseExp}</p>

    <div class="mt-2">${types}</div>
  `;

  card.appendChild(pokemonDiv);
}
