import "./App.css";
import { Layout, Row, Col } from "antd";
import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { useState } from "react";

const { Header, Footer } = Layout;

function App() {
    const [displayCity, setDisplayCity] = useState();

    const onSearchHandler = (data) => {
        setDisplayCity(data);
    };

    return (
        <div className="App">
            <Layout id="mainLayout">
                <Header style={{ height: "15vh" }}>
                    <MyHeader onSearchHandler={onSearchHandler}></MyHeader>
                </Header>
                <Row
                    style={{
                        backgroundColor: "transparent",
                        marginTop: "40px",
                        marginBottom: "40px",
                    }}
                >
                    <Col sm={0} md={0} lg={4} style={{ height: "100vh" }}></Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <MainWrapper displayCity={displayCity}></MainWrapper>
                    </Col>
                    <Col sm={0} md={0} lg={4} style={{ height: "100vh" }}></Col>
                </Row>

                <Footer style={{ backgroundColor: "#001529" }}>footer</Footer>
            </Layout>
        </div>
    );
}

export default App;
