import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCKg3jVz2agG0xqlybGZR09BNDfKkzqqhE",
  authDomain: "dev357-mobx-whack-a-mole.firebaseapp.com",
  databaseURL: "https://dev357-mobx-whack-a-mole.firebaseio.com",
  storageBucket: "dev357-mobx-whack-a-mole.appspot.com"
};

firebase.initializeApp(config);

const root = firebase.database().ref();
const scores = firebase.database().ref('scores');

export default {
  root,
  scores
};
