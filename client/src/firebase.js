// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-123cc.firebaseapp.com',
  projectId: 'mern-auth-123cc',
  storageBucket: 'mern-auth-123cc.appspot.com',
  messagingSenderId: '20055746405',
  appId: '1:20055746405:web:bd6777f333288a959b238c',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
