import './styles.css';
import './iconstyles.css';
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
butt.addEventListener('click',()=>{
buttOnClick();
});

async function buttOnClick(){
    try{
    const response =await fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=`+search.value, {mods: 'cors'})
    const weatherData=await response.json();
    
    img.src=weatherData.current.condition.icon

    temp.textContent=weatherData.current.temp_c;
    cond.textContent=weatherData.current.condition.text;
    minTemp.textContent=weatherData.current.dewpoint_c;
    maxTemp.textContent=weatherData.current.heatindex_c;
    feels.textContent=weatherData.current.feelslike_c;
    console.log(weatherData);
    console.log(weatherData.current.condition.text);
    }catch(error){
        alert('The information is not available! try again with a nearby city.', error);
    }
}  
buttOnClick();
});   
 