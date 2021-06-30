// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCpHUxkzeybPS-7P2FPvuyaJSWdY56vOHU",
    authDomain: "clone-47a4b.firebaseapp.com",
    projectId: "clone-47a4b",
    storageBucket: "clone-47a4b.appspot.com",
    messagingSenderId: "1042827770217",
    appId: "1:1042827770217:web:2a51f8dadca7496c4d25f8",
    measurementId: "G-7HR9X2XMKC"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  export {db,auth}; 
