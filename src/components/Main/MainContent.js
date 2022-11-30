import { useEffect, useState } from "react";

import CurrentConditionsCard from "../Card/CurrentConditionsCard/CurrentConditionsCard";
import DetailedConditionsCard from "../Card/DetailedConditionsCard/DetailedConditionsCard";
import HourlyConditionsCard from "../Card/HourlyConditionsCard/HourlyConditionsCard";
import DailyConditionsCard from "../Card/DailyConditionsCard";
import { getAll, getOneBySearch } from "../../services/cardService";

const MainContent = ({ displayCity }) => {
    const [currentConditions, setCurrentConditions] = useState({});

    useEffect(() => {
        getAll().then((res) => setCurrentConditions(res.data));
    }, []);

    useEffect(() => {
        if (displayCity) {
            getOneBySearch(displayCity).then((res) =>
                setCurrentConditions(res.data)
            );
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
                    <DailyConditionsCard></DailyConditionsCard>
                </>
            )}
        </>
    );
};

export default MainContent;
