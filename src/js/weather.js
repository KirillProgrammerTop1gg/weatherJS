// Отримати погоду за допомогою OpenWeatherMap API Опис:
// - Використайте публічне API OpenWeatherMap для отримання поточної погоди.
// - Зробіть GET - запит за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}, де { city } - назва міста, а { API_KEY } - ваш ключ API OpenWeatherMap.
// - Перегляньте отримані дані щодо погоди.

// https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}

import keys from './data.json';

const fetchIp = () => fetch('https://api.db-ip.com/v2/free/self').then(response => !response.ok ? console.error(`Error fetched IP: ${response.status}`) : response.json());
const fetchWeather = (city, API_KEY) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then(response => !response.ok ? console.error(`Error fetched weather: ${response.status}`) : response.json());

const setWeather = () => fetchIp().then(data => {
    // console.log(data);
    fetchWeather(data.stateProv, keys.API_KEY_openweather).then(val => {
        // console.log(val);
        document.querySelector('.city').innerHTML = `City: ${data.stateProv}`;
        document.querySelector('.country').innerHTML = `Country: ${data.countryName}`;
        document.querySelector('.coords').innerHTML = `Coords: ${val.coord.lat}, ${val.coord.lon}`;
        document.querySelector('.min_temp').innerHTML = `Min temp: ${val.main.temp_min} *C`;
        document.querySelector('.temp').innerHTML = `Temp: ${val.main.temp} *C`;
        document.querySelector('.max_temp').innerHTML = `Max temp: ${val.main.temp_max} *C`;
        document.querySelector('.temp_feels_like').innerHTML = `Temp feels like: ${val.main.feels_like} *C`;
        document.querySelector('.wind_speed').innerHTML = `Wind speed: ${val.wind.speed} metre/sec`;
        document.querySelector('.humidity').innerHTML = `Humidity: ${val.main.humidity}%`;
        document.querySelector('.pressure').innerHTML = `Pressure: ${val.main.pressure} hPa`;
        document.querySelector('.cloudiness').innerHTML = `Cloudiness: ${val.clouds.all}%`;
        document.querySelector('.visibility').innerHTML = `Visibility: ${val.visibility} metres`;
        document.querySelector('.weather').innerHTML = `${val.weather[0].description}`;
        document.querySelector('.img').setAttribute('src', `https://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`);
    });
})

setWeather();

setInterval(setWeather, 5000);