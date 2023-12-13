const apiKey = "c36c3d4f715e64907aba33fa659344e5";

window.onload = function () {
  weatherApi();
};

function weatherApi() {
  const countryInput = document.getElementById("countryInput").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${countryInput}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}
function displayWeather(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = "";

  const forecastList = data.list;
  const forecastsFor6AM = forecastList.filter((forecast) => {
    const time = new Date(forecast.dt_txt).getHours();
    return time === 6;
  });

  forecastsFor6AM.forEach((forecast) => {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("fetchDate-container");

    const dateTime = new Date(forecast.dt_txt);
    const day = Week(dateTime.getDay());
    const date = dateTime.toLocaleDateString();
    dateContainer.innerHTML += `
                    <h2>${day}</h2><h2> ${date}</h2><br>
                `;

    const temperature = forecast.main.temp;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;
    const pressure = forecast.main.pressure;
    const description = forecast.weather[0].description;
    const iconCode = forecast.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    dateContainer.innerHTML += `
                    <p>Temperature: ${temperature}°C</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Pressure: ${pressure} hPa</p>
                    <p style="text-transform: capitalize;">Description: ${description}</p>
                    <img class="weather-icon" src="${iconUrl}" alt="Weather Icon">
                    <hr>
                `;

    weatherInfoDiv.appendChild(dateContainer);
  });
  var title = document.getElementById("title");
  const countryInput = document.getElementById("countryInput").value;
  title.innerHTML = `5-Day Weather Forecast Data Of <b> ${countryInput}</b>`;
}

function Week(dayIndex) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}
