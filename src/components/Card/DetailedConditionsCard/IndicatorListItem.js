import { Col } from "antd";
import style from "./DetailedConditions.module.css";

export const IndicatorListItem = ({ iconSrc, title, value, units }) => {
    return (
        <Col key={title} span={12} className={style.indicatorCol}>
            <img src={iconSrc} width="30px" alt="icon" className={style.indicatorImg}></img>
            <span className={style.indicatorTitle}>{title}</span>

            <span className={style.indicatorValue}>{` ${value} ${units}`}</span>
        </Col>
    );
};
