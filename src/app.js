function date() {
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

  let year = now.getFullYear();
  let hours = now.getHours();
  let minute = now.getMinutes();
  if (minute <= 9) {
    minute = "0" + minute;
  }
  let date = now.getDate();
  if (date <= 9) {
    date = "0" + date;
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
  todaysDate.innerHTML = `Last updated: ${day} ${date} ${month} ${year}, ${hours}.${minute}`;
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
}
date();

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
  let country = response.data.sys.country;
  let currentlyCountry = document.querySelector("#currentlyCountry");
  currentlyCountry.innerHTML = `${country}`;

  function celsiusToFahrenheit(event) {
    event.preventDefault();
    currentlyTempCelLink.classList.remove("activ");
    currentlyTempFahLink.classList.add("activ");
    let fahrenheit = Math.round(cityCurrentlyTemp * 1.8 + 32);
    currentlyTemperature.innerHTML = `${fahrenheit}`;
  }
  let currentlyTempFahLink = document.querySelector("#currentlyTempFahLink");
  currentlyTempFahLink.addEventListener("click", celsiusToFahrenheit);

  function fahrenheitToCelsius(event) {
    event.preventDefault();
    currentlyTempCelLink.classList.add("activ");
    currentlyTempFahLink.classList.remove("activ");
    let cityCurrentlyTemp = Math.round(response.data.main.temp);
    currentlyTemperature.innerHTML = `${cityCurrentlyTemp}`;
  }
  let currentlyTempCelLink = document.querySelector("#currentlyTempCelLink");
  currentlyTempCelLink.addEventListener("click", fahrenheitToCelsius);

  function forecastCelsiusToFahrenheit(event) {
    event.preventDefault();
    forecastTempCelLink.classList.remove("activ");
    forecastTempFavLink.classList.add("activ");
    let fahrenheit = Math.round(cityCurrentlyTemp * 1.8 + 32);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${fahrenheit}`;
  }
  let forecastTempFavLink = document.querySelector("#forecastTempFavLink");
  forecastTempFavLink.addEventListener("click", forecastCelsiusToFahrenheit);

  function forecastFahrenheitToCelsius(event) {
    event.preventDefault();
    forecastTempCelLink.classList.add("activ");
    forecastTempFavLink.classList.remove("activ");
    let cityCurrentlyTemp = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${cityCurrentlyTemp}`;
  }
  let forecastTempCelLink = document.querySelector("#forecastTempCelLink");
  forecastTempCelLink.addEventListener("click", forecastFahrenheitToCelsius);

  let humidity = Math.round(response.data.main.humidity);
  let currentlyHumidity = document.querySelector("#humidity");
  currentlyHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentlyWind = document.querySelector("#wind");
  currentlyWind.innerHTML = `Wind: ${wind} m/s`;

  let description = response.data.weather[0].description;
  let currentlyDescription = document.querySelector("#description");
  currentlyDescription.innerHTML = `${description}`;
  let forecastDescription = document.querySelector("#forecastInformation");
  forecastDescription.innerHTML = `${description}`;

  let mainImg = document.querySelector("#mainImg");
  mainImg.setAttribute("alt", response.data.weather[0].main);

  let forecastSecondImg = document.querySelector("#forecastImgFirstDay");
  forecastSecondImg.setAttribute("alt", response.data.weather[0].main);
  function weatherImg() {
    let weatherImg = response.data.weather[0].id;
    if (weatherImg === 802) {
      document.getElementById("mainImg").src = "img/fair.png";
      document.getElementById("forecastImgFirstDay").src = "img/fair.png";
    } else if (weatherImg === 800) {
      document.getElementById("mainImg").src = "img/sunny.png";
      document.getElementById("forecastImgFirstDay").src = "img/sunny.png";
    } else if (weatherImg === 801) {
      document.getElementById("mainImg").src = "img/partly-cloudy.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/partly-cloudy.png";
    } else if (weatherImg === 803) {
      document.getElementById("mainImg").src = "img/cloudy.png";
      document.getElementById("forecastImgFirstDay").src = "img/cloudy.png";
    } else if (weatherImg === 804) {
      document.getElementById("mainImg").src = "img/fog.png";
      document.getElementById("forecastImgFirstDay").src = "img/fog.png";
    } else if (weatherImg === 600) {
      document.getElementById("mainImg").src = "img/snow-shower.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/snow-shower.png";
    } else if (weatherImg === 601) {
      document.getElementById("mainImg").src = "img/snow.png";
      document.getElementById("forecastImgFirstDay").src = "img/snow.png";
    } else if (weatherImg === 602) {
      document.getElementById("mainImg").src = "img/flurries.png";
      document.getElementById("forecastImgFirstDay").src = "img/flurries.png";
    } else if (weatherImg === 621) {
      document.getElementById("mainImg").src = "img/blizzard.png";
      document.getElementById("forecastImgFirstDay").src = "img/blizzard.png";
    } else if (weatherImg === 622) {
      document.getElementById("mainImg").src = "img/freezing.png";
      document.getElementById("forecastImgFirstDay").src = "img/freezing.png";
    } else if (weatherImg === 511) {
      document.getElementById("mainImg").src = "img/sleet.png";
      document.getElementById("forecastImgFirstDay").src = "img/sleet.png";
    } else if (weatherImg === 210 && 211 && 212 && 221) {
      document.getElementById("mainImg").src = "img/thunder-storm.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/thunder-storm.png";
    } else if (weatherImg === 200 && 201 && 202 && 230 && 231 && 232) {
      document.getElementById("mainImg").src = "img/t-storm-rain.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/t-storm-rain.png";
    } else if (weatherImg === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
      document.getElementById("mainImg").src = "img/showers.png";
      document.getElementById("forecastImgFirstDay").src = "img/showers.png";
    } else if (weatherImg === 300 && 310) {
      document.getElementById("mainImg").src = "img/fair-drizzle.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/fair-drizzle.png";
    } else if (weatherImg === 301 && 302 && 311 && 312) {
      document.getElementById("mainImg").src = "img/drizzle.png";
      document.getElementById("forecastImgFirstDay").src = "img/drizzle.png";
    } else if (weatherImg === 611 && 612 && 613 && 615 && 616 && 620) {
      document.getElementById("mainImg").src = "img/rainy-snow.png";
      document.getElementById("forecastImgFirstDay").src = "img/rainy-snow.png";
    } else if (
      weatherImg === 701 &&
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
      document.getElementById("forecastImgFirstDay").src = "img/smoke.png";
    } else if (weatherImg === 500 || 501 || 502 || 503 || 504) {
      document.getElementById("mainImg").src = "img/rainy.png";
      document.getElementById("forecastImgFirstDay").src = "img/rainy.png";
    } else {
      document.getElementById("mainImg").src = "img/na.png";
      document.getElementById("forecastImgFirstDay").src = "img/na.png";
    }
  }
  weatherImg();

  function weatherIcon() {
    let weatherIcon = response.data.weather[0].icon;
    if (weatherIcon === "01n") {
      document.getElementById("mainImg").src = "img/moon.png";
      document.getElementById("forecastImgFirstDay").src = "img/moon.png";
    } else if (weatherIcon === "02n") {
      document.getElementById("mainImg").src = "img/p-c-night.png";
      document.getElementById("forecastImgFirstDay").src = "img/p-c-night.png";
    } else if (weatherIcon === "03n") {
      document.getElementById("mainImg").src = "img/fog.png";
      document.getElementById("forecastImgFirstDay").src = "img/fog.png";
    } else if (weatherIcon === "04n") {
      document.getElementById("mainImg").src = "img/m-cloudy-night.png";
      document.getElementById("forecastImgFirstDay").src =
        "img/m-cloudy-night.png";
    }
  }
  weatherIcon();
}

