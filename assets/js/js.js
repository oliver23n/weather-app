let ApiKey = "a550dd03414f16bf9ad75f4675b75d03";
let today = dayjs();
let cities = [];
function init(){
    cities= getLocal();
    renderHistory();
    $('#searchB').on('click',searchCity);
    $('#history').on('click','.direct',function(){
       sendCity($(this).val());
    }
    );

}
//get the city name and pass it to fetch
function searchCity(){
    const cityInput = $('#cityInput');
    const cityName =  cityInput.val();

    if(!cityName){
        alert('ENTER A CITY');
    }else{
        
        //send city name to find long lat
        sendCity(cityName);
        //save the city 
        const city = {
            name: cityName
        }
        cities.push(city);
        //clear local
        localStorage.clear();
        //store in local
        store(cities);
        //render on side
        renderHistory();
        //clear input value
        cityInput.val('');
    }
}
function renderHistory(){
    //clear everything
    $('#history').remove();
    //get local storage cities
    let stored = getLocal();
    //create and append the history
    const attachHistory = $('#attachHistory');
    const history = $('<div>')
    history.attr('id','history');
    attachHistory.append(history);
    
    for(let i = 0; i<stored.length; i++){
        const cityHistory = $('<button>');
        cityHistory.text(stored[i].name).val(stored[i].name).addClass('direct customB');
        history.append(cityHistory);
    }
    
}
//get local storage
function getLocal(){
    stored = localStorage.getItem('history');
    if(stored){
        return JSON.parse(stored);
    }else{
        return [];
    }
}
//store local storage
function store(items){
    localStorage.setItem('history', JSON.stringify(items));
}
//function that gets the city input and returns lon and lat
function sendCity(city){
    //make api url from city name
    let queryUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + ApiKey;
    //fetch lon and lat
    $.ajax({
        url: queryUrlCity,
        method: 'GET',
    }).then(function (response) {
        let lat = response[0].lat;
        let lon = response[0].lon;
        // pass in lon and lat into query url for the current weather
        let queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+lat+"&lon="+lon+"&appid="+ApiKey;
        //fetch weather data
        $.ajax({
            url: queryUrlCurrent,
            method: 'GET',
        }).then(function(data){
            printCurrentW(data);
        });
        //pass lon lat into query url for forecast
        let queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey;
        $.ajax({
            url:queryUrlForecast,
            method:'GET',
        }).then(function(dataforecast){
            printForecast(dataforecast);
        })
    });
//render the current weather data to the corresponding html 
function printCurrentW(data){
    $('#city').text(data.name);
    $('#today').text(today.format('ddd, DD/MM/YYYY'));
    $('#currTemp').text("Temperature: " + Math.floor(data.main.temp) + " F");
    $('#currHumid').text("Humidity: " + data.main.humidity + " %");
    $('#currWspeed').text("Wind Speed: "+ data.wind.speed + " mph");
    let iconUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    $('#currIcon').attr('src',iconUrl);
}
}
//render the forecast
function printForecast(forecast){
    let j = 0;

    for(let i = 0; i<forecast.list.length; i++){
        if(forecast.list[i].dt_txt.includes('12:00:00')){
            console.log(forecast.list[i].dt_txt);
            //set date
            $('#date'+j).text(dayjs(forecast.list[i].dt_txt).format('DD/MM/YYYY'));
            //set temp
             $('#temp'+j).text(forecast.list[i].main.temp);
             //set humidity
            $('#humid'+j).text(forecast.list[i].main.humidity);
            //set windspeed
            $('#wspeed'+j).text(forecast.list[i].wind.speed);
            //set weather icon
            let iconSrc = "http://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png";
            $('#icon'+j).attr('src',iconSrc);
            j++;
        }
    }

}




init();