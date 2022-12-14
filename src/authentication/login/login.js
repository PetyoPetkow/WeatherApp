import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (values, auth, navigate, setUser) => {
    try {
        const user = await signInWithEmailAndPassword(auth, values.email, values.password);
        await setUser(user.user);
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};

export default login;
