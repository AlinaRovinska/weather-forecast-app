function getCurrentDateValues(currentDate) {
  function formatTime(time) {
    if (time < 10) {
      time = `0${time}`;
    }
    return time;
  }

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[currentDate.getDay()];
  let hours = formatTime(currentDate.getHours());
  let minutes = formatTime(currentDate.getMinutes());
  return { day, hours, minutes };
}

function getActualCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city");
  let cityToChange = document.querySelector("#city-to-change");
  console.log(inputCity.value);
  cityToChange.innerHTML = `${inputCity.value} ☀️`;

  useWeatherApi(inputCity);
}

function useWeatherApi(inputCity) {
  let apiKey = "4e86ff365bdee97c6973103f9e1c5684";
  let city = inputCity.value;
  console.log(city);
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(changeDisplayTemperature);
}

function changeDisplayTemperature(response) {
  //alert(response.data.main.temp);
  let displayTemperature = document.querySelector(".current-temp");
  let actualTemperature = Math.round(response.data.main.temp);
  displayTemperature.innerHTML = actualTemperature;
}

function changeTempToCelcium() {
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = Math.round((currentTemp.textContent - 32) * 0.5556);

  let currentCelc = document.querySelector("#celcium");
  currentCelc.style.fontWeight = "bold";
  let currentFahr = document.querySelector("#link-fahrenheit");
  currentFahr.style.fontWeight = "normal";
}

function changeTempToFahrenheit() {
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = Math.round(currentTemp.textContent * 1.8 + 32);

  let currentCelc = document.querySelector("#celcium");
  currentCelc.style.fontWeight = "normal";
  let currentFahr = document.querySelector("#link-fahrenheit");
  currentFahr.style.fontWeight = "bold";
}

let currentDate = new Date();
let currentDateValues = getCurrentDateValues(currentDate);

let displayDate = document.querySelector("h5");
displayDate.innerHTML = `${currentDateValues.day} ${currentDateValues.hours}:${currentDateValues.minutes}`;

let form = document.querySelector("form");
form.addEventListener("submit", getActualCity);

let celcium = document.querySelector("#link-celcium");
celcium.addEventListener("click", changeTempToCelcium);

let fahrenheit = document.querySelector("#link-fahrenheit");
fahrenheit.addEventListener("click", changeTempToFahrenheit);
