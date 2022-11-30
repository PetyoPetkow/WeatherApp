import { Card, Row, Col } from "antd";

import { dynamicClass } from "./CurrentConditionsDinamicBackgroundClass";
import ConditionsIcon from "../common/ConditionsIcon";
import WEATHER_CODES from "../../../constants/CardConstants/WEATHER_CODES";

import "../../../App.css";

const CurrentConditionsCard = ({ currentConditions, displayCity }) => {
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();

    const weatherConditions = WEATHER_CODES.find((obj) => {
        return obj.code === currentConditions.current_weather?.weathercode;
    });

    return (
        <Card
            bordered={false}
            className={dynamicClass(
                currentConditions.current_weather.weathercode
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
                {displayCity.city} at {time} pm
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
