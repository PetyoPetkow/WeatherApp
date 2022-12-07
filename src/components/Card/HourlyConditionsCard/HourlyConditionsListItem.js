import ConditionsIcon from "../common/ConditionsIcon";

const HourlyConditionsListItem = (data) => {
    return (
        <div key={data.time}>
            <h6>{data.time}</h6>
            <div>{data.temperature}</div>
            <ConditionsIcon data={data.weathercode} size={80} />

            <div>
                <img width={25} src="../icons/raindrop-1580.svg"></img>{" "}
                {data.precipitation}
            </div>
        </div>
    );
};

export default HourlyConditionsListItem;
