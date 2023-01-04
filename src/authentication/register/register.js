import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const register = async (auth, email, password, navigate, setUser, userValues) => {
    try {
        console.log("pak mi pisna", userValues.birthDate.format("DD-MM-YYYY"));
        const user = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", user.user.uid), {
            username: userValues.username,
            birthDate: userValues.birthDate.format("DD-MM-YYYY"),
            country: userValues.country,
        });

        await setUser(user.user);
        console.log(user);
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
};
