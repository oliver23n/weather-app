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
// let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+ApiKey;
let lat;
let lon;


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
    //make api url
    let queryUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + ApiKey;
    //fetch lon and lat
    $.ajax({
        url: queryUrlCity,
        method: 'GET',
    }).then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;

    });





}




init();