
import firebase from "firebase/app"
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDGzArJAyAy60E1TosMjt-o3m0e1uSDj1k",
    authDomain: "youreads-cecef.firebaseapp.com",
    databaseURL: "https://youreads-cecef.firebaseio.com",
    projectId: "youreads-cecef",
    storageBucket: "youreads-cecef.appspot.com",
    messagingSenderId: "316193822330",
    appId: "1:316193822330:web:a207f13bec880faea58dc3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;