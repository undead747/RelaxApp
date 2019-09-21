const tempeDiscription = document.querySelector(".temperature-description");
const tempeDegree = document.querySelector('.temperature-degree');
const locationTimeZone = document.querySelector('.location-timezone');
const weatherIcon = document.querySelector('.icon');

class UI {

    setIcon(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    showUI(data) {
        const {
            temperature,
            summary,
            icon
        } = data.currently;

        const dailySummary = data.daily.summary;

        let temperatureInC;

        temperatureInC = Math.floor((temperature - 32) / 1.8);
        tempeDegree.textContent = temperatureInC;
        tempeDiscription.textContent = summary;
        locationTimeZone.textContent = data.timezone;

        this.setIcon(icon, weatherIcon);

    }


    async getAPI(position) {
        const ui = new UI();
        let long, lat;


        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
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


document.addEventListener('DOMContentLoaded', () => {
    let long, lat;
    const ui = new UI();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ui.getAPI);
    }
})