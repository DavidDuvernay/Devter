import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Devit from "@/componets/Devit";
import useUser from "@/hooks/useUsers";
import { listenLatestDevits } from "@/firebase/client";
import Link from "next/link";
import Create from "@/componets/Icons/Create";
import Home from "@/componets/Icons/Home";
import Search from "@/componets/Icons/Search";
import Head from "next/head";

export const metadata = {
  title: "Home",
  description: "Talk about development with developers"
};

export default function HomePage() {

  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsubscribe
    if(user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }

    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
    <Head>
      <title>Home / Devter</title>
    </Head>
      <div>
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map(({
            avatar,
            content,
            createdAt,
            id,
            img,
            userId,
            userName,
          }) => (
            <Devit
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              userId={userId}
              userName={userName}
            />
          )
          )}
        </section>
        <nav className={styles.nav}>
          <Link href="/home">
            <Home width={32} height={32} stroke="#09f"/>
          </Link>
          <Link href="/search">
            <Search width={32} height={32} stroke="#09f"/>
          </Link>
          <Link href="/compose/tweet">
            <Create width={32} height={32} stroke="#09f"/>
          </Link>
        </nav>
      </div>
    </>
  )
}