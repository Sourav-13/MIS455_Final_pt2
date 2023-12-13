const apiKey = "c36c3d4f715e64907aba33fa659344e5";

window.onload = function () {
  weatherApi();
};

function weatherApi() {
  const countryInput = document.getElementById("countryInput").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${countryInput}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
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

 