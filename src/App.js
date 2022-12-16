import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

import { db, auth } from "./config/firebase";
import MainWrapper from "./components/Main/MainWrapper";
import MyHeader from "./components/Header/MyHeader";
import { RegisterFrom } from "./authentication/register/RegisterForm";
import { LoginForm } from "./authentication/login/LoginForm";
import { ResetPassword } from "./authentication/ResetPassword/ResetPassword";
import { UserContext } from "./UserContext";
import { CitiesContext } from "./CitiesContext";
import { INITIAL_DISPLAY_CITY } from "./constants/CardConstants/INITIAL_DISPLAY_CITY";

import "react-toastify/dist/ReactToastify.css";
import style from "./App.module.css";
import "./App.css";

const { Header, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [favoriteCity, setFavoriteCity] = useState();
    const [displayCity, setDisplayCity] = useState(INITIAL_DISPLAY_CITY);
    const [isFavourite, setIsFavourite] = useState(false);

    const onSearchHandler = (data) => {
        setDisplayCity({
            city: data?.label,
            longitude: data?.value.split(" ")[0],
            latitude: data?.value.split(" ")[1],
        });
    };

    //get user's favorite city and add it to favoriteCity and DisplayCity states
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

    //set current user to the one saved in local storage
    useEffect(() => {
        var storedUser = JSON.parse(localStorage.getItem("authUser"));
        if (storedUser) setUser({ email: storedUser.email, displayName: storedUser.displayName, uid: storedUser.uid });
    }, []);

    //on authentication save the user to local storage
    auth.onAuthStateChanged(() => {
        if (user) {
            localStorage.setItem("authUser", JSON.stringify(user));
        } else {
            localStorage.clear();
        }
    });

    //on logged user get favourite city, on logged out set display city to the initial state
    useEffect(() => {
        if (user) {
            getFavouriteCity();
        } else {
            setDisplayCity(INITIAL_DISPLAY_CITY);
        }
    }, [user]);

    //check if the display city is the same as the user's favourite and change the state of isFavourite
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
