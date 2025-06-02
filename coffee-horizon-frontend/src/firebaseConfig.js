import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ6kT5WKL6gGiUQjgZDZlJP89Up0F9j7o",
  authDomain: "cofee-customize.firebaseapp.com",
  projectId: "cofee-customize",
  storageBucket: "cofee-customize.firebasestorage.app",
  messagingSenderId: "30955424372",
  appId: "1:30955424372:web:485c264819084eb93edf21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
