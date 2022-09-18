let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let daysAbbreviated = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
if (date <= 9) {
  date = "0" + date;
}

let year = now.getFullYear();
let hours = now.getHours();
let minute = now.getMinutes();
if (minute <= 9) {
  minute = "0" + minute;
}

let secondDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
let dateSecondDay = secondDay.getDate();
if (dateSecondDay <= 9) {
  dateSecondDay = "0" + dateSecondDay;
}
let monthSecondDay = months[secondDay.getMonth()];
let daySecondDay = daysAbbreviated[secondDay.getDay()];

let thirdDay = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
let dateThirdDay = thirdDay.getDate();
if (dateThirdDay <= 9) {
  dateThirdDay = "0" + dateThirdDay;
}
let monthThirdDay = months[thirdDay.getMonth()];
let dayThirdDay = daysAbbreviated[thirdDay.getDay()];

let fourthDay = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
let dateFourthDay = fourthDay.getDate();
if (dateFourthDay <= 9) {
  dateFourthDay = "0" + dateFourthDay;
}
let monthFourthDay = months[fourthDay.getMonth()];
let dayFourthDay = daysAbbreviated[fourthDay.getDay()];

let fifthDay = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
let dateFifthDay = fifthDay.getDate();
if (dateFifthDay <= 9) {
  dateFifthDay = "0" + dateFifthDay;
}
let monthFifthDay = months[fifthDay.getMonth()];
let dayFifthDay = daysAbbreviated[fifthDay.getDay()];

let todaysDate = document.querySelector("#todaysDate");
todaysDate.innerHTML = `${day} ${date} ${month} ${year}, ${hours}.${minute}`;
let forecastTodaysDate = document.querySelector("#forecastTodaysDate");
forecastTodaysDate.innerHTML = `${date} ${month}`;

let forecastSecondDate = document.querySelector("#forecastSecondDate");
forecastSecondDate.innerHTML = `${dateSecondDay} ${monthSecondDay}`;
let forecastSecondDay = document.querySelector("#forecastSecondDay");
forecastSecondDay.innerHTML = `${daySecondDay}`;

let forecastThirdDate = document.querySelector("#forecastThirdDate");
forecastThirdDate.innerHTML = `${dateThirdDay} ${monthThirdDay}`;
let forecastThirdDay = document.querySelector("#forecastThirdDay");
forecastThirdDay.innerHTML = `${dayThirdDay}`;

let forecastFourthDate = document.querySelector("#forecastFourthDate");
forecastFourthDate.innerHTML = `${dateFourthDay} ${monthFourthDay}`;
let forecastFourthDay = document.querySelector("#forecastFourthDay");
forecastFourthDay.innerHTML = `${dayFourthDay}`;

