const date = new Date();
const time = document.querySelector("h1");

function resetTime(){
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    if(hour<10){
        hour = "0"+hour.toString();
    }
    if(min<10){
        min = "0"+min.toString();
    }
    time.innerText = `${hour} : ${min}`;
}

function init(){
    setInterval(resetTime,1000);
}
init();