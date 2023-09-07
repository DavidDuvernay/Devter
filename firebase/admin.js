import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

export const firestore = () => {
  try {
    const app = getApps().length <= 0
      ? initializeApp({
        credential: cert({
          project_id: process.env.PROJECT_ID,
          client_email: process.env.CLIENT_EMAIL,
          private_key_id: process.env.PRIVATE_KEY_ID.replace(/\\n/g, '\n')
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      })
      : getApp();

    return app
  }
  catch (e) {

    console.log("firestore error", e)
  }
}