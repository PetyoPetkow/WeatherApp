import { useContext } from "react";
import { Card, Row, Col } from "antd";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import WEATHER_CODES from "../../../constants/CardConstants/WEATHER_CODES";
import { UserContext } from "../../../UserContext";
import { CitiesContext } from "../../../CitiesContext";
import { db } from "../../../config/firebase";
import ConditionsIcon from "../common/ConditionsIcon";
import { notify } from "./favoriteCityTostNotification";
import { dynamicClass } from "./CurrentConditionsDinamicBackgroundClass";

import style from "./CurrentConditions.module.css";

const CurrentConditionsCard = ({ currentConditions, displayCity }) => {
    const { user, setUser } = useContext(UserContext);
    const { isFavourite } = useContext(CitiesContext);
    const [isFavouriteValue, setIsFavouriteValue] = isFavourite;

    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();

    const weatherConditions = WEATHER_CODES.find((obj) => {
        return obj.code === currentConditions.current_weather?.weathercode;
    });

    const addFavourite = async () => {
        if (!isFavouriteValue) {
            setIsFavouriteValue(true);
            await setDoc(doc(db, "users", user.uid), {
                favCity: displayCity.city,
                longitude: displayCity.longitude,
                latitude: displayCity.latitude,
            });
            notify(displayCity.city, "added");
        }
    };

    const removeFavourite = async (isFavouriteValue) => {
        if (isFavouriteValue) {
            setIsFavouriteValue(false);
            await deleteDoc(doc(db, "users", user.uid));
            notify(displayCity.city, "removed");
        }
    };

    return (
        <Card bordered={false} className={dynamicClass(currentConditions?.current_weather.weathercode)}>
            <h2 className={style.currentConditionsCardHeading}>
                <span>
                    {displayCity?.city} at {time} pm
                </span>
                {user ? (
                    isFavouriteValue ? (
                        <button className={style.favoriteIcon} onClick={removeFavourite}>
                            <img src="../icons/favouriteIcon/remove-bookmark-icon.svg"></img>
                        </button>
                    ) : (
                        <button className={style.favoriteIcon} onClick={addFavourite}>
                            <img src="../icons/favouriteIcon/add-bookmark-icon.svg"></img>
                        </button>
                    )
                ) : null}
            </h2>

            <Row gutter={16}>
                <Col span={24}>
                    <div>
                        <span className={style.currentConditionsTemperature}>
                            {currentConditions.current_weather?.temperature}°
                        </span>
                        <span className={style.currentConditionsIcon}>
                            <ConditionsIcon data={currentConditions.current_weather?.weathercode} />
                        </span>
                        <div className={style.currentConditionsSummary}>{weatherConditions?.description}</div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default CurrentConditionsCard;
