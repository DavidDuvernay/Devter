import styles from "./styles.module.css";

export default function Button ({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={styles.button} >
        {children}
      </button>
    </>
  )
}