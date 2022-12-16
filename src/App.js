import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { Navigate, redirect, Route, Routes } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { RegisterFrom } from "./authentication/register/RegisterForm";
import { LoginForm } from "./authentication/login/LoginForm";
import { UserContext } from "./UserContext";
import { CitiesContext } from "./CitiesContext";
import { db, auth } from "./config/firebase";
import { INITIAL_DISPLAY_CITY } from "./constants/CardConstants/INITIAL_DISPLAY_CITY";

import "react-toastify/dist/ReactToastify.css";
import style from "./App.module.css";
import "./App.css";
import { ResetPassword } from "./authentication/ResetPassword/ResetPassword";
const { Header, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState();
    const [favoriteCity, setFavoriteCity] = useState();
    const [isFavourite, setIsFavourite] = useState(false);
    const [displayCity, setDisplayCity] = useState(INITIAL_DISPLAY_CITY);

    const onSearchHandler = (data) => {
        setDisplayCity({
            city: data?.label,
            longitude: data?.value.split(" ")[0],
            latitude: data?.value.split(" ")[1],
        });
    };

    const getFavouriteCity = async () => {
        const fav = await getDoc(doc(db, "users", user.uid));

        if (fav.data()) {
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
        }
    };

    useEffect(() => {
        var storedUser = JSON.parse(localStorage.getItem("authUser"));
        if (storedUser) setUser({ email: storedUser.email, displayName: storedUser.displayName, uid: storedUser.uid });
        console.log(auth.currentUser);
    }, []);

    auth.onAuthStateChanged(function (user) {
        if (user) {
            localStorage.setItem("authUser", JSON.stringify(user));
        } else {
            localStorage.clear();
        }
    });

    useEffect(() => {
        if (user) {
            getFavouriteCity();
        } else {
            setDisplayCity(INITIAL_DISPLAY_CITY);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            if (favoriteCity?.city.toLowerCase() === displayCity?.city.toLowerCase()) {
                setIsFavourite(true);
            } else {
                setIsFavourite(false);
            }
        }
    }, [displayCity]);

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
                                    <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterFrom />} />
                                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginForm />} />
                                    <Route path="/resetPassword" element={<ResetPassword />}></Route>
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
