import { Fragment } from "react";
import ConditionsIcon from "../common/ConditionsIcon";
import style from "./HourlyConditions.module.css";
const HourlyConditionsListItem = (data) => {
    return (
        <Fragment key={data.time}>
            <div>
                <h6>{data.time}</h6>
                <div>{data.temperature}</div>
                <ConditionsIcon data={data?.weathercode} size={80} />

                <div>
                    <img width={25} src="../icons/raindrop-1580.svg"></img> {data.precipitation}
                </div>
            </div>
            {data.time != "11 pm" && <div className={style.divider}></div>}
        </Fragment>
    );
};

export default HourlyConditionsListItem;
