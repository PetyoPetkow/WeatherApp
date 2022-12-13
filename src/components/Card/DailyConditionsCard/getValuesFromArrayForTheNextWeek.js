import { WEEKDAY } from "../../../constants/CardConstants/WEEKDAY";

export const getValuesFromArrayForTheNextWeek = (arr) => {
    let data = [];

    let dailyData = arr?.dailyConditions.daily;

    let date = new Date();
    for (var index = 0; index < 7; index++) {
        date.setDate(date.getDate() + 1);
        let dateToday = date.getMonth() + "-" + date.getDate();
        data.push({
            time: index == 0 ? "Today" : WEEKDAY[date.getDay()] + " " + dateToday,
            weathercode: dailyData?.weathercode[index],
            temperatureMin: dailyData?.temperature_2m_min[index] + arr?.dailyConditions?.daily_units.temperature_2m_min,
            temperatureMax:
                dailyData?.temperature_2m_max[index] + arr?.dailyConditions?.daily_units?.temperature_2m_max, //izmisli neshto za tuka che ne moje da se gleda
            precipitation:
                dailyData?.precipitation_sum[index] <= 10 ? dailyData?.precipitation_sum[index] * 10 + "%" : "100%",
        });
    }

    return data;
};
