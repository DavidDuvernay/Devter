// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9qyYJSkE33auN_I6v63wV8lGgvfFZu5c",
  authDomain: "devter-7dc84.firebaseapp.com",
  projectId: "devter-7dc84",
  storageBucket: "devter-7dc84.appspot.com",
  messagingSenderId: "286623587117",
  appId: "1:286623587117:web:762a1a4c41fa5d2768d1a4",
  measurementId: "G-1ZECC5KLYZ"
};

initializeApp(firebaseConfig)

const provider = new GithubAuthProvider();
const auth = getAuth();

const mapUserFromFirebaseAuthToUSer = (user) => {
  const {displayName, email, photoURL} = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  };
};

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUSer(user) : null
    
    onChange(normalizedUser)
  })
}

export const loginWithGithub = async () => {
  return await signInWithPopup(auth, provider)
}