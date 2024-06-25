import './css/styles.css';
import './css/iconstyles.css';
import './css/addtional.css';

document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#searchField');
    const butt = document.querySelector('.butt');
    const img = document.querySelector('img');
    const temp = document.querySelector('.temp');
    const cond = document.querySelector('.cond');
    const minTemp = document.querySelector('.min');
    const maxTemp = document.querySelector('.max');
    const feels = document.querySelector('.feels');
    const rain = document.querySelector('.rainIcon');
    const wind = document.querySelector('.windIcon');
    const rise = document.querySelector('.riseIcon');
    const set = document.querySelector('.setIcon');
    const uv = document.querySelector('.uvIcon');
    const pressure = document.querySelector('.pressureIcon');
    const humidity = document.querySelector('.humidityIcon');
    const gust = document.querySelector('.gustIcon');
    const hours=document.querySelectorAll('.hourlycard');

    butt.addEventListener('click', buttOnClick);

    async function buttOnClick() {
        try {
            const weatherData = await fetchWeatherData(search.value);
            const forecasted = await fetchForecastData(search.value);
            const hourlyData=forecasted.forecast.forecastday[0].hour;
            updateWeatherUI(weatherData, forecasted,hourlyData);

            console.log(weatherData);
            console.log(forecasted);


        } catch (error) {
            console.error('Error fetching data:', error);
            alert('The information is not available! Try again with a nearby city.');
        }
    }

    async function fetchWeatherData(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=${location}`);
        return response.json();
    }

    async function fetchForecastData(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5240453a3674fb9819110327242006&q=${location}`);
        return response.json();
    }

    function updateWeatherUI(weatherData, forecasted,hourlyData) {
        img.src = weatherData.current.condition.icon;
        temp.textContent = `${weatherData.current.temp_c}°c`;
        cond.textContent = weatherData.current.condition.text;
        minTemp.textContent = `${forecasted.forecast.forecastday[0].day.mintemp_c}°`;
        maxTemp.textContent = `${forecasted.forecast.forecastday[0].day.maxtemp_c}°`;
        feels.textContent = `${weatherData.current.feelslike_c}°`;
        rain.textContent = `${forecasted.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        wind.textContent = `${weatherData.current.wind_kph} km/h`;
        rise.textContent = forecasted.forecast.forecastday[0].astro.sunrise;
        set.textContent = forecasted.forecast.forecastday[0].astro.sunset;
        uv.textContent = forecasted.current.uv;
        pressure.textContent = `${weatherData.current.pressure_mb} mb`;
        humidity.textContent = `${forecasted.current.humidity}%`;
        gust.textContent = `${weatherData.current.gust_kph} kph`;


        //hourly card updation
        const now=new Date();
        const currentHour=now.getHours();
        console.log(currentHour);

        for(let i=0;i<8;i++){
            const hourIndex=(currentHour+i+1)%24;
            const hourData=hourlyData[hourIndex];
            
            const time= new Date(hourData.time).getHours();;
            const iconHour=hourData.condition.icon;
            const tempHour=hourData.temp_c;
            console.log(time,iconHour,tempHour);
            
            const hourElement=document.createElement('div');
            hourElement.className='hour';
            hourElement.textContent=`${time}:00`;

            const iconElement=document.createElement('img');
            iconElement.src=iconHour;
            iconElement.alt=`weather`;

            const tempElement=document.createElement('div');
            tempElement.className='temp';


            hours[i].innerHTML='';
            hours[i].appendChild(hourElement);
            hours[i].appendChild(iconElement);
            hours[i].appendChild(tempElement);
        }
    }
    // Initialize with default city or user's last searched location
    buttOnClick();
});
