import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA0XEdB4Njgeios32nhzo7uJ3E_Y9nGD84",
  authDomain: "e-commerce-imatharv13.firebaseapp.com",
  projectId: "e-commerce-imatharv13",
  storageBucket: "e-commerce-imatharv13.firebasestorage.app",
  messagingSenderId: "1083188370559",
  appId: "1:1083188370559:web:216f24eedf920f85af734a",
  measurementId: "G-6TP9JGDTZS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db  = getFirestore(app);