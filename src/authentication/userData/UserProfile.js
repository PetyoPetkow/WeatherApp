import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../../config/firebase";
import { UserContext } from "../../UserContext";

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState("");

    const getUserData = async () => {
        const userData = await getDoc(doc(db, "users", user.uid));
        console.log(userData.data());
        if (userData.data()?.username) {
            setUserInfo(userData.data());
        }
    };
    useEffect(() => {
        if (user) {
            getUserData();
        }
    }, [user]);

    return (
        <>
            <div>
                Username: <span>{userInfo.username}</span>
            </div>
            <div>
                Birth date: <span>{userInfo.birthDate}</span>
            </div>

            <div>
                Country: <span>{userInfo.country}</span>
            </div>
            <NavLink to="/editProfile">Edit profile</NavLink>
        </>
    );
};

export default UserProfile;
