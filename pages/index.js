import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@/componets/Button'
import GitHub from '@/componets/Icons/GitHub'
import { loginWithGithub, onAuthStateChanged } from '@/firebase/client'
import { useEffect, useState } from 'react'
import Avatar from '@/componets/Avatar'
import Logo from '@/componets/Icons/Logo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGithub()
      .then(user => {
        // const { avatar, username, email } = user
        setUser(user)
      })
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
          {/* <img className={styles.imgLogo} src="/development-logo.png" alt="logo" /> */}
          <Logo  width="100"/>
          <h1 className={styles.h1Title}>Devter</h1>
          <h2 className={styles.h2Title}>Talk about development <br /> with developers 👨‍💻👩‍💻</h2>

          <div className={styles.buttonDiv}>
            {
              user === null &&
              <Button onClick={handleClick}>
                <GitHub fill="#fff" height={24} width={24} />
                Login with Github
              </Button>
            }
            {
              user && user.avatar && (
                <div>
                  <Avatar 
                    alt="avatar" 
                    src={user.avatar} 
                    text={user.username}
                  />
                </div>
              )}
          </div>

        </section>
        {/* <Link href="/timeline">timeline</Link> */}
      </main>
    </>
  )
};