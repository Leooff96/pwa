importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


var firebaseConfig = {
    messagingSenderId: "582006690832",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();