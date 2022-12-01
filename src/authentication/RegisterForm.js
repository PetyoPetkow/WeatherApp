import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const RegisterFrom = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();

    return (
        <div>
            <input
                onChange={(e) => {
                    setRegisterEmail(e.target.value);
                }}
            ></input>
            <input
                onChange={(e) => {
                    setRegisterPassword(e.target.value);
                }}
            ></input>
            <button
                onClick={() =>
                    register(
                        auth,
                        registerEmail,
                        registerPassword,
                        navigate,
                        setUser
                    )
                }
            ></button>
            <div
                style={{
                    backgroundColor: "green",
                    width: "100px",
                    height: "100px",
                }}
            >
                {user?.email}
            </div>
        </div>
    );
};

const register = async (auth, email, password, navigate, setUser) => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await setUser(user);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
    navigate("/");
};
