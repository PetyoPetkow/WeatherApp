import { useContext } from "react";
import { Card, Row, Col } from "antd";
import { doc, updateDoc, deleteDoc, deleteField } from "firebase/firestore";

import { UserContext } from "../../../UserContext";
import { CitiesContext } from "../../../CitiesContext";
import { db } from "../../../config/firebase";
import ConditionsIcon from "../common/ConditionsIcon";
import { notify } from "./favoriteCityTostNotification";
import { dynamicClass } from "./CurrentConditionsDinamicBackgroundClass";
import WEATHER_CODES_DICTIONARY from "../../../constants/CardConstants/WEATHER_CODES_DICTIONARY";

import style from "./CurrentConditions.module.css";

const CurrentConditionsCard = ({ currentConditions, displayCity }) => {
    const { user, setUser } = useContext(UserContext);
    const { isFavourite } = useContext(CitiesContext);
    const [isFavouriteValue, setIsFavouriteValue] = isFavourite;

    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();

    //translate weather code to brief summary ofthe weather
    const weatherConditions = WEATHER_CODES_DICTIONARY.find((obj) => {
        return obj.code === currentConditions.current_weather?.weathercode;
    });

    const addFavourite = async () => {
        if (!isFavouriteValue) {
            setIsFavouriteValue(true);
            await updateDoc(doc(db, "users", user.uid), {
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
            await updateDoc(doc(db, "users", user.uid), {
                favCity: deleteField(),
                longitude: deleteField(),
                latitude: deleteField(),
            });
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
