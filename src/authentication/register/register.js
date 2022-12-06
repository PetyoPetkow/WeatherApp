import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const register = async (
    auth,
    email,
    password,
    navigate,
    setUser,
    name
) => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(auth.currentUser, {
            displayName: name,
        });
        await setUser(user);
        console.log(user);
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};
