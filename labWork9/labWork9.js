"use strict";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const refreshButton = document.querySelector("#refresh-button");
const requestStatus = document.querySelector("#request-status");
const weatherContent = document.querySelector("#weather-content");
const errorCard = document.querySelector("#error-card");
const errorMessage = document.querySelector("#error-message");
let latestRequestId = 0;

function setText(id, value) {
  document.querySelector(`#${id}`).textContent = String(value);
}

function weatherDescription(code, isDay = true) {
  const conditions = {
    0: [isDay ? "Clear sky" : "Clear night", isDay ? "☀️" : "🌙"],
    1: ["Mainly clear", isDay ? "🌤️" : "🌙"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Moderate drizzle", "🌦️"],
    55: ["Dense drizzle", "🌧️"],
    56: ["Light freezing drizzle", "🌧️"],
    57: ["Dense freezing drizzle", "🌧️"],
    61: ["Slight rain", "🌧️"],
    63: ["Moderate rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Light freezing rain", "🌧️"],
    67: ["Heavy freezing rain", "🌧️"],
    71: ["Slight snowfall", "🌨️"],
    73: ["Moderate snowfall", "🌨️"],
    75: ["Heavy snowfall", "❄️"],
    77: ["Snow grains", "🌨️"],
    80: ["Slight rain showers", "🌦️"],
    81: ["Moderate rain showers", "🌧️"],
    82: ["Violent rain showers", "🌧️"],
    85: ["Slight snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with hail", "⛈️"],
    99: ["Thunderstorm with heavy hail", "⛈️"]
  };

  return conditions[code] || ["Unknown conditions", "🌡️"];
}

function formatForecastDay(dateString, index) {
  if (index === 0) return "Today";

  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date);
}

function formatTemperature(value) {
  return Math.round(value);
}

function renderForecast(daily) {
  const forecastList = document.querySelector("#forecast-list");
  forecastList.replaceChildren();

  daily.time.forEach((date, index) => {
    const [condition, icon] = weatherDescription(daily.weather_code[index]);
    const item = document.createElement("article");
    item.className = "forecast-day";

    const dayName = document.createElement("p");
    dayName.className = "forecast-day-name";
    dayName.textContent = formatForecastDay(date, index);

    const weatherIcon = document.createElement("span");
    weatherIcon.className = "forecast-icon";
    weatherIcon.setAttribute("aria-hidden", "true");
    weatherIcon.textContent = icon;

    const conditionText = document.createElement("p");
    conditionText.className = "forecast-condition";
    conditionText.textContent = condition;

    const temperatures = document.createElement("p");
    temperatures.className = "forecast-temperatures";

    const high = document.createElement("span");
    high.textContent = `${formatTemperature(daily.temperature_2m_max[index])}°`;

    const low = document.createElement("span");
    low.className = "forecast-low";
    low.textContent = `${formatTemperature(daily.temperature_2m_min[index])}°`;

    temperatures.append(high, low);
    item.append(dayName, weatherIcon, conditionText, temperatures);
    forecastList.append(item);
  });
}

function validateForecast(data) {
  const current = data && data.current;
  const daily = data && data.daily;
  const requiredCurrent = [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "weather_code",
    "wind_speed_10m"
  ];

  if (
    !current ||
    requiredCurrent.some((key) => typeof current[key] !== "number") ||
    !daily ||
    !Array.isArray(daily.time) ||
    !Array.isArray(daily.weather_code) ||
    !Array.isArray(daily.temperature_2m_max) ||
    !Array.isArray(daily.temperature_2m_min) ||
    daily.time.length < 5 ||
    daily.weather_code.length < 5 ||
    daily.temperature_2m_max.length < 5 ||
    daily.temperature_2m_min.length < 5
  ) {
    throw new Error("Open-Meteo returned forecast data in an unexpected format.");
  }
}

function renderWeather(location, forecast) {
  validateForecast(forecast);

  const current = forecast.current;
  const currentCondition = weatherDescription(current.weather_code, current.is_day === 1);
  const daily = forecast.daily;
  const rainChance = typeof current.precipitation_probability === "number"
    ? current.precipitation_probability
    : Array.isArray(daily.precipitation_probability_max)
      ? daily.precipitation_probability_max[0] ?? 0
      : 0;
  const updatedTime = current.time.replace("T", " ");

  setText("city-name", `${location.name}, ${location.country}`);
  setText("updated-at", `Updated ${updatedTime} · ${forecast.timezone}`);
  setText("current-icon", currentCondition[1]);
  setText("temperature", formatTemperature(current.temperature_2m));
  setText("condition", currentCondition[0]);
  setText("feels-like", formatTemperature(current.apparent_temperature));
  setText("high-temp", formatTemperature(daily.temperature_2m_max[0]));
  setText("low-temp", formatTemperature(daily.temperature_2m_min[0]));
  setText("humidity", current.relative_humidity_2m);
  setText("wind", Math.round(current.wind_speed_10m));
  setText("rain-chance", rainChance);
  renderForecast(daily);
}

async function fetchJson(url, params, serviceName) {
  const requestUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => requestUrl.searchParams.set(key, String(value)));

  const response = await fetch(requestUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`${serviceName} returned HTTP ${response.status}.`);
  }

  return response.json();
}

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    cityInput.setCustomValidity("Enter a city to see its weather.");
    cityInput.reportValidity();
    cityInput.setCustomValidity("");
    return;
  }

  const requestId = ++latestRequestId;
  refreshButton.disabled = true;
  weatherContent.hidden = true;
  errorCard.hidden = true;
  requestStatus.textContent = `Looking up ${city} and fetching its live forecast…`;

  try {
    const geocoding = await fetchJson(GEOCODING_API_URL, {
      name: city,
      count: 5,
      language: "en",
      format: "json"
    }, "Open-Meteo geocoding");
    if (requestId !== latestRequestId) return;

    const location = Array.isArray(geocoding.results) ? geocoding.results[0] : null;
    if (
      !location ||
      typeof location.latitude !== "number" ||
      typeof location.longitude !== "number" ||
      typeof location.name !== "string"
    ) {
      throw new Error(`Open-Meteo could not find a location for ${city}.`);
    }

    const forecast = await fetchJson(FORECAST_API_URL, {
      latitude: location.latitude,
      longitude: location.longitude,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation_probability,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: location.timezone || "auto",
      forecast_days: 5
    }, "Open-Meteo forecast");
    if (requestId !== latestRequestId) return;

    renderWeather(location, forecast);
    weatherContent.hidden = false;
    requestStatus.textContent = `Live forecast loaded for ${location.name} from Open-Meteo.`;
  } catch (error) {
    if (requestId !== latestRequestId) return;
    console.error("Weather request failed:", error);
    errorMessage.textContent = error instanceof TypeError
      ? "The weather service could not be reached. Check your internet connection and try again."
      : error.message;
    errorCard.hidden = false;
    requestStatus.textContent = "Live weather data could not be loaded.";
  } finally {
    if (requestId === latestRequestId) {
      refreshButton.disabled = false;
    }
  }
}

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchWeather();
});

cityInput.addEventListener("input", () => cityInput.setCustomValidity(""));

fetchWeather();
