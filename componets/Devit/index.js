import useTimeAgo from "@/hooks/useTimeAgo";
import Avatar from "../Avatar";
import styles from "./styles.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import useDateTimeFormat from "@/hooks/useDateTimeFormat";

export default function Devit({
  avatar,
  content,
  createdAt,
  id,
  img,
  userId,
  userName,
}) {
  const router = useRouter();
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  };

  return (
    <>
      <article onClick={handleArticleClick} className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
          <strong>{userName}</strong>
          <span> · </span>
          <Link className={styles.link} href={`/status/${id}`}>
            <time className={styles.date} title={createdAtFormated}>{timeAgo}</time>
          </Link>
          </header>
          <p className={styles.p}>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
};