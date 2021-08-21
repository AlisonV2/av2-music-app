import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  storage,
  usersCollection,
  songsCollection,
  commentsCollection,
};
