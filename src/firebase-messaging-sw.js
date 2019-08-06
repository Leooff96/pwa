importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


var firebaseConfig = {
    messagingSenderId: "442965117261",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Handling background message ', payload);
  
    return self.registration.showNotification(payload.data.title, {
      body: payload.data.body,
      icon: payload.data.icon,
      tag: payload.data.tag,
      data: payload.data.link
    });
  });

  messaging.onMessage = ((payload) => {
    console.log('Message received. ', payload);
  });