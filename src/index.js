import './styles.css';
document.addEventListener('DOMContentLoaded',()=>{


console.log('HEllOII');
const search=document.querySelector('#searchField');
const butt=document.querySelector('.butt');

butt.addEventListener('click',()=>{
buttOnClick();
});

function buttOnClick(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=d5240453a3674fb9819110327242006&q=`+search.value, {mods: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response.current.condition.text);
    });
}  
});   
 