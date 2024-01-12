import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcwCXvPNfdKi-qxMf3n2unmD1UnjAF5BQ",
  authDomain: "carerunner-e9f30.firebaseapp.com",
  projectId: "carerunner-e9f30",
  storageBucket: "carerunner-e9f30.appspot.com",
  messagingSenderId: "445231225462",
  appId: "1:445231225462:web:aff429e076537de77add57",
  measurementId: "G-ZTE3EW0Y92"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);