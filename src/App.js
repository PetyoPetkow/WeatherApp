import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { Route, Routes } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { RegisterFrom } from "./authentication/register/RegisterForm";
import { LoginFrom } from "./authentication/login/LoginForm";
import { UserContext } from "./UserContext";
import { CitiesContext } from "./CitiesContext";
import { db } from "./config/firebase";

import "react-toastify/dist/ReactToastify.css";
import style from "./App.module.css";
import "./App.css";
const { Header, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [displayCity, setDisplayCity] = useState({
        city: "Varna",
        latitude: "43.211375",
        longitude: "27.91108",
    });
    const [location, setLocation] = useState();
    const [favoriteCity, setFavoriteCity] = useState();
    const [isFavourite, setIsFavourite] = useState(false);

    const onSearchHandler = (data) => {
        console.log(data, "is data");

        setDisplayCity({
            city: data?.label,
            longitude: data?.value.split(" ")[0],
            latitude: data?.value.split(" ")[1],
        });
    };

    const getFavouriteCity = async () => {
        const fav = await getDoc(doc(db, "users", user.user.uid));
        setFavoriteCity({
            city: fav.data().favCity,
            latitude: fav.data().latitude,
            longitude: fav.data().longitude,
        });
        setDisplayCity({
            city: fav.data().favCity,
            latitude: fav.data().latitude,
            longitude: fav.data().longitude,
        });
    };

    useEffect(() => {
        if (user) {
            getFavouriteCity();
            setLocation(favoriteCity);

            if (favoriteCity) setDisplayCity(favoriteCity);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            if (favoriteCity.city.toLowerCase() == displayCity.city.toLowerCase()) {
                setIsFavourite(true);
            } else {
                setIsFavourite(false);
            }
        }
    }, [displayCity]);

    useEffect(() => {
        setLocation(favoriteCity);
    }, [favoriteCity]);

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
                            <MyHeader onSearchHandler={onSearchHandler}></MyHeader>
                        </Header>

                        <Row className={style.appGridRow}>
                            <Col sm={0} md={0} lg={4} className={style.appGridSideCol}></Col>
                            <Col xs={24} sm={24} md={24} lg={16}>
                                <Routes>
                                    <Route path="/" element={<MainWrapper displayCity={displayCity} />}></Route>
                                    <Route path="/register" element={<RegisterFrom />}></Route>
                                    <Route path="/login" element={<LoginFrom />}></Route>
                                </Routes>
                            </Col>
                            <Col sm={0} md={0} lg={4} className={style.appGridSideCol}></Col>
                        </Row>

                        <Footer>footer</Footer>
                    </Layout>
                </div>
            </CitiesContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
