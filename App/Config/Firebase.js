const firebase =  require('firebase')
var config = {
  apiKey: "AIzaSyC9chPyO2GXtnC4DqME82xjIZSTkmHxGx0",
  authDomain: "cooky-6f410.firebaseio.com",
  databaseURL: "https://cooky-6f410.firebaseio.com/",
  storageBucket: "gs://cooky-6f410.appspot.com/",
  messagingSenderId: "876722975578"
};
export default firebaseApp = firebase.initializeApp(config);