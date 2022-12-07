import { useEffect, useState } from "react";

import CurrentConditionsCard from "../Card/CurrentConditionsCard/CurrentConditionsCard";
import DetailedConditionsCard from "../Card/DetailedConditionsCard/DetailedConditionsCard";
import HourlyConditionsCard from "../Card/HourlyConditionsCard/HourlyConditionsCard";
import DailyConditionsCard from "../Card/DailyConditionsCard/DailyConditionsCard";
import {
    getAll,
    getOneBySearch,
    getDailyConditions,
    getDailyConditionsBySearch,
} from "../../services/cardService";

const MainContent = ({ displayCity, isFavourite }) => {
    const [currentConditions, setCurrentConditions] = useState({});
    const [dailyConditions, setDailyConditions] = useState({});

    useEffect(() => {
        getAll().then((res) => setCurrentConditions(res.data));
        getDailyConditions().then((res) => setDailyConditions(res.data));
    }, []);

    useEffect(() => {
        if (displayCity) {
            getOneBySearch(displayCity).then((res) =>
                setCurrentConditions(res.data)
            );
            getDailyConditionsBySearch(displayCity).then((res) => {
                setDailyConditions(res.data);
            });
        }
    }, [displayCity]);

    return (
        <>
            {Object.keys(currentConditions).length !== 0 && (
                <>
                    <CurrentConditionsCard
                        currentConditions={currentConditions}
                        displayCity={displayCity}
                    ></CurrentConditionsCard>
                    <DetailedConditionsCard
                        currentConditions={currentConditions}
                        displayCity={displayCity}
                    ></DetailedConditionsCard>
                    <HourlyConditionsCard
                        currentConditions={currentConditions}
                    ></HourlyConditionsCard>
                    <DailyConditionsCard
                        dailyConditions={dailyConditions}
                    ></DailyConditionsCard>
                </>
            )}
        </>
    );
};

export default MainContent;
