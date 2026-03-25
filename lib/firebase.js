import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAFsDT47dbZHcJAv8pIbLcctDNBGMxEv4A",
  authDomain: "astella-440d8.firebaseapp.com",
  databaseURL: "https://astella-440d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "astella-440d8",
  storageBucket: "astella-440d8.firebasestorage.app",
  messagingSenderId: "330140701716",
  appId: "1:330140701716:web:7671a2efcdbd100dfe4301",
  measurementId: "G-PNJ067L50P"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Initialize Analytics conditionally (only in browser)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, auth, googleProvider, githubProvider, analytics };
