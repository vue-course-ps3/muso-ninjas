import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC1FwrRtXzas8XExwhIKG3WyKV3csRzb4c",
  authDomain: "muso-ninjas-c97a4.firebaseapp.com",
  projectId: "muso-ninjas-c97a4",
  storageBucket: "muso-ninjas-c97a4.firebasestorage.app",
  messagingSenderId: "367559698598",
  appId: "1:367559698598:web:a8f0ff8b882c8759392c67"
};
//init firebase
firebase.initializeApp(firebaseConfig);

//init firestore service
const projectFirestore = firebase.firestore();

//init firebase auth service
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };