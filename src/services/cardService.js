import Axios from "axios";

const initialURL = `https://api.open-meteo.com/v1/forecast?latitude=43.08&longitude=25.60&hourly=precipitation,temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,surface_pressure,visibility,windspeed_10m&current_weather=true`;

const patternURL = (latitude, longitude) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation,temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,surface_pressure,visibility,windspeed_10m&current_weather=true`;
};

export const getAll = () => {
    return Axios.get(initialURL);
};

export const getOneBySearch = (displayCity) => {
    return Axios.get(patternURL(displayCity.latitude, displayCity.longitude));
};
