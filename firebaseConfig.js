// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyAocIupfQ0V-qjdpDqGq_5sfYekjss8mJ0",
  authDomain: "expo-139e8.firebaseapp.com",
  projectId: "expo-139e8",
  storageBucket: "expo-139e8.firebasestorage.app",
  messagingSenderId: "107395282774",
  appId: "1:107395282774:web:e6b9a438c3f67d15d988f7",
  measurementId: "G-KY6ZMJXPYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
export {auth};
