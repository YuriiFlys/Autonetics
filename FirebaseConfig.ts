// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from 'firebase/auth';
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
        
            
      
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRkSFybTKGyX0X9Bqj9nyrcSOaKQHxtCg",
  authDomain: "autonetics.firebaseapp.com",
  projectId: "autonetics",
  storageBucket: "autonetics.appspot.com",
  messagingSenderId: "840963257554",
  appId: "1:840963257554:web:877e05ae3a5d640a5a290b",
  measurementId: "G-935E3D1CQG"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = firebaseAuth.initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
