import './styles.css';
document.addEventListener('DOMContentLoaded',()=>{


console.log('HEllOII');
const search=document.querySelector('#searchField');
const butt=document.querySelector('.butt');
butt.addEventListener('click',()=>{
buttOnClick();
});

async function buttOnClick(){
    try{
    const response =await fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=`+search.value, {mods: 'cors'})
    const weatherData=await response.json();
    console.log(weatherData);
    console.log(weatherData.current.condition.text);
    }catch(error){
        alert('The information is not available! try again with a nearby city or verify the correct spelling', error);
    }
}  
});   
 