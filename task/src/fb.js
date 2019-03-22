import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "task-management-b12aa.firebaseapp.com",
    databaseURL: "https://task-management-b12aa.firebaseio.com",
    projectId: "task-management-b12aa",
    storageBucket: "task-management-b12aa.appspot.com",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

  const db = firebase.firestore();
  const auth = firebase.auth();
  
  export default db;
  export default auth;