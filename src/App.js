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
  const [displayCity, setDisplayCity] = useState();
  const [location, setLocation] = useState("Veliko Tarnovo");

  const [isFavourite, setIsFavourite] = useState(false);

  const onSearchHandler = (data) => {
    setDisplayCity(data);
  };

  const getFavouriteCity = async () => {
    const fav = await getDoc(doc(db, "users", user.user.uid));
    console.log(fav.data());
    setLocation(fav.data().favCity);
  };

  useEffect(() => {
    console.log("user is " + user);
    if (user) {
      getFavouriteCity();
    }
  }, [user]);

  useEffect(() => {
    if (location && location.toLowerCase() == location.toLowerCase()) {
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
              <MyHeader onSearchHandler={onSearchHandler}></MyHeader>
            </Header>

            <Row className={style.appGridRow}>
              <Col sm={0} md={0} lg={4} className={style.appGridSideCol}></Col>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Routes>
                  <Route
                    path="/"
                    element={<MainWrapper displayCity={displayCity} />}
                  ></Route>
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
