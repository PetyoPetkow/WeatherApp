import { Card, Space } from "antd";
import { useEffect, useState } from "react";

import { useHorizontalScroll } from "./useHorizontalScroll";
import HourlyConditionsListItem from "./HourlyConditionsListItem";

import "../../../App.css";

const HourlyConditionsCard = ({ currentConditions }) => {
    const [displayData, setDisplayData] = useState([]);
    const scrollRef = useHorizontalScroll();

    useEffect(() => {
        setDisplayData(
            getValuesFromArrayForTheNextTwentyFourHours(currentConditions)
        );
    }, [currentConditions]);

    return (
        <>
            <h2>Hourly forecast</h2>
            <Card
                ref={scrollRef}
                style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    whiteSpace: "nowrap",
                    backgroundColor: "#e6e6e6",
                }}
            >
                <div className="site-card-wrapper">
                    <Space size={40}>
                        {displayData.map((singleHourData) => {
                            return HourlyConditionsListItem(singleHourData);
                        })}
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default HourlyConditionsCard;

const getValuesFromArrayForTheNextTwentyFourHours = (arr) => {
    let data = [];
    const hourlyConditions = arr.hourly;
    for (var index = 0; index < 24; index++) {
        data.push({
            time:
                index < 12
                    ? index + " am"
                    : index == 12
                    ? index + " pm"
                    : index - 12 + " pm",

            weathercode: hourlyConditions.weathercode[index],
            temperature:
                hourlyConditions.temperature_2m[index] +
                arr.hourly_units.temperature_2m, //izmisli neshto za tuka che ne moje da se gleda
            precipitation:
                hourlyConditions.precipitation[index] <= 1
                    ? hourlyConditions.precipitation[index] * 100 +
                      "" +
                      arr.hourly_units.relativehumidity_2m
                    : 100 + "" + arr.hourly_units.relativehumidity_2m,
        });
    }

    return data;
};
