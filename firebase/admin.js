var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
catch (e) {}

export const firestore = admin.firestore();