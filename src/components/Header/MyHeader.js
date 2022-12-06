import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

import { UserContext } from "../../UserContext";
import SearchBar from "../SerachBar/SearchBar";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../../config/firebase";

const MyHeader = ({ onSearchHandler }) => {
    const auth = getAuth();
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
                <Space style={{ float: "right" }} size={20}>
                    <div
                        style={{
                            color: "white",
                            float: "right",
                            fontSize: "20px",
                        }}
                    >
                        Hello, {user.user.displayName}
                    </div>
                    <Button
                        onClick={() => signOut(auth).then(setUser())}
                        type="default"
                        ghost
                    >
                        logout
                    </Button>
                </Space>
            ) : (
                <Space style={{ float: "right" }} size={20}>
                    <Button type="default" ghost>
                        <NavLink to={"/login"}>login</NavLink>
                    </Button>
                    <Button type="default" ghost>
                        <NavLink to={"/register"}>register</NavLink>
                    </Button>
                </Space>
            )}
        </div>
    );
};

export default MyHeader;
