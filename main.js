const name = document.querySelector(".name");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const icon = document.querySelector(".weather-icon");
const description = document.querySelector(".description");

const days = document.querySelectorAll(".card");

const cityInput = document.querySelector(".city-input");
const serachButton = document.querySelector(".search-btn");

const API_KEY = "64c109e45f79fa3f3d8ffacf757f18b2";

const getCityCoordinates = async () => {
    const cityName = cityInput.value;
    if(!cityName) {return};

    const GEOCODING_API_URL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
    const response = await fetch(GEOCODING_API_URL);
    const data = await response.json();

    if(data.cod == "404") {
        alert("Enter valid city name");
        return;
    }

    name.textContent = data.city.name;
    const todayDate = new Date(data.list[0].dt * 1000);
    date.textContent = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
    temp.textContent = (data.list[0].main.temp - 273).toFixed(1);
    wind.textContent = (data.list[0].wind.speed).toFixed(1);
    humidity.textContent = (data.list[0].main.humidity).toFixed(1);
    icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
    description.textContent = data.list[0].weather[0].description;

    for(let i = 5; i <= 29; i += 8) {
        const daysDate = days[(i - 5) / 8].querySelector(".days-date");
        const daysIcon = days[(i - 5) / 8].querySelector(".days-weather-icon");
        const daysTemp = days[(i - 5) / 8].querySelector(".days-temp");
        const daysWind = days[(i - 5) / 8].querySelector(".days-wind");
        const daysHumidity = days[(i - 5) / 8].querySelector(".days-humidity");

        const dateOftheDays = new Date(data.list[i].dt * 1000);
        daysDate.textContent = `${dateOftheDays.getFullYear()}-${dateOftheDays.getMonth() + 1}-${dateOftheDays.getDate()}`;
        daysIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        daysTemp.textContent = (data.list[i].main.temp - 273).toFixed(1);
        daysWind.textContent = (data.list[i].wind.speed).toFixed(1);
        daysHumidity.textContent = (data.list[i].main.humidity).toFixed(1);
    }
}

serachButton.addEventListener("click", getCityCoordinates);