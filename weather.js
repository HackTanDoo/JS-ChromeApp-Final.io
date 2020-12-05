const COORDS = 'coords';
const API_KEY = "5e08bafc50f78b46cc069b7b862d5ba0";
const weather = document.querySelector(".weather");

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = parseInt(json.main.temp)-273;
        const place = json.name;
        weather.innerHTML = `<h3>${temperature} °C in ${place}</h3>`;
    })
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log("Handle Geo Success");
    console.log(position.coords.latitude, position.coords.longitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log("CANT ACCESS GEOLOCATION")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    console.log("loadCoords");
    const loadedCoords = JSON.parse(localStorage.getItem(COORDS));
    if(loadedCoords === null){
        askForCoords();
        console.log("ASKING COORDS");
        const loadedCoords = JSON.parse(localStorage.getItem(COORDS));
    }
    getWeather(loadedCoords.latitude,loadedCoords.longitude);
}

function init(){
    loadCoords();
}

init();