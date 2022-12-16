import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

import { UserContext } from "../../UserContext";
import { signOut, getAuth } from "firebase/auth";
import { Row, Col } from "antd";

import style from "./MyHeader.module.css";
import Search from "../SerachBar/Search";

const MyHeader = ({ onSearchHandler }) => {
    const auth = getAuth();
    const { user, setUser } = useContext(UserContext);
    let location = useLocation();

    return (
        <Row align="bottom" className={style.headerContent}>
            <Col lg={{ span: 24, offset: 1 }} xl={{ span: 6, offset: 2 }}>
                <NavLink to={"/"} className={style.logo}>
                    WeatherApp
                </NavLink>
            </Col>
            <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                {location.pathname === "/" && <Search onSearchChange={onSearchHandler}></Search>}
            </Col>
            <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                <div>
                    {user ? (
                        <Space size={20}>
                            <div className={style.greetingBox}>Hello, {user.displayName}</div>
                            <Button onClick={() => signOut(auth).then(setUser(null))} type="link">
                                <img alt="logout" width="20px" src="icons/otherIcons/icons8-logout-50.png"></img>
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
