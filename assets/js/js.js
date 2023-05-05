let ApiKey = "a550dd03414f16bf9ad75f4675b75d03";
let today = dayjs();
let cities = [];

function init() {

    cities = getLocal();
    renderHistory();
    $('#searchB').on('click', searchCity);
    $('#history').on('click', '.direct', function () {
        sendCity($(this).val());
    }
    );

}

//get the city name and pass it to fetch
function searchCity() {
    const cityInput = $('#cityInput');
    const cityName = cityInput.val();
    //send city name to find long lat
    sendCity(cityName);
    //clear input value for search city
    cityInput.val('');
}

//show search history
function renderHistory() {
    //clear everything
    $('#history').remove();
    //get local storage cities
    let stored = getLocal();
    //create and append the history
    const attachHistory = $('#attachHistory');
    const history = $('<div>')
    history.attr('id', 'history');
    attachHistory.append(history);

    for (let i = 0; i < stored.length; i++) {
        const cityHistory = $('<button>');
        cityHistory.text(stored[i].name).val(stored[i].name).addClass('direct customB');
        history.append(cityHistory);
    }
}

//get local storage
function getLocal() {
    stored = localStorage.getItem('history');
    if (stored) {
        return JSON.parse(stored);
    } else {
        return [];
    }
}

//store local storage
function store(items) {
    localStorage.setItem('history', JSON.stringify(items));
}

//function that gets the city input and gets the apropriate data from the api
function sendCity(city) {

    //make api url from city name
    let queryUrlCity = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + ApiKey;
    //fetch lon and lat
    $.ajax({
        url: queryUrlCity,
        method: 'GET',
    }).then(function (response) {
        if (!$.trim(response)) {
            alert('Not a valid location');
        }
        let lat = response[0].lat;
        let lon = response[0].lon;
        // pass in lon and lat into query url for the current weather
        let queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey;
        //fetch weather data
        $.ajax({
            url: queryUrlCurrent,
            method: 'GET',
        }).then(function (data) {
            printCurrentW(data);
        });
        //pass lon lat into query url for forecast
        let queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey;
        $.ajax({
            url: queryUrlForecast,
            method: 'GET',
        }).then(function (dataforecast) {
            printForecast(dataforecast);
            $('.displayed').removeClass('hidden');
        })
    });

    //render the current weather data to the corresponding html 
    function printCurrentW(data) {
        //display the city name
        $('#city').text(data.name).val(data.name);
        //check if the city already exists in history search
        let found = false;
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name == data.name) {
                found = true;
                break;
            }
        }
        //if it doesnt, store it in local storage
        if (!found) {
            const city = {
                name: $('#city').val()
            }
            cities.push(city);
            //clear local
            localStorage.clear();
            //store in local
            store(cities);
        }
        //render 
        renderHistory();

        $('#today').text(today.format('ddd, MM/DD/YYYY'));
        $('#currTemp').text("Temperature: " + Math.floor(data.main.temp) + " F");
        $('#currHumid').text("Humidity: " + data.main.humidity + " %");
        $('#currWspeed').text("Wind Speed: " + data.wind.speed + " mph");
        let iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        $('#currIcon').attr('src', iconUrl);

        $('#history').on('click', '.direct', function () {
            sendCity($(this).val());
        }
        );
    }
}
//render the forecast
function printForecast(forecast) {
    let j = 0;
    const arr = forecast.list
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].dt_txt.includes('12:00:00')) {
            //set date
            $('#date' + j).text(dayjs(arr[i].dt_txt).format('MM/DD/YYYY'));
            //set temp
            $('#temp' + j).text("Temperature: " + Math.floor(arr[i].main.temp) + " F");
            //set humidity
            $('#humid' + j).text("Humidity: " + arr[i].main.humidity + " %");
            //set windspeed
            $('#wspeed' + j).text("Wind Speed: " + arr[i].wind.speed + " mph");
            //set weather icon
            let iconSrc = "http://openweathermap.org/img/wn/" + arr[i].weather[0].icon + "@2x.png";
            $('#icon' + j).attr('src', iconSrc);
            j++;
        }
    }

}
init();