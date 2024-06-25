import './css/styles.css';
import './css/iconstyles.css';
import './css/addtional.css';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        search: document.querySelector('#searchField'),
        button: document.querySelector('.butt'),
        img: document.querySelector('img'),
        temp: document.querySelector('.temp'),
        cond: document.querySelector('.cond'),
        minTemp: document.querySelector('.min'),
        maxTemp: document.querySelector('.max'),
        feels: document.querySelector('.feels'),
        rain: document.querySelector('.rainIcon'),
        wind: document.querySelector('.windIcon'),
        rise: document.querySelector('.riseIcon'),
        set: document.querySelector('.setIcon'),
        uv: document.querySelector('.uvIcon'),
        pressure: document.querySelector('.pressureIcon'),
        humidity: document.querySelector('.humidityIcon'),
        gust: document.querySelector('.gustIcon'),
        hourlyCards: document.querySelectorAll('.hourlycard'),
        tempToggle: document.querySelector('#tempToggle')
    };

    let isCelsius = true;

    elements.button.addEventListener('click', handleSearchClick);
    elements.tempToggle.addEventListener('click', toggleTemperatureUnit);

    async function handleSearchClick() {
        try {
            const weatherData = await fetchWeatherData(elements.search.value);
            const forecastData = await fetchForecastData(elements.search.value);
            const hourlyData = forecastData.forecast.forecastday[0].hour;
            updateWeatherUI(weatherData, forecastData, hourlyData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('The information is not available! Try again with a nearby city.');
        }
    }

    async function fetchWeatherData(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=${location}`);
        if (!response.ok) throw new Error('Failed to fetch current weather data');
        return response.json();
    }

    async function fetchForecastData(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5240453a3674fb9819110327242006&q=${location}`);
        if (!response.ok) throw new Error('Failed to fetch forecast data');
        return response.json();
    }

    function updateWeatherUI(weatherData, forecastData, hourlyData) {
        elements.img.src = weatherData.current.condition.icon;
        updateTemperature(elements.temp, weatherData.current.temp_c);
        elements.cond.textContent = weatherData.current.condition.text;
        updateTemperature(elements.minTemp, forecastData.forecast.forecastday[0].day.mintemp_c);
        updateTemperature(elements.maxTemp, forecastData.forecast.forecastday[0].day.maxtemp_c);
        updateTemperature(elements.feels, weatherData.current.feelslike_c);
        elements.rain.textContent = `${forecastData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        elements.wind.textContent = `${weatherData.current.wind_kph} km/h`;
        elements.rise.textContent = forecastData.forecast.forecastday[0].astro.sunrise;
        elements.set.textContent = forecastData.forecast.forecastday[0].astro.sunset;
        elements.uv.textContent = forecastData.current.uv;
        elements.pressure.textContent = `${weatherData.current.pressure_mb} mb`;
        elements.humidity.textContent = `${forecastData.current.humidity}%`;
        elements.gust.textContent = `${weatherData.current.gust_kph} kph`;

        updateHourlyCards(hourlyData);
    }

    function updateTemperature(element, tempC) {
        if (isCelsius) {
            element.textContent = `${tempC}°c`;
        } else {
            const tempF = (tempC * 9/5) + 32;
            element.textContent = `${tempF.toFixed(1)}°f`;
        }
    }

    function updateHourlyCards(hourlyData) {
        const now = new Date();
        const currentHour = now.getHours();

        elements.hourlyCards.forEach((card, i) => {
            const hourIndex = (currentHour + i + 1) % 24;
            const hourData = hourlyData[hourIndex];

            const time = new Date(hourData.time).getHours();
            const iconHour = hourData.condition.icon;
            const tempHour = hourData.temp_c;

            const hourElement = document.createElement('div');
            hourElement.className = 'hour';
            hourElement.textContent = `${time}:00`;

            const iconElement = document.createElement('img');
            iconElement.src = iconHour;
            iconElement.alt = 'weather';

            const tempElement = document.createElement('div');
            tempElement.className = 'temp';

            card.innerHTML = '';
            card.appendChild(hourElement);
            card.appendChild(iconElement);
            card.appendChild(tempElement);
        });
    }

    function toggleTemperatureUnit() {
        isCelsius = !isCelsius;
        elements.tempToggle.textContent = isCelsius ? '°F' : '°C';
        handleSearchClick();  // Re-fetch the data to update the UI
    }

    // Initialize with default city or user's last searched location
    handleSearchClick();
});
