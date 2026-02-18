export function showLoading() {
  document.getElementById("data-list").innerHTML =
    '<div class="spinner"></div>';
}

export function showError(msg) {
  document.getElementById("notification").textContent = msg;
  document.getElementById("notification").style.display = "block";
}

export function clearError() {
  document.getElementById("notification").style.display = "none";
}

export function renderList(items, favorites, onFavClick) {
  const list = document.getElementById("data-list");
  list.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <img src="${item.image}" alt="${item.name}" class="coin-img" />
        <h3>${item.name}</h3>
      </div>
      <div class="card-body">
        <p>Symbol: ${item.symbol.toUpperCase()}</p>
        <p>Price: $${item.current_price.toLocaleString()}</p>
        <p>Market Cap: $${item.market_cap.toLocaleString()}</p>
        <button class="fav-btn" data-id="${item.id}">${
      favorites.includes(item.id) ? "★" : "☆"
    } Favorite</button>
      </div>
    `;
    card.querySelector(".fav-btn").onclick = () => onFavClick(item.id);
    list.appendChild(card);
  });
}
