// Firebase Core
import { initializeApp } from "firebase/app";

// Firebase Services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNj2c-eR85Y4NEHk96HOoK3oIkjpW5tJM",
  authDomain: "health-centre-ai.firebaseapp.com",
  projectId: "health-centre-ai",
  storageBucket: "health-centre-ai.firebasestorage.app",
  messagingSenderId: "1062802917007",
  appId: "1:1062802917007:web:81f2eed603e217c10bd2fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Export App
export default app;