import { fetchCoins } from "./API.js";
import { showLoading, showError, clearError, renderList } from "./UI.js";

const state = {
  data: [],
  filtered: [],
  favorites: JSON.parse(localStorage.getItem("nexusFavorites") || "[]"),
  theme: localStorage.getItem("nexusTheme") || "light",
  sort: "name",
  search: "",
};

function saveFavorites() {
  localStorage.setItem("nexusFavorites", JSON.stringify(state.favorites));
}

function saveTheme() {
  localStorage.setItem("nexusTheme", state.theme);
}

function applyTheme() {
  document.body.className = state.theme;
}

function filterAndSort() {
  let items = state.data;
  if (state.search) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(state.search.toLowerCase())
    );
  }
  if (state.sort === "name") {
    items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === "price") {
    items = items.slice().sort((a, b) => b.current_price - a.current_price);
  } else if (state.sort === "market_cap") {
    items = items.slice().sort((a, b) => b.market_cap - a.market_cap);
  }
  state.filtered = items;
}

function onFavClick(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((f) => f !== id);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  render();
}

function render() {
  filterAndSort();
  renderList(state.filtered, state.favorites, onFavClick);
}

document.addEventListener("DOMContentLoaded", async () => {
  applyTheme();
  showLoading();
  try {
    const data = await fetchCoins();
    state.data = data;
    render();
  } catch (err) {
    showError("Failed to fetch data. Please try again later.");
  }

  document.getElementById("search").addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });

  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  document.getElementById("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    saveTheme();
  });
});
