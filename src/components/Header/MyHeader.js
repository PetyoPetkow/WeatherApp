import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

import { UserContext } from "../../UserContext";
import SearchBar from "../SerachBar/SearchBar";

const MyHeader = ({ onSearchHandler }) => {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <NavLink
                to={"/"}
                style={{ fontSize: "60px", color: "white", float: "left" }}
            >
                WeatherApp
            </NavLink>
            <SearchBar onSearchHandler={onSearchHandler}></SearchBar>
            {user ? (
                <div
                    style={{ color: "white", float: "right", fontSize: "20px" }}
                >
                    Hello, {user.user.displayName}
                </div>
            ) : (
                <div style={{ float: "right" }}>
                    <Space size={20}>
                        <Button type="default" ghost>
                            <NavLink to={"/login"}>login</NavLink>
                        </Button>
                        <Button type="default" ghost>
                            <NavLink to={"/register"}>register</NavLink>
                        </Button>
                    </Space>
                </div>
            )}
        </div>
    );
};

export default MyHeader;
