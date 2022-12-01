import { useContext } from "react";
import { UserContext } from "../../UserContext";
import SearchBar from "../SerachBar/SearchBar";

const MyHeader = ({ onSearchHandler }) => {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <SearchBar onSearchHandler={onSearchHandler}></SearchBar>
            {user && (
                <div style={{ color: "white", float: "right" }}>
                    Hello, {user?.user.email}
                </div>
            )}
        </div>
    );
};

export default MyHeader;
