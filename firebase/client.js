// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { Timestamp, collection, doc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9qyYJSkE33auN_I6v63wV8lGgvfFZu5c",
  authDomain: "devter-7dc84.firebaseapp.com",
  projectId: "devter-7dc84",
  storageBucket: "devter-7dc84.appspot.com",
  messagingSenderId: "286623587117",
  appId: "1:286623587117:web:762a1a4c41fa5d2768d1a4",
  measurementId: "G-1ZECC5KLYZ"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

const provider = new GithubAuthProvider();
const auth = getAuth();

const mapUserFromFirebaseAuthToUSer = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  };
};

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUSer(user) : null

    onChange(normalizedUser)
  })
};

export const loginWithGithub = async () => {
  return await signInWithPopup(auth, provider)
};

export const addDevit = async ({ avatar, content, img, userId, userName }) => {
  return await setDoc(doc(collection(db, "devits")), {
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
};

const mapDevitFromFirebaseToDevitObject = doc => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return { ...data, id, createdAt: +createdAt.toDate() }
};

export const listenLatestDevits = (callback) => {
  const collectionRef = collection(db, "devits");
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    limit(20)
  );

  return onSnapshot(q, ({ docs }) => {
    const newDevits = docs.map(mapDevitFromFirebaseToDevitObject);
    callback(newDevits)
  })
};

export const uploadImage = (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(storageRef, file)

  return task
}