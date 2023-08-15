import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@/componets/Button'
import GitHub from '@/componets/Icons/GitHub'
import { loginWithGithub, onAuthStateChanged } from '@/firebase/client'
import { useEffect, useState } from 'react'
import Logo from '@/componets/Icons/Logo'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from '@/hooks/useUsers'

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGithub()
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Twitter (X) like posting app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <section className={styles.mainSection}>
          <Logo  width="100"/>
          <h1 className={styles.h1Title}>Devter</h1>
          <h2 className={styles.h2Title}>Talk about development <br /> with developers 👨‍💻👩‍💻</h2>

          <div className={styles.buttonDiv}>
            {
              user === USER_STATES.NOT_LOGGED &&
              <Button onClick={handleClick}>
                <GitHub fill="#fff" height={24} width={24} />
                Login with Github
              </Button>
            }
            { user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif"/> }
          </div>

        </section>
      </main>
    </>
  )
};