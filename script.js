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