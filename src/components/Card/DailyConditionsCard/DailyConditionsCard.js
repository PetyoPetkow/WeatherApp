import { useState, useEffect } from "react";
import { Space, Card } from "antd";

import SingleDayListItem from "./SingleDayListItem";
import { useHorizontalScroll } from "../common/useHorizontalScroll";
import { getValuesFromArrayForTheNextWeek } from "./getValuesFromArrayForTheNextWeek";

import style from "./DailyConditions.module.css";

const DailyConditionsCard = (dailyConditions) => {
    const [displayData, setDisplayData] = useState([]);

    const scrollRef = useHorizontalScroll();

    useEffect(() => {
        if (dailyConditions) {
            setDisplayData(getValuesFromArrayForTheNextWeek(dailyConditions));
        }
    }, [dailyConditions]);

    return (
        <>
            <h2>Daily forecast</h2>
            <Card ref={scrollRef} className={style.dailyConditionsCard}>
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
