import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_C5wkDOKqEneDKBDDYTIv6Vtlc36JUDw",
  authDomain: "whatsapp-clone-18475.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-18475.firebaseio.com",
  projectId: "whatsapp-clone-18475",
  storageBucket: "whatsapp-clone-18475.appspot.com",
  messagingSenderId: "971628563389",
  appId: "1:971628563389:web:c224ee6ee35862ad00a0d4"
  });

  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  export  {firebaseApp, auth};
  export default db;