let forecastFifthDate = document.querySelector("#forecastFifthDate");
forecastFifthDate.innerHTML = `${dateFifthDay} ${monthFifthDay}`;
let forecastFifthDay = document.querySelector("#forecastFifthDay");
forecastFifthDay.innerHTML = `${dayFifthDay}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentlyCity = document.querySelector("#currentlyCity");
  currentlyCity.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&units=metric&appid=1d45b6c902947dbfd4192037ee19cf1a`;
  axios.get(apiUrl).then(showInformation);
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=1d45b6c902947dbfd4192037ee19cf1a`;
  axios.get(currentApiUrl).then(showCurrentlyWeather);
}
let form = document.querySelector("#searching-form");
form.addEventListener("submit", search);

function showCurrentlyWeather(response) {
  let cityCurrentlyTemp = Math.round(response.data.main.temp);
  let currentlyTemperature = document.querySelector("#currentlyTemperature");
  currentlyTemperature.innerHTML = `${cityCurrentlyTemp}`;
  let forecastTemperature = document.querySelector("#temperature");
  forecastTemperature.innerHTML = `${cityCurrentlyTemp}`;

  function celsiusToFahrenheit() {
    currentlyTempCelLink.classList.remove("activ");
    currentlyTempFahLink.classList.add("activ");
    let fahrenheit = Math.round(cityCurrentlyTemp * 1.8 + 32);
    currentlyTemperature.innerHTML = `${fahrenheit}`;
  }
  let currentlyTempFahLink = document.querySelector("#currentlyTempFahLink");
  currentlyTempFahLink.addEventListener("click", celsiusToFahrenheit);

  function fahrenheitToCelsius() {
    currentlyTempCelLink.classList.add("activ");
    currentlyTempFahLink.classList.remove("activ");
    let cityCurrentlyTemp = Math.round(response.data.main.temp);
    currentlyTemperature.innerHTML = `${cityCurrentlyTemp}`;
  }
  let currentlyTempCelLink = document.querySelector("#currentlyTempCelLink");
  currentlyTempCelLink.addEventListener("click", fahrenheitToCelsius);

  let humidity = Math.round(response.data.main.humidity);
  let currentlyHumidity = document.querySelector("#humidity");
  currentlyHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentlyWind = document.querySelector("#wind");
  currentlyWind.innerHTML = `Wind: ${wind}km/h`;

  let description = response.data.weather[0].description;
  let currentlyDescription = document.querySelector("#description");
  currentlyDescription.innerHTML = `${description}`;
  let forecastDescription = document.querySelector("#forecastInformation");
  forecastDescription.innerHTML = `${description}`;

  let mainImg = document.querySelector("#mainImg");
  mainImg.setAttribute("alt", response.data.weather[0].main);

  let weatherId = response.data.weather[0].id;
  if (weatherId === 802) {
    document.getElementById("mainImg").src = "img/fair.png";
  } else if (weatherId === 800) {
    document.getElementById("mainImg").src = "img/sunny.png";
  } else if (weatherId === 801) {
    document.getElementById("mainImg").src = "img/partly-cloudy.png";
  } else if (weatherId === 803) {
    document.getElementById("mainImg").src = "img/cloudy.png";
  } else if (weatherId === 804) {
    document.getElementById("mainImg").src = "img/fog.png";
  } else if (weatherId === 600) {
    document.getElementById("mainImg").src = "img/snow-shower.png";
  } else if (weatherId === 601) {
    document.getElementById("mainImg").src = "img/snow.png";
  } else if (weatherId === 602) {
    document.getElementById("mainImg").src = "img/flurries.png";
  } else if (weatherId === 621) {
    document.getElementById("mainImg").src = "img/blizzard.png";
  } else if (weatherId === 622) {
    document.getElementById("mainImg").src = "img/freezing.png";
  } else if (weatherId === 511) {
    document.getElementById("mainImg").src = "img/sleet.png";
  } else if (weatherId === 210 && 211 && 212 && 221) {
    document.getElementById("mainImg").src = "img/thunder-storm.png";
  } else if (weatherId === 200 && 201 && 202 && 230 && 231 && 232) {
    document.getElementById("mainImg").src = "img/t-storm-rain.png";
  } else if (weatherId === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
    document.getElementById("mainImg").src = "img/showers.png";
  } else if (weatherId === 300 && 310) {
    document.getElementById("mainImg").src = "img/fair-drizzle.png";
  } else if (weatherId === 301 && 302 && 311 && 312) {
    document.getElementById("mainImg").src = "img/drizzle.png";
  } else if (weatherId === 611 && 612 && 613 && 615 && 616 && 620) {
    document.getElementById("mainImg").src = "img/rainy-snow.png";
  } else if (
    weatherId === 701 &&
    711 &&
    721 &&
    731 &&
    741 &&
    751 &&
    761 &&
    771 &&
    781 &&
    762
  ) {
    document.getElementById("mainImg").src = "img/smoke.png";
  } else if (weatherId === 500 || 501 || 502 || 503 || 504) {
    document.getElementById("mainImg").src = "img/rainy.png";
  } else {
    document.getElementById("mainImg").src = "img/na.png";
  }

  let weatherIcon = response.data.weather[0].icon;
  if (weatherIcon === "01n") {
    document.getElementById("mainImg").src = "img/moon.png";
  } else if (weatherIcon === "02n") {
    document.getElementById("mainImg").src = "img/m-cloudy-night.png";
  } else if (weatherIcon === "03n") {
    document.getElementById("mainImg").src = "img/fog.png";
  } else if (weatherIcon === "04n") {
    document.getElementById("mainImg").src = "img/m-cloudy-night.png";
  }
}
function showInformation(response) {
  let forecastSecondDayTemp = Math.round(response.data.list[8].main.temp);
  let temperatureSecondDay = document.querySelector("#temperatureSecondDay");
  temperatureSecondDay.innerHTML = `${forecastSecondDayTemp}`;

  let forecastThirdDayTemp = Math.round(response.data.list[16].main.temp);
  let temperatureThirdDay = document.querySelector("#temperatureThirdDay");
  temperatureThirdDay.innerHTML = `${forecastThirdDayTemp}`;

  let forecastFourthDayTemp = Math.round(response.data.list[24].main.temp);
  let temperatureFourthDay = document.querySelector("#temperatureFourthDay");
  temperatureFourthDay.innerHTML = `${forecastFourthDayTemp}`;

  let forecastFifthDayTemp = Math.round(response.data.list[32].main.temp);
  let temperatureFifthDay = document.querySelector("#temperatureFifthDay");
  temperatureFifthDay.innerHTML = `${forecastFifthDayTemp}`;

  let forecastSecondDayDescription =
    response.data.list[8].weather[0].description;
  let forecastSecondInformation = document.querySelector(
    "#forecastSecondInformation"
  );
  forecastSecondInformation.innerHTML = `${forecastSecondDayDescription}`;

  let forecastThirdDayDescription =
    response.data.list[16].weather[0].description;
  let forecastThirdInformation = document.querySelector(
    "#forecastThirdInformation"
  );
  forecastThirdInformation.innerHTML = `${forecastThirdDayDescription}`;

  let forecastFourthDayDescription =
    response.data.list[24].weather[0].description;
  let forecastFourthInformation = document.querySelector(
    "#forecastFourthInformation"
  );
  forecastFourthInformation.innerHTML = `${forecastFourthDayDescription}`;

  let forecastFifthDayDescription =
    response.data.list[32].weather[0].description;
  let forecastFifthInformation = document.querySelector(
    "#forecastFifthInformation"
  );
  forecastFifthInformation.innerHTML = `${forecastFifthDayDescription}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1d45b6c902947dbfd4192037ee19cf1a&units=metric`;
  axios.get(apiGeoUrl).then(showPositionWeatherInformation);
  let apiGeoUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1d45b6c902947dbfd4192037ee19cf1a&units=metric`;
  axios.get(apiGeoUrlForecast).then(showInformation);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geolocation = document.querySelector("#geolocation");
geolocation.addEventListener("click", getCurrentPosition);

function showPositionWeatherInformation(response) {
  let cityName = response.data.name;
  let currentlyCity = document.querySelector("#currentlyCity");
  currentlyCity.innerHTML = `${cityName}`;
  showCurrentlyWeather(response);
}
