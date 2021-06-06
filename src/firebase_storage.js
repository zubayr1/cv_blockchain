import firebase from 'firebase';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAJO0T4JJR2SYoN-8IrGfQSQATA2RKmUQA",
    authDomain: "blockchain-paul.firebaseapp.com",
    databaseURL: "https://blockchain-paul-default-rtdb.firebaseio.com",
    projectId: "blockchain-paul",
    storageBucket: "blockchain-paul.appspot.com",
    messagingSenderId: "642660238441",
    appId: "1:642660238441:web:f8fa362b26ec426a334ef8"
  };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
 }
var storage = firebase.storage();
export default storage;