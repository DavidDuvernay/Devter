import admin from "firebase-admin";
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, initializeFirestore } from "firebase/firestore";

export const firestore = () => {
  try {
    const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY)

    const app = getApps().length <= 0
      ? initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      })
      : getApp()

    const firestore = getFirestore()
      ? initializeFirestore(app)
      : getFirestore()

      return firestore()
  }
  catch (e) {

    console.log("firestore error", e)
  }
}