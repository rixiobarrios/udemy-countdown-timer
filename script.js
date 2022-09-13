//initialize default variables
let countDown;
let timeInterval;

//target elements from the DOM for one or more clocks
const endDate = document.querySelector('input[name="endDate"]');
const clock = document.querySelector('#clock');
const daysSpan = clock.querySelector('.days');
const hoursSpan = clock.querySelector('.hours');
const minutesSpan = clock.querySelector('.minutes');
const secondsSpan = clock.querySelector('.seconds');

//save to local storage
const savedTime = localStorage.getItem('countdown') || false;

//update/start clock
if(savedTime){
    startClock(savedTime);
    let dated = new Date(savedTime);
    endDate.valueAsDate = dated;
}

//changes in input will reset the clock
endDate.addEventListener('change',function(e){
    e.preventDefault();
    clearInterval(timeInterval);
    //console.dir(this);
    //set new date
    const endDateTemp = new Date(this.value);
    //save to local storage
    localStorage.setItem('countdown',endDateTemp);
    //start clock
    startClock(endDateTemp);
})

//functionality of the clock
function startClock(endTime){
    //invoking update for counter
    function updateCounter(){
        let t = timeRemaining(endTime);  
        console.log(t);
        daysSpan.innerHTML = t.days;
        //using .slice() to return two characters
        hoursSpan.innerHTML = ('0'+t.hours).slice(-2);
        minutesSpan.innerHTML = ('0'+t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0'+t.seconds).slice(-2);
        //check to see if we hit target date and if so clear timer
        if(t.total <= 0){
            clearInterval(timeInterval);   
        }
    }
    updateCounter();
    timeInterval = setInterval(updateCounter,1000);
}

//set remaining time
function timeRemaining(endTime){
    //checking end time againts current time
    let t = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor((t/1000)%60);
    let minutes = Math.floor((t/1000/60)%60);
    let hours = Math.floor((t/(1000*60*60))%24);
    let days = Math.floor(t/(1000*60*60*24));
    //return an object
    return {
        'total':t,
        'days':days,
        'hours':hours,
        'minutes':minutes,
        'seconds':seconds
    };
}

//console.log(endDate);
