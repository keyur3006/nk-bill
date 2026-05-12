importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCHPenttUmvtEeeyTwXnpVeqH1rDIW3GfQ",
  authDomain:
    "keyurbill-e4892.firebaseapp.com",
  projectId:
    "keyurbill-e4892",
  storageBucket:
    "keyurbill-e4892.firebasestorage.app",
  messagingSenderId:
    "855816024393",
  appId:
    "1:855816024393:web:939aba02ea185210ff2a98",
});

const messaging =
  firebase.messaging();