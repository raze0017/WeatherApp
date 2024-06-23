import './css/styles.css';
import './css/iconstyles.css';
import './css/addtional.css'
import { display } from './display';
document.addEventListener('DOMContentLoaded',()=>{


console.log('HEllOII');
const search=document.querySelector('#searchField');
const butt=document.querySelector('.butt');
const img=document.querySelector('img');
const temp=document.querySelector('.temp');
const cond=document.querySelector('.cond');
const minTemp=document.querySelector('.min');
const maxTemp=document.querySelector('.max');
const feels=document.querySelector('.feels');
const rain=document.querySelector('.rainIcon');
const wind=document.querySelector('.windIcon');
const rise=document.querySelector('.riseIcon');
const set=document.querySelector('.setIcon');
const uv=document.querySelector('.uvIcon');
const pressure=document.querySelector('.pressureIcon');
const humidity=document.querySelector('.humidityIcon');
const gust=document.querySelector('.gustIcon');
butt.addEventListener('click',()=>{
buttOnClick();
});

async function buttOnClick(){
    try{
    const response =await fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=`+search.value, {mods: 'cors'})
    const weatherData=await response.json();
    const detailedResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5240453a3674fb9819110327242006&q=`+search.value, {mods: 'cors'})
    const forecasted=await detailedResponse.json();
    console.log(forecasted);
    img.src=weatherData.current.condition.icon

    temp.textContent=weatherData.current.temp_c+"°c";    
    cond.textContent=weatherData.current.condition.text;
    minTemp.textContent = forecasted.forecast.forecastday[0].day.mintemp_c + "°";
    maxTemp.textContent = forecasted.forecast.forecastday[0].day.maxtemp_c + "°";
    feels.textContent=weatherData.current.feelslike_c+"°";
    rain.textContent=forecasted.forecast.forecastday[0].day.daily_chance_of_rain+"%";
    wind.textContent=weatherData.current.wind_kph+"km/h";
    rise.textContent = forecasted.forecast.forecastday[0].astro.sunrise;
    set.textContent = forecasted.forecast.forecastday[0].astro.sunset;
    uv.textContent = forecasted.current.uv;
    pressure.textContent = weatherData.current.pressure_mb + " mb";
    humidity.textContent = forecasted.current.humidity + "%";
    gust.textContent = weatherData.current.gust_kph + " kph";


    console.log(weatherData);
    }catch(error){
        alert('The information is not available! try again with a nearby city.', error);
    }
}  
buttOnClick();
});   
 