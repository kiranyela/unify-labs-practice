
const CONFIG = {
  API_KEY: "apikey", // Replace with your actual key
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
};

/**
 * Service Layer: Handles Data Fetching
 */
class WeatherService {
  async getWeather(city) {
    // Construct URL safely
    const url = new URL(CONFIG.BASE_URL);
    url.searchParams.append("q", city);
    url.searchParams.append("appid", CONFIG.API_KEY);
    url.searchParams.append("units", "metric");

    const response = await fetch(url);

    if (!response.ok) {
      // Throw error object with status for specific handling
      throw { status: response.status, message: response.statusText };
    }

    return await response.json();
  }
}

/**
 * UI Layer: Handles DOM Manipulation
 */
class WeatherUI {
  constructor() {
    this.cityInput = document.getElementById("city-input");
    this.searchBtn = document.getElementById("search-btn");
    this.weatherCard = document.getElementById("weather-card");
    this.statusMsg = document.getElementById("status-message");

    // Output elements
    this.elements = {
      city: document.getElementById("city-name"),
      temp: document.getElementById("temperature"),
      desc: document.getElementById("description"),
      humidity: document.getElementById("humidity"),
      wind: document.getElementById("wind-speed"),
    };
  }

  getCity() {
    return this.cityInput.value.trim();
  }

  showLoading() {
    this.weatherCard.classList.add("hidden");
    this.statusMsg.innerHTML = '<div class="loader"></div>';
    this.searchBtn.disabled = true;
  }

  hideLoading() {
    this.statusMsg.innerHTML = "";
    this.searchBtn.disabled = false;
  }

  showError(message) {
    this.hideLoading();
    this.weatherCard.classList.add("hidden");
    this.statusMsg.innerHTML = `<p class="error">Error: ${message}</p>`;
  }

  renderWeather(data) {
    this.hideLoading();

    // Update DOM elements
    this.elements.city.textContent = data.name;
    this.elements.temp.textContent = Math.round(data.main.temp);
    this.elements.desc.textContent = data.weather[0].description;
    this.elements.humidity.textContent = data.main.humidity;
    this.elements.wind.textContent = data.wind.speed;

    this.weatherCard.classList.remove("hidden");
  }
}

/**
 * Application Controller
 */
class App {
  constructor() {
    this.service = new WeatherService();
    this.ui = new WeatherUI();
    this.initEventListeners();
  }

  initEventListeners() {
    this.ui.searchBtn.addEventListener("click", () => this.handleSearch());

    // Allow "Enter" key to trigger search
    this.ui.cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });
  }

  async handleSearch() {
    const city = this.ui.getCity();

    if (!city) {
      this.ui.showError("Please enter a city name.");
      return;
    }

    this.ui.showLoading();

    try {
      const data = await this.service.getWeather(city);
      this.ui.renderWeather(data);
    } catch (error) {
      // Differentiate between 404 (User error) and network issues
      if (error.status === 404) {
        this.ui.showError("City not found. Please check styling.");
      } else {
        this.ui.showError("Something went wrong. Please try again later.");
        console.error("API Error:", error);
      }
    }
  }
}

// Initialize App when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
