var weatherData = "";

$('#submitSearch').on('click', function(event) {
    event.preventDefault();
    var searchInputEl = $("#citySearch")
    var searchInput = $(searchInputEl).val().trim()
    
    coordinateFinder(searchInput)
   
    $(searchInputEl).val('')
    
});

function coordinateFinder(searchInput) {
    var searchTest = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=92e0836afaeb6b857056f92c8fdb93c7";

    fetch (searchTest)
    .then(function(response) {
        if (response.ok) {
            return response.json()
        } else {
            alert("Something went wrong")
        }
    })
    .then(function(data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        
        weatherCall(lat, lon);
    })
    .catch(function(error) {
        alert(error)
    })
}

function weatherCall(lat, lon) {
    oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=92e0836afaeb6b857056f92c8fdb93c7"
    fetch(oneCallUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json()
        } else {
            alert("Something went wrong")
        }
    })
    .then(function(data) {
        console.log(data)
        weatherData = data;
    })
    .catch(function(error) {
        alert(error)
    })
}

function displayCurrentInfo(info) {
    $('h2')
    .text(searchInput)
    
}





