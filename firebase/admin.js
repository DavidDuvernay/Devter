import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

var admin = require("firebase-admin");

try {
  if ( !getApps().length ) initializeApp(firebaseConfig)

  var serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
catch (e) {}

export const firestore = admin.firestore();