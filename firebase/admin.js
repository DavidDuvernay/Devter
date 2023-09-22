import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { kv } from "@vercel/kv";


export const getDevitById = async (id) => {
  const credentials = await kv.json.get("firebase-keys")

  const appConfig = {
    credential: cert(credentials),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  };

  if (getApps().length <= 0) {
    initializeApp(appConfig)
  }
  else {
    getApp()
  }

  const db = getFirestore()
  const collectionRef = db.collection('devits');
  const snapshot = await collectionRef.orderBy('createdAt', 'desc').get();
  let props = {}

  snapshot.forEach(doc => {

    if(doc.id === id){
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      props = {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      };
     return 
    }
  });

  return { props }
};
