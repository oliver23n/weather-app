// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

let ApiKey = "a550dd03414f16bf9ad75f4675b75d03";
let today = dayjs();


//get the lon and lat for the input city, then pass it into the weather so we can get the data, after getting the data, get all the required weather data, create an object with the city name lon lat data for the weather store it localy and show it to page

//get the city from input 
    //inside function 
    // find lon and lat for that city
//get the data 
//pass it into the elements
function init(){
    $('#searchB').on('click',searchCity);

}
//get the city name and pass it to fetch
function searchCity(){
    const cityName =  $('#cityInput');
    if(!cityName.val()){
        alert('ENTER A CITY');
    }else{
        //send city name to find long lat
        sendCity(cityName.val());
    }
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
function printForecast(forecast){
    console.log(forecast);
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