const CurrentConditionsIcon = ({ data, size }) => {
    var src = "";

    if (data == 0) {
        src = "../../../icons/weatherIcons/sun-color-icon.svg";
    } else if (data <= 2) {
        src = "../../../icons/weatherIcons/120px-Antu_weather-clouds.svg.png";
    } else if (data <= 48) {
        src =
            "../../../icons/weatherIcons/120px-Antu_weather-many-clouds.svg.png";
    } else if (data <= 67) {
        src =
            "../../../icons/weatherIcons/Antu_weather-showers-scattered.svg.png";
    } else if (data <= 77) {
        src =
            "../../../icons/weatherIcons/120px-Antu_weather-snow-scattered.svg.png";
    } else if (data <= 82) {
        src =
            "../../../icons/weatherIcons/Antu_weather-showers-scattered.svg.png";
    } else if (data <= 86) {
        src =
            "../../../icons/weatherIcons/120px-Antu_weather-snow-scattered.svg.png";
    } else if (data <= 99) {
        src =
            "../../../icons/weatherIcons/120px-Antu_weather-storm-day.svg.png";
    }
    // switch (data) {
    //     case 0:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 2:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 48:
    //         console.log("logg");
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 67:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 77:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 82:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 86:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     case data <= 99:
    //         src = "../../../icons/120px-Antu_weather-clouds.svg.png";
    //         break;
    //     default:
    //         {
    //             console.log(data, src);
    //         }
    //         break;
    // }
    return (
        <>
            <img width={size} src={src}></img>
        </>
    );
};

export default CurrentConditionsIcon;
