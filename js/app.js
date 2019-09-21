const tempeDiscription = document.querySelector(".temperature-description");
const tempeDegree = document.querySelector(".temperature-degree");
const locationTimeZone = document.querySelector(".location-timezone");
const weatherIcon = document.querySelector(".icon");
const degreeSection = document.querySelector(".degree-section");
const typeTeperature = document.querySelector("#type-teperature");


class UI {
    setIcon(icon, iconID) {
        const skycons = new Skycons({
            color: "black"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    showUI(data) {
        console.log(data);

        const {
            temperature,
            summary,
            icon
        } = data.currently;

        const dailySummary = data.daily.summary;

        let temperatureInC;
        let timeZone = data.timezone.replace("/", " - ");
        timeZone = timeZone.replace(/_/g, " ");

        temperatureInC = Math.floor((temperature - 32) / 1.8);
        tempeDegree.textContent = temperatureInC;
        tempeDiscription.textContent = summary;
        locationTimeZone.textContent = timeZone;

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
    }

    async getAPI(position) {
        const ui = new UI();
        let long, lat;

        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/f220a03da5d612681fdfc1efc311c15c/${lat},${long}`;

        try {
            const response = await fetch(api);
            const data = await response.json();

            ui.showUI(data);
        } catch (e) {
            console.log(e);
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ui.getAPI);
    }


});