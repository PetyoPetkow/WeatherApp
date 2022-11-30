import { Col } from "antd";

export const IndicatorListItem = ({ iconSrc, title, value, units }) => {
    return (
        <Col
            key={title}
            span={12}
            style={{
                fontWeight: "bold",
                fontSize: "20px",
                height: "100%",
                alignItems: "middle",
                padding: "10px",
            }}
        >
            <img
                src={iconSrc}
                width="30px"
                alt="icon"
                style={{ marginLeft: "10px" }}
            ></img>
            <span
                style={{
                    marginLeft: "10px",
                    display: "inline-block",
                    verticalАlign: "middle",
                }}
            >
                {title}
            </span>

            <span style={{ float: "right" }}>{` ${value} ${units}`}</span>
        </Col>
    );
};
