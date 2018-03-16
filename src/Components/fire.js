import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAUcAO9JdHpCsv-9NfLjpapF1KIMw7_VvY",
    authDomain: "capstone-f88ec.firebaseapp.com",
    databaseURL: "https://capstone-f88ec.firebaseio.com",
    projectId: "capstone-f88ec",
    storageBucket: "capstone-f88ec.appspot.com",
    messagingSenderId: "36419550063"
  };
var fire = firebase.initializeApp(config);

export default fire;
