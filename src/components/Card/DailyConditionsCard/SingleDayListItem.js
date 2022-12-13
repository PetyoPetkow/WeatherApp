import ConditionsIcon from "../common/ConditionsIcon";
import style from "./DailyConditions.module.css";

const SingleDayListItem = (data) => {
    return (
        <div key={data.time}>
            <h6>{data.time}</h6>
            <div className={style.singleItemTempRange}>
                {data.temperatureMin}/{data.temperatureMax}
            </div>
            <ConditionsIcon data={data?.weathercode} size={80} />

            <div>
                <img width={25} src="../icons/raindrop-1580.svg"></img> {data.precipitation}
            </div>
        </div>
    );
};

export default SingleDayListItem;
