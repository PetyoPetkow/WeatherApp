import { Card, Row } from "antd";
import "../../../App.css";
import GetDetailedConditions from "./DetailedConditionsData";
import { IndicatorListItem } from "./IndicatorListItem";

const DetailedConditiionsCard = ({ currentConditions, displayCity }) => {
    let detailedConditions;

    detailedConditions = GetDetailedConditions(currentConditions);
    return (
        <Card
            title={`Weather details for ${displayCity?.city}`}
            style={{ backgroundColor: "#e6e6e6" }}
        >
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
