var searchTest = "https://api.openweathermap.org/data/2.5/weather?q=draper&appid=92e0836afaeb6b857056f92c8fdb93c7"

function coordinateFinder() {

    fetch (searchTest)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        
        oneCall(lat, lon);
    })
}

function oneCall(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=92e0836afaeb6b857056f92c8fdb93c7")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}
