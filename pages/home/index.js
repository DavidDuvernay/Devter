import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Avatar from "@/componets/Avatar";
import Devit from "@/componets/Devit";

export default function HomePage() {

  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then(res => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <div>
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map(({ username, avatar, message, id }) => (
            <Devit
              key={id}
              username={username}
              avatar={avatar}
              message={message}
              id={id}
            />
          )
          )}
        </section>
        <nav className={styles.nav}></nav>
      </div>
    </>
  )
}