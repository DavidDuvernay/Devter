import admin from "firebase-admin";

try {
  const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
catch (e) {}

export const firestore = admin.firestore();
// export const firestore =  {
//     id: "7aJxkA2oftcWn9PoZNVl",
//     createdAt: 1692324897304,
//     likesCount: 0,
//     img: null,
//     avatar: 'https://avatars.githubusercontent.com/u/20390970?v=4',
//     userName: 'David Duvernay',
//     userId: 'fj3lb0X4OAducuKPAXiCd0I3IfD2',
//     content: 'did the databaseURL changed? ☁️💻',
//     sharedCount: 0
//   };