import Axios from "axios";

const getFormatedDate = (date) => {
    if (date == undefined) {
        date = new Date();
    }
    let fullDate;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    fullDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

    return fullDate;
};

const getFormatedEndDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 6);
    return getFormatedDate(date);
};

const initialURL = `https://api.open-meteo.com/v1/forecast?latitude=43.08&longitude=25.60&hourly=precipitation,temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,surface_pressure,visibility,windspeed_10m&current_weather=true`;

const patternURL = (latitude, longitude) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation,temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,surface_pressure,visibility,windspeed_10m&current_weather=true`;
};

const dailyURL = (start_date, end_date) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=43.08&longitude=25.60&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&start_date=${start_date}&end_date=${end_date}&timezone=EET`;
};

const dailyPatternURL = (latitude, longitude, start_date, end_date) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&start_date=${start_date}&end_date=${end_date}&timezone=EET`;
};

export const getOneBySearch = (displayCity) => {
    return Axios.get(patternURL(displayCity.latitude, displayCity.longitude));
};

export const getDailyConditions = () => {
    return Axios.get(dailyURL(getFormatedDate(), getFormatedEndDate()));
};

export const getDailyConditionsBySearch = (displayCity) => {
    return Axios.get(
        dailyPatternURL(displayCity.latitude, displayCity.longitude, getFormatedDate(), getFormatedEndDate())
    );
};
