import styles from "./styles.module.css"

export default function Avatar ({ alt, src, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src}/>
      { text && <strong>{text || alt}</strong>}
    </div>
  )
}