import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAFV918EoNkKB6adR7j1erZdJ2fGFe7d-Q",
    authDomain: "weatherapp-48bb3.firebaseapp.com",
    projectId: "weatherapp-48bb3",
    storageBucket: "weatherapp-48bb3.appspot.com",
    messagingSenderId: "830500209538",
    appId: "1:830500209538:web:073b96695c4d502fbc059b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
