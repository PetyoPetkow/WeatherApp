import { Layout, Card, Row, Col } from "antd";
import "../../App.css";

const DailyConditionsCard = () => {
  return (
    //TODO: Map each hour to a card
    <div className="site-card-wrapper">
      <h2>Hourly forecast</h2>
      <Row gutter={16}>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DailyConditionsCard;
