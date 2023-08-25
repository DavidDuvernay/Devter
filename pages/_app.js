import '@/styles/globals.css'

import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/firebase/firebaseConfig';

export const firebaseApp = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {

  return <Component {...pageProps} />
}