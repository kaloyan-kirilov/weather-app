function setViewport() {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let viewport = document.querySelector('meta[name=viewport]');

    viewport.setAttribute('content', 'width=' + viewportWidth + 'px, height=' + viewportHeight + "px, initial-scale=1.0");
}

window.onload = setViewport();

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let weather = {
    getWeather: function(city) {
        const weatherString = resolveString('bf76' + 'bd1b' + '8332' + 'bcf2' + '7cc5' + 'ab8f' + '5ec1' + '2bc7');

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherString)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { lon, lat } = data.coord;
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp } = data.main;

        let celsius = temp - 273.15;
        let fahrenheit = celsius * 9/5 + 32;

        document.querySelector('#location p').innerText = name + ', ' + country;
        document.getElementById('icon').style.backgroundImage = `url('img/icons/${icon}.png')`;
        document.getElementById('description').style.textTransform = 'uppercase';
        document.getElementById('description').innerText = description;
        document.getElementById('celsius').innerText = Math.floor(celsius) + '°C';
        document.getElementById('fahrenheit').innerText = Math.floor(fahrenheit) + '°F';

        function getDateTime() {
            const timeString = resolveString('fd46' + '4b80' + '5330' + 'e31a' + 'db04' + 'a3b7' + 'c477' + 'ad57');

            fetch('https://api.ipgeolocation.io/timezone?apiKey=' + timeString + '&lat=' + lat + '&long=' + lon)
            .then((response) => response.json())
            .then((data) => setDateTime(data));

            function setDateTime(data) {
                const { time_24 } = data;
                const { time_12 } = data;
                const { date } = data;

                document.getElementById('time').innerText = time_24.slice(0, -3) + ' / ' + time_12.slice(0, -6) + time_12.slice(-3);
                document.getElementById('date').innerText = date;
            }
        }

        getDateTime();
    },

    search: function() {
        this.getWeather(searchInput.value);
    }
}

searchInput.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        weather.search();          
    }
});

searchButton.addEventListener('click', function() {
    weather.search();
});

function resolveString(string) {
    const stringArray = string.split('');
    const arrangeArray = stringArray.reverse();
    const resultString = arrangeArray.join('');
    return resultString;
}