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
let city;
// let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+ApiKey;
let lat;
let lon;
let queryUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+ApiKey;


//get the lon and lat for the input city, then pass it into the weather so we can get the data, after getting the data, get all the required weather data, create an object with the city name lon lat data for the weather store it localy and show it to page

//get the city from input 
    //inside function 
    // find lon and lat for that city
//get the data 
//pass it into the elements
function init(){
    
}
init();