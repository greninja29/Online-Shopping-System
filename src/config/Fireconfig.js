
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

//sohan
// const firebaseConfig = {
//   apiKey: "AIzaSyDwJX4ClbtibZ9V-Nm1SzMaTSvC7wBzD7U",
//   authDomain: "supermarketautomationsoftware.firebaseapp.com",
//   projectId: "supermarketautomationsoftware",
//   storageBucket: "supermarketautomationsoftware.appspot.com",
//   messagingSenderId: "395338374573",
//   appId: "1:395338374573:web:ebf001ef79db6726829524",
//   measurementId: "G-LQ4KSRBCXV"
// };

//kalyan
const firebaseConfig = {
  apiKey: "AIzaSyC83rgbZbw5u615-bo0mkj4ZcdBtEH5lcs",
  authDomain: "onlineshoppingsystem-ff32d.firebaseapp.com",
  projectId: "onlineshoppingsystem-ff32d",
  storageBucket: "onlineshoppingsystem-ff32d.appspot.com",
  messagingSenderId: "654838873764",
  appId: "1:654838873764:web:81f3bf3274bb49f246f031",
  measurementId: "G-VXXMT76FCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);





