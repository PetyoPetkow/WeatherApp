import { useState, useEffect } from "react";
import { Space, Card } from "antd";

import SingleDayListItem from "./SingleDayListItem";
import { useHorizontalScroll } from "../common/useHorizontalScroll";
import { getValuesFromArrayForTheNextWeek } from "./getValuesFromArrayForTheNextWeek";

import "../../../App.css";

const DailyConditionsCard = (dailyConditions) => {
    const [displayData, setDisplayData] = useState([]);

    const scrollRef = useHorizontalScroll();

    useEffect(() => {
        setDisplayData(getValuesFromArrayForTheNextWeek(dailyConditions));
    }, [dailyConditions]);

    return (
        //TODO: Map each hour to a card
        <>
            <h2>Daily forecast</h2>
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
                        {displayData.map((singleDayData) => {
                            return SingleDayListItem(singleDayData);
                        })}
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default DailyConditionsCard;
