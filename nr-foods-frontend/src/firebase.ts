import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCHPenttUmvtEeeyTwXnpVeqH1rDIW3GfQ",
  authDomain: "keyurbill-e4892.firebaseapp.com",
  projectId: "keyurbill-e4892",
  storageBucket: "keyurbill-e4892.firebasestorage.app",
  messagingSenderId: "855816024393",
  appId: "1:855816024393:web:939aba02ea185210ff2a98",
  measurementId: "G-J90BZYRC4X"
};


const app = initializeApp(firebaseConfig);

export const messaging =
  getMessaging(app);

export const requestForToken =
  async () => {

    try {
      await Notification.requestPermission();
      const token =
        await getToken(
          messaging,
          {
            vapidKey:
              "BHjKCL9N-aMGpw0apNy4VX1rjMZNX-uZeuAMTolmG8ujd9pzEpMIZKtLLSAfMVmBbMVgha8J-RCZaIEcu1R8Gzg",
          }
        );

      console.log(
        "FCM TOKEN:",
        token
      );

    } catch (err) {

      console.log(err);

    }
};

onMessage(
  messaging,
  (payload) => {

    console.log(
      "Message received:",
      payload
    );

    new Notification(
      payload.notification?.title ||
        "New Notification",
      {
        body:
          payload.notification
            ?.body,
      }
    );
  }
);


