
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// firebase V >9 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQI87iTEBCVVDtw3NZ-AsTrsSspnTVRGQ",
    authDomain: "react-app-d1fd0.firebaseapp.com",
    projectId: "react-app-d1fd0",
    storageBucket: "react-app-d1fd0.appspot.com",
    messagingSenderId: "657324863593",
    appId: "1:657324863593:web:4c3362b4a62a51bcceb2f8"
  };
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
