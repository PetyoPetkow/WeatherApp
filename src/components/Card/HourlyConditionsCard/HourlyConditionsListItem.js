import ConditionsIcon from "../common/ConditionsIcon";

const HourlyConditionsListItem = (data) => {
    return (
        <div
            key={data.time}
            style={{
                fontSize: "24px",
            }}
        >
            <h6 style={{ textAlign: "center" }}>{data.time}</h6>
            <div style={{ textAlign: "center" }}>{data.temperature}</div>
            <ConditionsIcon data={data.weathercode} size={80} />

            <div style={{ textAlign: "center" }}>
                <img width={25} src="../icons/raindrop-1580.svg"></img>{" "}
                {data.precipitation}
            </div>
        </div>
    );
};

export default HourlyConditionsListItem;
