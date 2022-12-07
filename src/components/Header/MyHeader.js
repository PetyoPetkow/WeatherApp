import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

import { UserContext } from "../../UserContext";
import SearchBar from "../SerachBar/SearchBar";
import { signOut, getAuth } from "firebase/auth";
import { CitiesContext } from "../../CitiesContext";
import { Row, Col } from "antd";

import style from "./MyHeader.module.css";

const MyHeader = ({ onSearchHandler }) => {
    const auth = getAuth();
    const { user, setUser } = useContext(UserContext);
    const { location } = useContext(CitiesContext);
    const [locationValue, setLocationValue] = location;
    return (
        <Row align="bottom" className={style.headerContent}>
            <Col lg={{ span: 24, offset: 1 }} xl={{ span: 6, offset: 2 }}>
                <NavLink to={"/"} className={style.logo}>
                    WeatherApp
                </NavLink>
            </Col>
            <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                <SearchBar onSearchHandler={onSearchHandler}></SearchBar>{" "}
            </Col>
            <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                <div>
                    {user ? (
                        <Space size={20}>
                            <div className={style.greetingBox}>
                                Hello, {user.user.displayName}
                            </div>
                            <Button
                                onClick={() =>
                                    signOut(auth).then(
                                        setUser(null),
                                        setLocationValue("Veliko Tarnovo")
                                    )
                                }
                                type="default"
                                ghost
                            >
                                logout
                            </Button>
                        </Space>
                    ) : (
                        <Space size={20}>
                            <Button type="default" ghost>
                                <NavLink to={"/login"}>login</NavLink>
                            </Button>
                            <Button type="default" ghost>
                                <NavLink to={"/register"}>register</NavLink>
                            </Button>
                        </Space>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default MyHeader;
