import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAuWPfGFEZEqUZDPmFdACbHu0nRAt2XkK4",
    authDomain: "fir-adoption-4672b.firebaseapp.com",
    projectId: "fir-adoption-4672b",
    storageBucket: "fir-adoption-4672b.appspot.com",
    messagingSenderId: "1080624646829",
    appId: "1:1080624646829:web:4969b7ea74d57507f9d424",
    measurementId: "G-KP12CTVFY3"
};

const app = initializeApp(firebaseConfig);
//console.log(firebase.storage);
export const storage = getStorage(app);
export const db = getFirestore(app);
