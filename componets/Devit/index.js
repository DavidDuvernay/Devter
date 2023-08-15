import useTimeAgo from "@/hooks/useTimeAgo";
import Avatar from "../Avatar";
import styles from "./styles.module.css"

export default function Devit({
  avatar,
  content,
  createdAt,
  id,
  img,
  userId,
  userName,
}) {

  const timeAgo = useTimeAgo(createdAt)
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
          <strong>{userName}</strong>
          <span> · </span>
          <time className={styles.date}>{timeAgo}</time>
          </header>
          <p className={styles.p}>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
};