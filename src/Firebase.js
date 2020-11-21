import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC86KH1pZyDQ6FX98cVk6wKj_geXAnuvwo",
    authDomain: "whatsapp-v1-7b1d7.firebaseapp.com",
    databaseURL: "https://whatsapp-v1-7b1d7.firebaseio.com",
    projectId: "whatsapp-v1-7b1d7",
    storageBucket: "whatsapp-v1-7b1d7.appspot.com",
    messagingSenderId: "189645024863",
    appId: "1:189645024863:web:7ba4317e825be773d5f5ea"
  });

  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  export  {firebaseApp, auth};
  export default db;
