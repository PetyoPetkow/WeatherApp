export const dynamicClass = (data) => {
    var newClass;

    if (data == 0) {
        newClass = "clear";
    } else if (data <= 2) {
        newClass = "partially";
    } else if (data <= 48) {
        newClass = "cloudy";
    } else if (data <= 67) {
        newClass = "rainy";
    } else if (data <= 77) {
        newClass = "snowy";
    } else if (data <= 82) {
        newClass = "rainy";
    } else if (data <= 86) {
        newClass = "snowy";
    } else if (data <= 99) {
        newClass = "thunderstorm";
    }

    return "site-card-wrapper " + newClass;
};
