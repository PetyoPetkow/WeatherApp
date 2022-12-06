const GetDetailedConditions = (currentConditions) => {
    //Get time now in the format that the Api uses
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();

    let timeNow = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    }T${hours}:00`;

    //Get the index of time now in the Api array
    let index = -1;
    currentConditions.hourly.time.find((item, indexOfTimeNow) => {
        if (item === timeNow) {
            index = indexOfTimeNow;
        }
        return null;
    });
    const hourlyConditions = currentConditions.hourly;
    const hourlyUnits = currentConditions.hourly_units;

    //Return needed indicators by the index that matches to the time's index
    return [
        {
            iconSrc:
                "../../../icons/indicatorIcons/temperature-svgrepo-com.svg",
            title: "feelsLike",
            value: hourlyConditions.apparent_temperature[index],
            units: hourlyUnits.apparent_temperature,
        },
        {
            iconSrc:
                "../../../icons/indicatorIcons/dew-point-filled-svgrepo-com.svg",
            title: "dewpoint",
            value: hourlyConditions.dewpoint_2m[index],
            units: hourlyUnits.dewpoint_2m,
        },
        {
            iconSrc: "../../../icons/indicatorIcons/humidity-svgrepo-com.svg",
            title: "humidity",
            value: hourlyConditions.relativehumidity_2m[index],
            units: hourlyUnits.relativehumidity_2m,
        },
        {
            iconSrc: "../../../icons/indicatorIcons/barometer-svgrepo-com.svg",
            title: "pressure",
            value: hourlyConditions.surface_pressure[index],
            units: hourlyUnits.surface_pressure,
        },
        {
            iconSrc: "../../../icons/indicatorIcons/wind-svgrepo-com.svg",
            title: "windspeed",
            value: hourlyConditions.windspeed_10m[index],
            units: hourlyUnits.windspeed_10m,
        },
        {
            iconSrc:
                "../../../icons/indicatorIcons/eye-close-up-visibility-button-svgrepo-com.svg",
            title: "visibility",
            value: hourlyConditions.visibility[index],
            units: hourlyUnits.visibility,
        },
    ];
};

export default GetDetailedConditions;
