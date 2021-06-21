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
        forecastDisplay(search);
        searchEl.value = "";
    }
    else {
        alert("Must enter a city");
    }

};

var searchApi = function (search) {
    console.log("hello world");
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=915ca21aaa90242f48d5abbe9fa3e4f0"
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                //
            })
        }
    })
    // api key 915ca21aaa90242f48d5abbe9fa3e4f0
};

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

var forecastDisplay = function(keyword) {
    forecastWeatherTitle.innerHTML = keyword + " (6/20/21)";
}

searchByCityEl.addEventListener("submit", getSearch);