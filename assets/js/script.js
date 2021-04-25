var searchHistory = []
var cityName = "";
var currentInfoContainerEl = document.getElementById("currentInfo")
var recentSearchContainerEl = document.getElementById('cityStorage')

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
        
        cityName = data.name
        recentSearchHistory(searchInput)
        
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
        displayCurrentInfo()
    })
    .catch(function(error) {
        alert(error)
    })


}

function displayCurrentInfo() {
    var cityDisplay = document.createElement('h2')
    cityDisplay.innerText = cityName

    currentInfoContainerEl.appendChild(cityDisplay)
    
}

function capitalize(letter) {
    if (typeof letter !== 'string') return ''
    return letter.charAt(0).toUpperCase() + letter.slice(1)
}


function recentSearchHistory(input) {

    if (searchHistory.length === 5) {
        searchHistory.pop()
        searchHistory.unshift(input)
    } else {
        searchHistory.unshift(input);
    }

    for (var i = 0; i < searchHistory.length; i++) {
        localStorage.setItem('City ' + i, capitalize(searchHistory[i]))
    }

    createButtons(input);
}

function createButtons(input) {
    var recentSearchButton = document.createElement('button')
    recentSearchButton.classList = "col-12 btn-secondary"
    recentSearchButton.innerText = capitalize(input);


    recentSearchContainerEl.appendChild(recentSearchButton)
}


function getSearchHistory() {
    for (var i = 0; i < 5; i++) {
        var itemKey = localStorage.getItem('City ' + i)

        if (typeof itemKey === String) {
            createButtons(itemKey)
        } else {
            return
        }
    }
}

getSearchHistory()
console.log(searchHistory)
