import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Navigate } from "react-router-dom";

export const LoginFrom = ({ history }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();

    return (
        <div>
            <input
                onChange={(e) => {
                    setLoginEmail(e.target.value);
                }}
            ></input>
            <input
                onChange={(e) => {
                    setLoginPassword(e.target.value);
                }}
            ></input>
            <button
                onClick={() =>
                    login(auth, loginEmail, loginPassword, navigate, setUser)
                }
            ></button>
        </div>
    );
};

const login = async (auth, email, password, navigate, setUser) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        await setUser(user);
        console.log(user);
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};
