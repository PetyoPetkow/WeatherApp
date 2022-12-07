import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";
import { RegisterFrom } from "./authentication/register/RegisterForm";
import { LoginFrom } from "./authentication/login/LoginForm";
import { getDoc, doc, collection } from "firebase/firestore";
import { CitiesContext } from "./CitiesContext";
import { db } from "./config/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./App.module.css";
const { Header, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [displayCity, setDisplayCity] = useState();
    const [location, setLocation] = useState("Veliko Tarnovo");
    const [favo, setFavo] = useState();

    const [isFavourite, setIsFavourite] = useState(false);

    const onSearchHandler = (data) => {
        setDisplayCity(data);
    };

    const getFavouriteCity = async () => {
        const fav = await getDoc(doc(db, "users", user.user.uid));
        console.log(fav.data());
        setFavo(fav.data());
    };

    useEffect(() => {
        setFavo();
    }, []);

    useEffect(() => {
        console.log("user is " + user);
        if (user != null) {
            getFavouriteCity();
        } else {
            setFavo(null);
        }
    }, [user]);

    useEffect(() => {
        if (favo) {
            console.log(favo);
            setLocation(favo.favCity);
            console.log("location is set");
        }
    }, [favo]);

    useEffect(() => {
        if (favo && location.toLowerCase() == favo.favCity.toLowerCase()) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    }, [location]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <CitiesContext.Provider
                value={{
                    location: [location, setLocation],
                    isFavourite: [isFavourite, setIsFavourite],
                }}
            >
                <ToastContainer />
                <div className="App">
                    <Layout id="mainLayout">
                        <Header className={style.header}>
                            <MyHeader
                                onSearchHandler={onSearchHandler}
                            ></MyHeader>
                        </Header>
                        <Row className={style.appGridRow}>
                            <Col
                                sm={0}
                                md={0}
                                lg={4}
                                className={style.appGridSideCol}
                            ></Col>
                            <Col xs={24} sm={24} md={24} lg={16}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <MainWrapper
                                                displayCity={displayCity}
                                                isFavourite={favo}
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
                                className={style.appGridSideCol}
                            ></Col>
                        </Row>

                        <Footer>footer</Footer>
                    </Layout>
                </div>
            </CitiesContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
