import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAJO0T4JJR2SYoN-8IrGfQSQATA2RKmUQA",
  authDomain: "blockchain-paul.firebaseapp.com",
  databaseURL: "https://blockchain-paul-default-rtdb.firebaseio.com",
  projectId: "blockchain-paul",
  storageBucket: "blockchain-paul.appspot.com",
  messagingSenderId: "642660238441",
  appId: "1:642660238441:web:f8fa362b26ec426a334ef8"

})


export const storage = firebase.storage();

export const auth = app.auth()
export default app