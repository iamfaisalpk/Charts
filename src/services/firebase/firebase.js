import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY0RBut9aTq2r1RPMgxm9h8nkLc3RiP98",
  authDomain: "issue-box-c6f67.firebaseapp.com",
  projectId: "issue-box-c6f67",
  storageBucket: "issue-box-c6f67.firebasestorage.app",
  messagingSenderId: "714101343440",
  appId: "1:714101343440:web:a40c2a91cfcea2abb6cad5",
  measurementId: "G-HPFJC3X35J",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics only initializes when the runtime supports it.
export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);