function showInformation(response) {
  let forecastSecondDayTemp = Math.round(response.data.list[8].main.temp);
  let temperatureSecondDay = document.querySelector("#temperatureSecondDay");
  temperatureSecondDay.innerHTML = `${forecastSecondDayTemp}`;

  function forecastSecondCelsiusToFahrenheit(event) {
    event.preventDefault();
    forecastSecondTempCelLink.classList.remove("activ");
    forecastSecondTempFavLink.classList.add("activ");
    let fahrenheit = Math.round(forecastSecondDayTemp * 1.8 + 32);
    let temperatureSecondDay = document.querySelector("#temperatureSecondDay");
    temperatureSecondDay.innerHTML = `${fahrenheit}`;
  }
  let forecastSecondTempFavLink = document.querySelector(
    "#forecastSecondTempFavLink"
  );
  forecastSecondTempFavLink.addEventListener(
    "click",
    forecastSecondCelsiusToFahrenheit
  );

  function forecastSecondFahrenheitToCelsius(event) {
    event.preventDefault();
    forecastSecondTempCelLink.classList.add("activ");
    forecastSecondTempFavLink.classList.remove("activ");
    let temperatureSecondDay = document.querySelector("#temperatureSecondDay");
    temperatureSecondDay.innerHTML = `${forecastSecondDayTemp}`;
  }
  let forecastSecondTempCelLink = document.querySelector(
    "#forecastSecondTempCelLink"
  );
  forecastSecondTempCelLink.addEventListener(
    "click",
    forecastSecondFahrenheitToCelsius
  );

  let forecastThirdDayTemp = Math.round(response.data.list[16].main.temp);
  let temperatureThirdDay = document.querySelector("#temperatureThirdDay");
  temperatureThirdDay.innerHTML = `${forecastThirdDayTemp}`;

  function forecastThirdCelsiusToFahrenheit(event) {
    event.preventDefault();
    forecastThirdTempCelLink.classList.remove("activ");
    forecastThirdTempFavLink.classList.add("activ");
    let fahrenheit = Math.round(forecastThirdDayTemp * 1.8 + 32);
    let temperatureThirdDay = document.querySelector("#temperatureThirdDay");
    temperatureThirdDay.innerHTML = `${fahrenheit}`;
  }
  let forecastThirdTempFavLink = document.querySelector(
    "#forecastThirdTempFavLink"
  );
  forecastThirdTempFavLink.addEventListener(
    "click",
    forecastThirdCelsiusToFahrenheit
  );

  function forecastThirdFahrenheitToCelsius(event) {
    event.preventDefault();
    forecastThirdTempCelLink.classList.add("activ");
    forecastThirdTempFavLink.classList.remove("activ");
    let temperatureThirdDay = document.querySelector("#temperatureThirdDay");
    temperatureThirdDay.innerHTML = `${forecastThirdDayTemp}`;
  }
  let forecastThirdTempCelLink = document.querySelector(
    "#forecastThirdTempCelLink"
  );
  forecastThirdTempCelLink.addEventListener(
    "click",
    forecastThirdFahrenheitToCelsius
  );

  let forecastFourthDayTemp = Math.round(response.data.list[24].main.temp);
  let temperatureFourthDay = document.querySelector("#temperatureFourthDay");
  temperatureFourthDay.innerHTML = `${forecastFourthDayTemp}`;

  function forecastFourthCelsiusToFahrenheit(event) {
    event.preventDefault();
    forecastFourthTempCelLink.classList.remove("activ");
    forecastFourthTempFavLink.classList.add("activ");
    let fahrenheit = Math.round(forecastFourthDayTemp * 1.8 + 32);
    let temperatureFourthDay = document.querySelector("#temperatureFourthDay");
    temperatureFourthDay.innerHTML = `${fahrenheit}`;
  }
  let forecastFourthTempFavLink = document.querySelector(
    "#forecastFourthTempFavLink"
  );
  forecastFourthTempFavLink.addEventListener(
    "click",
    forecastFourthCelsiusToFahrenheit
  );
  function forecastFourthFahrenheitToCelsius(event) {
    event.preventDefault();
    forecastFourthTempCelLink.classList.add("activ");
    forecastFourthTempFavLink.classList.remove("activ");
    let temperatureFourthDay = document.querySelector("#temperatureFourthDay");
    temperatureFourthDay.innerHTML = `${forecastFourthDayTemp}`;
  }
  let forecastFourthTempCelLink = document.querySelector(
    "#forecastFourthTempCelLink"
  );
  forecastFourthTempCelLink.addEventListener(
    "click",
    forecastFourthFahrenheitToCelsius
  );

  let forecastFifthDayTemp = Math.round(response.data.list[32].main.temp);
  let temperatureFifthDay = document.querySelector("#temperatureFifthDay");
  temperatureFifthDay.innerHTML = `${forecastFifthDayTemp}`;

  function forecastFifthCelsiusToFahrenheit(event) {
    event.preventDefault();
    forecastFifthTempCelLink.classList.remove("activ");
    forecastFifthTempFavLink.classList.add("activ");
    let fahrenheit = Math.round(forecastFifthDayTemp * 1.8 + 32);
    let temperatureFifthDay = document.querySelector("#temperatureFifthDay");
    temperatureFifthDay.innerHTML = `${fahrenheit}`;
  }
  let forecastFifthTempFavLink = document.querySelector(
    "#forecastFifthTempFavLink"
  );
  forecastFifthTempFavLink.addEventListener(
    "click",
    forecastFifthCelsiusToFahrenheit
  );
  function forecastFifthFahrenheitToCelsius(event) {
    event.preventDefault();
    forecastFifthTempCelLink.classList.add("activ");
    forecastFifthTempFavLink.classList.remove("activ");
    let temperatureFifthDay = document.querySelector("#temperatureFifthDay");
    temperatureFifthDay.innerHTML = `${forecastFifthDayTemp}`;
  }
  let forecastFifthTempCelLink = document.querySelector(
    "#forecastFifthTempCelLink"
  );
  forecastFifthTempCelLink.addEventListener(
    "click",
    forecastFifthFahrenheitToCelsius
  );
  function forecastDescription(response) {
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
  forecastDescription(response);
  function weatherImg() {
    let weatherImg = response.data.list[8].weather[0].id;
    if (weatherImg === 802) {
      document.getElementById("forecastImgSecondDay").src = "img/fair.png";
    } else if (weatherImg === 800) {
      document.getElementById("forecastImgSecondDay").src = "img/sunny.png";
    } else if (weatherImg === 801) {
      document.getElementById("forecastImgSecondDay").src =
        "img/partly-cloudy.png";
    } else if (weatherImg === 803) {
      document.getElementById("forecastImgSecondDay").src = "img/cloudy.png";
    } else if (weatherImg === 804) {
      document.getElementById("forecastImgSecondDay").src = "img/fog.png";
    } else if (weatherImg === 600) {
      document.getElementById("forecastImgSecondDay").src =
        "img/snow-shower.png";
    } else if (weatherImg === 601) {
      document.getElementById("forecastImgSecondDay").src = "img/snow.png";
    } else if (weatherImg === 602) {
      document.getElementById("forecastImgSecondDay").src = "img/flurries.png";
    } else if (weatherImg === 621) {
      document.getElementById("forecastImgSecondDay").src = "img/blizzard.png";
    } else if (weatherImg === 622) {
      document.getElementById("forecastImgSecondDay").src = "img/freezing.png";
    } else if (weatherImg === 511) {
      document.getElementById("forecastImgSecondDay").src = "img/sleet.png";
    } else if (weatherImg === 210 && 211 && 212 && 221) {
      document.getElementById("forecastImgSecondDay").src =
        "img/thunder-storm.png";
    } else if (weatherImg === 200 && 201 && 202 && 230 && 231 && 232) {
      document.getElementById("forecastImgSecondDay").src =
        "img/t-storm-rain.png";
    } else if (weatherImg === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
      document.getElementById("forecastImgSecondDay").src = "img/showers.png";
    } else if (weatherImg === 300 && 310) {
      document.getElementById("forecastImgSecondDay").src =
        "img/fair-drizzle.png";
    } else if (weatherImg === 301 && 302 && 311 && 312) {
      document.getElementById("forecastImgSecondDay").src = "img/drizzle.png";
    } else if (weatherImg === 611 && 612 && 613 && 615 && 616 && 620) {
      document.getElementById("forecastImgSecondDay").src =
        "img/rainy-snow.png";
    } else if (
      weatherImg === 701 &&
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
      document.getElementById("forecastImgSecondDay").src = "img/smoke.png";
    } else if (weatherImg === 500 || 501 || 502 || 503 || 504) {
      document.getElementById("forecastImgSecondDay").src = "img/rainy.png";
    } else {
      document.getElementById("forecastImgSecondDay").src = "img/na.png";
    }
  }
  weatherImg();

  function weatherIcon() {
    let weatherIcon = response.data.list[8].weather[0].icon;
    if (weatherIcon === "01n") {
      document.getElementById("forecastImgSecondDay").src = "img/moon.png";
    } else if (weatherIcon === "02n") {
      document.getElementById("forecastImgSecondDay").src = "img/p-c-night.png";
    } else if (weatherIcon === "03n") {
      document.getElementById("forecastImgSecondDay").src = "img/fog.png";
    } else if (weatherIcon === "04n") {
      document.getElementById("forecastImgSecondDay").src =
        "img/m-cloudy-night.png";
    }
  }
  weatherIcon();
  function weatherThirdImg() {
    let weatherImg = response.data.list[16].weather[0].id;
    if (weatherImg === 802) {
      document.getElementById("forecastImgThirdDay").src = "img/fair.png";
    } else if (weatherImg === 800) {
      document.getElementById("forecastImgThirdDay").src = "img/sunny.png";
    } else if (weatherImg === 801) {
      document.getElementById("forecastImgThirdDay").src =
        "img/partly-cloudy.png";
    } else if (weatherImg === 803) {
      document.getElementById("forecastImgThirdDay").src = "img/cloudy.png";
    } else if (weatherImg === 804) {
      document.getElementById("forecastImgThirdDay").src = "img/fog.png";
    } else if (weatherImg === 600) {
      document.getElementById("forecastImgThirdDay").src =
        "img/snow-shower.png";
    } else if (weatherImg === 601) {
      document.getElementById("forecastImgThirdDay").src = "img/snow.png";
    } else if (weatherImg === 602) {
      document.getElementById("forecastImgThirdDay").src = "img/flurries.png";
    } else if (weatherImg === 621) {
      document.getElementById("forecastImgThirdDay").src = "img/blizzard.png";
    } else if (weatherImg === 622) {
      document.getElementById("forecastImgThirdDay").src = "img/freezing.png";
    } else if (weatherImg === 511) {
      document.getElementById("forecastImgThirdDay").src = "img/sleet.png";
    } else if (weatherImg === 210 && 211 && 212 && 221) {
      document.getElementById("forecastImgThirdDay").src =
        "img/thunder-storm.png";
    } else if (weatherImg === 200 && 201 && 202 && 230 && 231 && 232) {
      document.getElementById("forecastImgThirdDay").src =
        "img/t-storm-rain.png";
    } else if (weatherImg === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
      document.getElementById("forecastImgThirdDay").src = "img/showers.png";
    } else if (weatherImg === 300 && 310) {
      document.getElementById("forecastImgThirdDay").src =
        "img/fair-drizzle.png";
    } else if (weatherImg === 301 && 302 && 311 && 312) {
      document.getElementById("forecastImgThirdDay").src = "img/drizzle.png";
    } else if (weatherImg === 611 && 612 && 613 && 615 && 616 && 620) {
      document.getElementById("forecastImgThirdDay").src = "img/rainy-snow.png";
    } else if (
      weatherImg === 701 &&
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
      document.getElementById("forecastImgThirdDay").src = "img/smoke.png";
    } else if (weatherImg === 500 || 501 || 502 || 503 || 504) {
      document.getElementById("forecastImgThirdDay").src = "img/rainy.png";
    } else {
      document.getElementById("forecastImgThirdDay").src = "img/na.png";
    }
  }
  weatherThirdImg();

  function weatherThirdIcon() {
    let weatherIcon = response.data.list[16].weather[0].icon;
    if (weatherIcon === "01n") {
      document.getElementById("forecastImgThirdDay").src = "img/moon.png";
    } else if (weatherIcon === "02n") {
      document.getElementById("forecastImgThirdDay").src = "img/p-c-night.png";
    } else if (weatherIcon === "03n") {
      document.getElementById("forecastImgThirdDay").src = "img/fog.png";
    } else if (weatherIcon === "04n") {
      document.getElementById("forecastImgThirdDay").src =
        "img/m-cloudy-night.png";
    }
  }
  weatherThirdIcon();

  function weatherFourthImg() {
    let weatherImg = response.data.list[24].weather[0].id;
    if (weatherImg === 802) {
      document.getElementById("forecastImgFourthDay").src = "img/fair.png";
    } else if (weatherImg === 800) {
      document.getElementById("forecastImgFourthDay").src = "img/sunny.png";
    } else if (weatherImg === 801) {
      document.getElementById("forecastImgFourthDay").src =
        "img/partly-cloudy.png";
    } else if (weatherImg === 803) {
      document.getElementById("forecastImgFourthDay").src = "img/cloudy.png";
    } else if (weatherImg === 804) {
      document.getElementById("forecastImgFourthDay").src = "img/fog.png";
    } else if (weatherImg === 600) {
      document.getElementById("forecastImgFourthDay").src =
        "img/snow-shower.png";
    } else if (weatherImg === 601) {
      document.getElementById("forecastImgFourthDay").src = "img/snow.png";
    } else if (weatherImg === 602) {
      document.getElementById("forecastImgFourthDay").src = "img/flurries.png";
    } else if (weatherImg === 621) {
      document.getElementById("forecastImgFourthDay").src = "img/blizzard.png";
    } else if (weatherImg === 622) {
      document.getElementById("forecastImgFourthDay").src = "img/freezing.png";
    } else if (weatherImg === 511) {
      document.getElementById("forecastImgFourthDay").src = "img/sleet.png";
    } else if (weatherImg === 210 && 211 && 212 && 221) {
      document.getElementById("forecastImgFourthDay").src =
        "img/thunder-storm.png";
    } else if (weatherImg === 200 && 201 && 202 && 230 && 231 && 232) {
      document.getElementById("forecastImgFourthDay").src =
        "img/t-storm-rain.png";
    } else if (weatherImg === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
      document.getElementById("forecastImgFourthDay").src = "img/showers.png";
    } else if (weatherImg === 300 && 310) {
      document.getElementById("forecastImgFourthDay").src =
        "img/fair-drizzle.png";
    } else if (weatherImg === 301 && 302 && 311 && 312) {
      document.getElementById("forecastImgFourthDay").src = "img/drizzle.png";
    } else if (weatherImg === 611 && 612 && 613 && 615 && 616 && 620) {
      document.getElementById("forecastImgFourthDay").src =
        "img/rainy-snow.png";
    } else if (
      weatherImg === 701 &&
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
      document.getElementById("forecastImgFourthDay").src = "img/smoke.png";
    } else if (weatherImg === 500 || 501 || 502 || 503 || 504) {
      document.getElementById("forecastImgFourthDay").src = "img/rainy.png";
    } else {
      document.getElementById("forecastImgFourthDay").src = "img/na.png";
    }
  }
  weatherFourthImg();

  function weatherFourthIcon() {
    let weatherIcon = response.data.list[24].weather[0].icon;
    if (weatherIcon === "01n") {
      document.getElementById("forecastImgFourthDay").src = "img/moon.png";
    } else if (weatherIcon === "02n") {
      document.getElementById("forecastImgFourthDay").src = "img/p-c-night.png";
    } else if (weatherIcon === "03n") {
      document.getElementById("forecastImgFourthDay").src = "img/fog.png";
    } else if (weatherIcon === "04n") {
      document.getElementById("forecastImgFourthDay").src =
        "img/m-cloudy-night.png";
    }
  }
  weatherFourthIcon();

  function weatherFifthImg() {
    let weatherImg = response.data.list[32].weather[0].id;
    if (weatherImg === 802) {
      document.getElementById("forecastImgFifthDay").src = "img/fair.png";
    } else if (weatherImg === 800) {
      document.getElementById("forecastImgFifthDay").src = "img/sunny.png";
    } else if (weatherImg === 801) {
      document.getElementById("forecastImgFifthDay").src =
        "img/partly-cloudy.png";
    } else if (weatherImg === 803) {
      document.getElementById("forecastImgFifthDay").src = "img/cloudy.png";
    } else if (weatherImg === 804) {
      document.getElementById("forecastImgFifthDay").src = "img/fog.png";
    } else if (weatherImg === 600) {
      document.getElementById("forecastImgFifthDay").src =
        "img/snow-shower.png";
    } else if (weatherImg === 601) {
      document.getElementById("forecastImgFifthDay").src = "img/snow.png";
    } else if (weatherImg === 602) {
      document.getElementById("forecastImgFifthDay").src = "img/flurries.png";
    } else if (weatherImg === 621) {
      document.getElementById("forecastImgFifthDay").src = "img/blizzard.png";
    } else if (weatherImg === 622) {
      document.getElementById("forecastImgFifthDay").src = "img/freezing.png";
    } else if (weatherImg === 511) {
      document.getElementById("forecastImgFifthDay").src = "img/sleet.png";
    } else if (weatherImg === 210 && 211 && 212 && 221) {
      document.getElementById("forecastImgFifthDay").src =
        "img/thunder-storm.png";
    } else if (weatherImg === 200 && 201 && 202 && 230 && 231 && 232) {
      document.getElementById("forecastImgFifthDay").src =
        "img/t-storm-rain.png";
    } else if (weatherImg === 520 && 521 && 522 && 531 && 313 && 314 && 321) {
      document.getElementById("forecastImgFifthDay").src = "img/showers.png";
    } else if (weatherImg === 300 && 310) {
      document.getElementById("forecastImgFifthDay").src =
        "img/fair-drizzle.png";
    } else if (weatherImg === 301 && 302 && 311 && 312) {
      document.getElementById("forecastImgFifthDay").src = "img/drizzle.png";
    } else if (weatherImg === 611 && 612 && 613 && 615 && 616 && 620) {
      document.getElementById("forecastImgFifthDay").src = "img/rainy-snow.png";
    } else if (
      weatherImg === 701 &&
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
      document.getElementById("forecastImgFifthDay").src = "img/smoke.png";
    } else if (weatherImg === 500 || 501 || 502 || 503 || 504) {
      document.getElementById("forecastImgFifthDay").src = "img/rainy.png";
    } else {
      document.getElementById("forecastImgFifthDay").src = "img/na.png";
    }
  }
  weatherFifthImg();

  function weatherFifthIcon() {
    let weatherIcon = response.data.list[32].weather[0].icon;
    if (weatherIcon === "01n") {
      document.getElementById("forecastImgFifthDay").src = "img/moon.png";
    } else if (weatherIcon === "02n") {
      document.getElementById("forecastImgFifthDay").src = "img/p-c-night.png";
    } else if (weatherIcon === "03n") {
      document.getElementById("forecastImgFifthDay").src = "img/fog.png";
    } else if (weatherIcon === "04n") {
      document.getElementById("forecastImgFifthDay").src =
        "img/m-cloudy-night.png";
    }
  }
  weatherFifthIcon();
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
