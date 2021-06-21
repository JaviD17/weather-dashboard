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
                    // call current for uv index
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    //searchApiUv(lat, lon);
                    // call forecastDisplay
                    forecastDisplay(data);
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

var searchApiUv = function(lat,lon) {
    https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=-" + lon + "&exclude=hourly,daily&appid=915ca21aaa90242f48d5abbe9fa3e4f0";

    
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
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
    forecastWeatherUv.innerHTML = "UV Index: " ;
};

searchByCityEl.addEventListener("submit", getSearch);