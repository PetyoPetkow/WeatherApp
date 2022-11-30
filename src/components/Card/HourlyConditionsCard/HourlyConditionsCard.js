import { Card, Space } from "antd";
import { useEffect, useState } from "react";

import HourlyConditionsListItem from "./HourlyConditionsListItem";
import { useHorizontalScroll } from "../common/useHorizontalScroll";
import { getValuesFromArrayForTheNextTwentyFourHours } from "./getValuesFromArrayForTheNextTwentyFourHours";

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
