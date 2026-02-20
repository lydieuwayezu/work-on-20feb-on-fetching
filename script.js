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