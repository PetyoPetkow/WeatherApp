import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { useMemo, useState } from "react";
import { UserContext } from "./UserContext";
import { RegisterFrom } from "./authentication/RegisterForm";
import { LoginFrom } from "./authentication/LoginForm";

const { Header, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [displayCity, setDisplayCity] = useState();

    const onSearchHandler = (data) => {
        setDisplayCity(data);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
                        <Col
                            sm={0}
                            md={0}
                            lg={4}
                            style={{ height: "100vh" }}
                        ></Col>
                        <Col xs={24} sm={24} md={24} lg={16}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <MainWrapper
                                            displayCity={displayCity}
                                        ></MainWrapper>
                                    }
                                ></Route>
                                <Route
                                    path="/register"
                                    element={<RegisterFrom />}
                                ></Route>
                                <Route
                                    path="/login"
                                    element={<LoginFrom />}
                                ></Route>
                            </Routes>
                        </Col>
                        <Col
                            sm={0}
                            md={0}
                            lg={4}
                            style={{ height: "100vh" }}
                        ></Col>
                    </Row>

                    <Footer style={{ backgroundColor: "#001529" }}>
                        footer
                    </Footer>
                </Layout>
            </div>
        </UserContext.Provider>
    );
}

export default App;
