import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  databaseURL: "https://chiranjeevi-dashboard-b88b3-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyBRJDKoTokSbMmNrHp3aU6rB90oXjkS06o",
  authDomain: "chiranjeevi-dashboard-b88b3.firebaseapp.com",
  projectId: "chiranjeevi-dashboard-b88b3",
  storageBucket: "chiranjeevi-dashboard-b88b3.appspot.com",
  messagingSenderId: "286680904145",
  appId: "1:286680904145:web:675133b361b07e345bb0f0",
  measurementId: "G-J4X7P4F5DV"
};
firebase.initializeApp(firebaseConfig)


export default firebase;