import { Card, Row, Col } from "antd";
import { toast } from "react-toastify";
import { dynamicClass } from "./CurrentConditionsDinamicBackgroundClass";
import ConditionsIcon from "../common/ConditionsIcon";
import WEATHER_CODES from "../../../constants/CardConstants/WEATHER_CODES";

import "../../../App.css";
import { useContext, useState } from "react";
import { UserContext } from "../../../UserContext";
import { CitiesContext } from "../../../CitiesContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

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
            await setDoc(doc(db, "users", user.user.uid), {
                favCity: displayCity.city,
            });
            notify(displayCity.city, "added");
        }
    };

    const removeFavourite = async (isFavouriteValue) => {
        if (isFavouriteValue) {
            setIsFavouriteValue(false);
            await setDoc(doc(db, "users", user.user.uid), {
                favCity: "",
            });
            notify(displayCity.city, "removed");
        }
    };

    const notify = (city, action) =>
        toast(`${city} was ${action} as your favorite city!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "light",
        });

    return (
        <Card
            bordered={false}
            className={dynamicClass(
                currentConditions?.current_weather.weathercode
            )}
        >
            <h2
                style={{
                    marginTop: "-35px",
                    marginLeft: "-35px",
                    marginRight: "-35px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "30px",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "10px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                }}
            >
                <span>
                    {displayCity?.city} at {time} pm
                </span>
                {user ? (
                    isFavouriteValue ? (
                        <button
                            className="favorite-icon"
                            style={{
                                backgroundColor: "transparent",
                                border: "0px",
                                width: "40px",
                                right: "5px",
                                top: "0px",
                                position: "absolute",
                            }}
                            onClick={removeFavourite}
                        >
                            <img src="../icons/favouriteIcon/remove-bookmark-icon.svg"></img>
                        </button>
                    ) : (
                        <button
                            className="favorite-icon"
                            style={{
                                backgroundColor: "transparent",
                                border: "0px",
                                width: "40px",
                                right: "5px",
                                top: "0px",
                                position: "absolute",
                            }}
                            onClick={addFavourite}
                        >
                            <img src="../icons/favouriteIcon/add-bookmark-icon.svg"></img>
                        </button>
                    )
                ) : null}
            </h2>

            <Row gutter={16}>
                <Col span={24}>
                    <div style={{ color: "white", paddingTop: "0px" }}>
                        <span
                            style={{
                                fontSize: 92,
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            {currentConditions.current_weather?.temperature}°
                        </span>
                        <span style={{ float: "right" }}>
                            <ConditionsIcon
                                data={
                                    currentConditions.current_weather
                                        ?.weathercode
                                }
                            />
                        </span>
                        <div style={{ fontWeight: "bold", fontSize: 24 }}>
                            {weatherConditions?.description}
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default CurrentConditionsCard;
