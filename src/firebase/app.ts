import "firebase/compat/auth";
import app from "firebase/compat/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "devfestlagos-2022.firebaseapp.com",
  projectId: "devfestlagos-2022",
  storageBucket: "devfestlagos-2022.appspot.com",
  messagingSenderId: "163954857780",
  appId: "1:163954857780:web:e9d29ffc7d207033ae3761",
  measurementId: "G-VCC84WSMRD",
};

// Initialize Firebase
export const firebaseApp = app.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
