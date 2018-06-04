const firebase = require('firebase')
var config = {
  apiKey: "AIzaSyCCVbR1OgPE4UCjDj_Y-RyoHjRiP7YPHZI",
    authDomain: "cookpad-d2964.firebaseapp.com",
    databaseURL: "https://cookpad-d2964.firebaseio.com",
    projectId: "cookpad-d2964",
    storageBucket: "cookpad-d2964.appspot.com",
    messagingSenderId: "1014180117466"
};
export default firebaseApp = firebase.initializeApp(config);