import '@/styles/globals.css'
import { useEffect } from 'react'

import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/firebase/firebaseConfig';

export const firebaseApp = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {

  // useEffect(() => {
  //   firebaseApp = 
  // }, [])

  return <Component {...pageProps} />
}
