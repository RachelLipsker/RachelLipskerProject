const cityName = document.getElementById('cityName');
const cityCountry = document.getElementById('cityCountry');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feelsLike');
const day = document.getElementById('day');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const clouds = document.getElementById('clouds');
const windSpeed = document.getElementById('windSpeed');
const windDeg = document.getElementById('windDeg');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const circleContainerHumidity = document.querySelector('.circle-container');
const circleContainerClouds = document.querySelector('.circle-container2');



function cloudness(deg) {
    if ((deg >= 355 && deg <= 360) || (deg >= 0 && deg <= 5)) {
        return "רוח צפונית"
    } else if (deg <= 85) {
        return "רוח צפונית מזרחית"
    } else if (deg <= 95) {
        return "רוח מזרחית"
    } else if (deg <= 175) {
        return "רוח דרומית מזרחית"
    } else if (deg <= 185) {
        return "רוח דרומית"
    } else if (deg <= 265) {
        return "רוח דרומית מערבית"
    } else if (deg <= 275) {
        return "רוח מערבית"
    } else if (deg < 355) {
        return "רוח צפונית מערבית"
    } else {
        return "כיוון הרוח אינו מובהק"
    }
}

async function getWeather(city) {
    try {
        let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c9bc69de54ee583eefdc48fe45398934&units=metric&lang=he");
        let data = await response.json();

        let country = data.sys.country;
        if (country == "IL" || country == "PS") {
            country = "ישראל"
        }
        cityCountry.innerText = city + ", " + country;
        icon.src = "./images/" + data.weather[0].icon + ".png";
        icon.alt = data.weather[0].description;
        temp.innerHTML = Math.round(data.main.temp) + "&#176;";
        feelsLike.innerHTML = "מרגיש כמו " + Math.round(data.main.feels_like) + "&#176;";
        humidity.innerText = data.main.humidity + "%";
        circleContainerHumidity.style.background = `conic-gradient(#00F8EF 0deg ${data.main.humidity * 3.6}deg,   #002C5F ${data.main.humidity * 3.6}deg 360deg)`;
        visibility.innerText = data.visibility + " מ'";
        clouds.innerText = data.clouds.all + "%";
        circleContainerClouds.style.background = `conic-gradient(#00F8EF 0deg ${data.clouds.all * 3.6}deg,   #002C5F ${data.clouds.all * 3.6}deg 360deg)`;
        windSpeed.innerText = "מהירות: " + data.wind.speed + " מ'\/ש'";
        windDeg.innerText = cloudness(data.wind.deg);

        let sunRise = new Date(data.sys.sunrise * 1000);
        let sunriseHr = sunRise.getHours();
        if (sunriseHr < 10) {
            sunriseHr = "0" + sunriseHr;
        }
        let sunriseMn = sunRise.getMinutes();
        if (sunriseMn < 10) {
            sunriseMn = "0" + sunriseMn;
        }
        sunrise.innerText = sunriseHr + ":" + sunriseMn;

        let sunSet = new Date(data.sys.sunset * 1000);
        let sunsetHr = sunSet.getHours();
        if (sunsetHr < 10) {
            sunsetHr = "0" + sunsetHr;
        }
        let sunsetMn = sunSet.getMinutes();
        if (sunsetMn < 10) {
            sunsetMn = "0" + sunsetMn;
        }
        sunset.innerText = sunsetHr + ":" + sunriseMn;

    } catch (e) {
        console.log(e);
    }
}



function today() {
    let today = new Date();

    let days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת קודש"];
    day.innerHTML = days[today.getDay()];

    let updateDate = today.getDate();
    if (updateDate < 10) {
        updateDate = "0" + updateDate;
    }
    let updateMonth = today.getMonth() + 1;
    if (updateMonth < 10) {
        updateMonth = "0" + updateMonth;
    }
    date.innerText = updateDate + "." + updateMonth + "." + today.getFullYear();

    let hr = today.getHours();
    if (hr < 10) {
        hr = "0" + hr;
    }
    let mn = today.getMinutes();
    if (mn < 10) {
        mn = "0" + mn;
    }
    hour.innerText = hr + ":" + mn;
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (cityName.value != "") {
        getWeather(cityName.value)
    }
    localStorage.setItem("city", cityName.value);
    today();
    cityName.value = "";
})

let lastCity = localStorage.getItem("city") || "ירושלים";
getWeather(lastCity)
today();