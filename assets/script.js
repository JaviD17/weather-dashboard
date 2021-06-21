var searchByCityEl = document.getElementById("user-form");
var searchEl = document.getElementById("city");
var cityButtonContainer = document.getElementById("city-button-container");
var forecastLiEl = document.getElementById("weather-card-li");
var forecastWeatherTitle = document.getElementById("weather-title");
var forecastWeatherTemp = document.getElementById("weather-temp");
var forecastWeatherWind = document.getElementById("weather-wind");
var forecastWeatherHumidity = document.getElementById("weather-humidity");
var forecastWeatherUv = document.getElementById("weather-uv");


var getSearch = function (event) {
    event.preventDefault();

    var search = searchEl.value.trim();
    console.log(search);

    if (search) {
        cityButton(search);
        searchApi(search);
        forecastDisplayClear();
        searchEl.value = "";
    }
    else {
        alert("Must enter a city");
    }

};

var searchApi = function (search) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&current&units=imperial&appid=915ca21aaa90242f48d5abbe9fa3e4f0";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    //call forecastDisplay
                    forecastDisplay(data);

                    var latRaw = data.coord.lat;
                    var lonRaw = data.coord.lon;
                    var lat = latRaw.toFixed(2);
                    var lon = lonRaw.toFixed(2);
                    searchApiUv(lat, lon);
                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};

var searchApiUv = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=915ca21aaa90242f48d5abbe9fa3e4f0";


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    forecastUvIndex(data.current.uvi);
                })
            }
        })
}

var cityButton = function (keyword) {
    // create city button
    var createBtn = document.createElement("button");
    createBtn.classList.add("btn", "btn-primary", "col-12", "col-sm-12", "search-buttons");
    createBtn.setAttribute("type", "submit");

    // create div for city button
    var createDiv = document.createElement("div");
    createDiv.classList.add("col-12", "col-sm-12");
    createDiv.textContent = keyword;

    // append div to city button
    createBtn.appendChild(createDiv);

    // append all city button container
    cityButtonContainer.appendChild(createBtn);
};

var forecastDisplayClear = function () {
    forecastWeatherTitle.innerHTML = "";
    forecastWeatherTemp.innerHTML = "";
    forecastWeatherWind.innerHTML = "";
    forecastWeatherHumidity.innerHTML = "";
    forecastWeatherUv.innerHTML = "";
};

var forecastDisplay = function (data) {
    forecastWeatherTitle.innerHTML = data.name + " (6/20/21)";
    forecastWeatherTemp.innerHTML = "Temp: " + data.main.temp + " &degF";
    forecastWeatherWind.innerHTML = "Wind: " + data.wind.speed + " MPH";
    forecastWeatherHumidity.innerHTML = "Humidity: " + data.main.humidity + " %";

};

var forecastUvIndex = function(uv) {
    forecastWeatherUv.innerHTML = "UV Index: " + uv;
}

searchByCityEl.addEventListener("submit", getSearch);