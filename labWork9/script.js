"use strict";

const WEATHER_API_URL = "./weather-data.json";

const weatherForm = document.querySelector("#weather-form");
const citySelect = document.querySelector("#city-select");
const refreshButton = document.querySelector("#refresh-button");
const requestStatus = document.querySelector("#request-status");
const weatherContent = document.querySelector("#weather-content");
const errorCard = document.querySelector("#error-card");
const errorMessage = document.querySelector("#error-message");

function setText(id, value) {
  document.querySelector(`#${id}`).textContent = String(value);
}

function isValidWeatherData(data) {
  return data &&
    Array.isArray(data.locations) &&
    data.locations.every((location) =>
      location &&
      typeof location.id === "string" &&
      typeof location.city === "string" &&
      typeof location.country === "string" &&
      typeof location.updatedAt === "string" &&
      location.current &&
      typeof location.current.temperature === "number" &&
      typeof location.current.feelsLike === "number" &&
      typeof location.current.condition === "string" &&
      typeof location.current.icon === "string" &&
      typeof location.current.humidity === "number" &&
      typeof location.current.windKph === "number" &&
      typeof location.current.rainChance === "number" &&
      typeof location.current.high === "number" &&
      typeof location.current.low === "number" &&
      Array.isArray(location.forecast) &&
      location.forecast.length === 5 &&
      location.forecast.every((day) =>
        day &&
        typeof day.day === "string" &&
        typeof day.icon === "string" &&
        typeof day.condition === "string" &&
        typeof day.high === "number" &&
        typeof day.low === "number"
      )
    );
}

function renderForecast(days) {
  const forecastList = document.querySelector("#forecast-list");
  forecastList.replaceChildren();

  days.forEach((day) => {
    const item = document.createElement("article");
    item.className = "forecast-day";

    const dayName = document.createElement("p");
    dayName.className = "forecast-day-name";
    dayName.textContent = day.day;

    const icon = document.createElement("span");
    icon.className = "forecast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = day.icon;

    const condition = document.createElement("p");
    condition.className = "forecast-condition";
    condition.textContent = day.condition;

    const temperatures = document.createElement("p");
    temperatures.className = "forecast-temperatures";

    const high = document.createElement("span");
    high.textContent = `${day.high}°`;

    const low = document.createElement("span");
    low.className = "forecast-low";
    low.textContent = `${day.low}°`;

    temperatures.append(high, low);
    item.append(dayName, icon, condition, temperatures);
    forecastList.append(item);
  });
}

function renderWeather(location) {
  setText("city-name", `${location.city}, ${location.country}`);
  setText("updated-at", `Updated ${location.updatedAt}`);
  setText("current-icon", location.current.icon);
  setText("temperature", location.current.temperature);
  setText("condition", location.current.condition);
  setText("feels-like", location.current.feelsLike);
  setText("high-temp", location.current.high);
  setText("low-temp", location.current.low);
  setText("humidity", location.current.humidity);
  setText("wind", location.current.windKph);
  setText("rain-chance", location.current.rainChance);
  renderForecast(location.forecast);
}

async function fetchWeather() {
  const cityId = citySelect.value;
  refreshButton.disabled = true;
  weatherContent.hidden = true;
  errorCard.hidden = true;
  requestStatus.textContent = "Fetching weather data…";

  try {
    const response = await fetch(WEATHER_API_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`The demo weather service returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    if (!isValidWeatherData(data)) {
      throw new Error("The weather service returned JSON in an unexpected format.");
    }

    const location = data.locations.find((item) => item.id === cityId);
    if (!location) {
      throw new Error("The selected city was not found in the weather response.");
    }

    renderWeather(location);
    weatherContent.hidden = false;
    requestStatus.textContent = `Forecast loaded from the hypothetical API for ${location.city}.`;
  } catch (error) {
    console.error("Weather request failed:", error);
    errorMessage.textContent = error instanceof TypeError
      ? "The JSON request was blocked or the weather data file could not be reached. Open this folder through a local web server (such as VS Code Live Server), then try again."
      : error.message;
    errorCard.hidden = false;
    requestStatus.textContent = "Weather data could not be loaded.";
  } finally {
    refreshButton.disabled = false;
  }
}

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchWeather();
});

citySelect.addEventListener("change", fetchWeather);

fetchWeather();
