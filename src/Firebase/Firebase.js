import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCHUrnbPHQrwTqLBR021notYTcDWo50Kk",
  authDomain: "exam-fire-b1944.firebaseapp.com",
  projectId: "exam-fire-b1944",
  storageBucket: "exam-fire-b1944.appspot.com",
  messagingSenderId: "497114611786",
  appId: "1:497114611786:web:5c9bb17f1ce83ce798a6b3",
  measurementId: "G-GMGWYFN257",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
