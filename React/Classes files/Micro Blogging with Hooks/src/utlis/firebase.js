import { createContext } from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd-n9GKJ-_noTMMv01uKBlKs3DAlG0nZA",
    authDomain: "micro-bloging2.firebaseapp.com",
    projectId: "micro-bloging2",
    storageBucket: "micro-bloging2.appspot.com",
    messagingSenderId: "482112430893",
    appId: "1:482112430893:web:8c252d7dd22ef16bcaa9a4"
  };
export const FirebaseContext = createContext(null) 
// Initialize Firebase
export default function Firebase({ children }) {
    const app = initializeApp(firebaseConfig);
    return (
        <FirebaseContext.Provider value={app}>
            { children } {/*<App />*/}
        </FirebaseContext.Provider>
    )
}
