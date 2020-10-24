import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA3So_tVPQkfeUNdE3ptroBq4mU3V2GXC0",
    authDomain: "english-study-40448.firebaseapp.com",
    databaseURL: "https://english-study-40448.firebaseio.com",
    projectId: "english-study-40448",
    storageBucket: "english-study-40448.appspot.com",
    messagingSenderId: "671813009598",
    appId: "1:671813009598:web:17635aa4c6452842265eef"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore();
