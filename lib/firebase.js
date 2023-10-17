import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  ///
};

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    
    /* createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0, */
    // TODO ---> Figure out how to manage createdAt and updatedAt times
  };
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)

    const storage = firebase.storage();

    firebase.firestore().settings({
      host: "localhost:8080",
      ssl: false
    });

    storage.useEmulator("127.0.0.1", 9199)

    //if (location.hostname === "localhost") {

        /* firebase.firestore().settings({
          host: "localhost:8080",
          ssl: false
        }); */

        // TODO ---> Once the app is production ready, switch to the actual firestore database instead of emulator
    
        /* firebase.functions().useFunctionsEmulator("http://localhost:5001") */
      //}
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();