// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJsbsKjvpuG1z0hiiBWehh2T8VJlOUhho",
  authDomain: "login-auth-21d86.firebaseapp.com",
  projectId: "login-auth-21d86",
  storageBucket: "login-auth-21d86.firebasestorage.app",
  messagingSenderId: "622235071460",
  appId: "1:622235071460:web:b4df50da7f5d6147a30df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;