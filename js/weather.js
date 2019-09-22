const tempeDiscription = document.querySelector(".temperature-description");
const tempeDegree = document.querySelector(".temperature-degree");
const locationTimeZone = document.querySelector(".location-timezone");
const weatherIcon = document.querySelector(".icon");
const degreeSection = document.querySelector(".degree-section");
const typeTeperature = document.querySelector("#type-teperature");
const currentDay = document.querySelector(".current-day");
const currentDate = document.querySelector(".current-date");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weatherIconList = ["clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"];

class UI {
    setIcon(icon, iconID) {
        const skycons = new Skycons({
            color: "black"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log(icon)
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    setBackground(icon) {
        document.body.style.backgroundImage = "url('../images/" + icon + ".jpg')";

    }

    showUI(data) {

        const {
            temperature,
            summary,
            icon
        } = data.currently;

        const dailySummary = data.daily.summary;

        let day = new Date();

        let today = day.getFullYear() + '-' + (day.getMonth() + 1) + "-" + day.getDate();

        let temperatureInC;
        let timeZone = data.timezone.replace("/", " - ");
        timeZone = timeZone.replace(/_/g, " ");

        currentDay.textContent = weekday[day.getDay()];
        temperatureInC = Math.floor((temperature - 32) / 1.8);
        tempeDegree.textContent = temperatureInC;
        tempeDiscription.textContent = summary;
        locationTimeZone.textContent = timeZone;
        currentDate.textContent = today;

        degreeSection.addEventListener('click', event => {
            if (typeTeperature.textContent === 'C') {
                typeTeperature.textContent = 'F';
                tempeDegree.textContent = temperature;
            } else {
                typeTeperature.textContent = 'C';
                tempeDegree.textContent = temperatureInC;
            }
        })


        this.setIcon(icon, weatherIcon);
        this.setBackground(icon);
    }

    async getAPI(position) {
        let long, lat;

        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/f220a03da5d612681fdfc1efc311c15c/${lat},${long}`;

        try {
            const response = await fetch(api);
            const data = await response.json();

            Storage.saveData(data);
        } catch (e) {
            console.log(e);
        }
    }
}

class Storage {
    static saveData(data) {
        localStorage.setItem("weather", JSON.stringify(data));
    }

    static getAllData() {
        const data = JSON.parse(localStorage.getItem("weather"));

        return data;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ui.getAPI);
        ui.showUI(Storage.getAllData());
    }


});