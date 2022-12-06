import { useContext } from "react";
import { UserContext } from "../../UserContext";
import SearchBar from "../SerachBar/SearchBar";
import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

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
                <div style={{ color: "white", float: "right" }}>
                    Hello, {user?.user.email}
                </div>
            ) : (
                <div style={{ float: "right" }}>
                    <Space size={20}>
                        <Button type="default">
                            <NavLink to={"/register"}>register</NavLink>
                        </Button>
                        <Button type="default">
                            <NavLink to={"/login"}>login</NavLink>
                        </Button>
                    </Space>
                </div>
            )}
        </div>
    );
};

export default MyHeader;
