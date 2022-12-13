import { Card, Row } from "antd";
import style from "./DetailedConditions.module.css";
import GetDetailedConditions from "./DetailedConditionsData";
import { IndicatorListItem } from "./IndicatorListItem";

const DetailedConditiionsCard = ({ currentConditions, displayCity }) => {
    let detailedConditions;

    detailedConditions = GetDetailedConditions(currentConditions);
    return (
        <Card title={`Weather details for ${displayCity?.city}`} className={style.detailedConditionsCard}>
            <div className="site-card-wrapper">
                <Row>
                    {detailedConditions.map((indicator) => {
                        return IndicatorListItem(indicator);
                    })}
                </Row>
            </div>
        </Card>
    );
};

export default DetailedConditiionsCard;
