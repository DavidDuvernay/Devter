import Button from "@/componets/Button";
import styles from "./styles.module.css";
import useUser from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import { addDevit, uploadImage } from "@/firebase/client"
import { useRouter } from "next/router";
import Head from "next/head";
import { getDownloadURL } from "firebase/storage";
import Avatar from "@/componets/Avatar";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
};

const DRAG_STYLE = {
  1: styles.on_drag
}
export default function ComposeTweet() {
  const router = useRouter();
  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (task) {
      let onProgress = () => { };
      let onError = () => { };
      let onComplete = () => {
        getDownloadURL(task.snapshot.ref)
          .then(setImgURL)
      };

      task.on("state_changed",
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL
    })
      .then(() => {
        router.push("/home")
      })
      .catch(err => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  };

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    document.getElementsByClassName("textarea").attr
  };

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

  };

  const handleDrop = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <Head>
        <title>Create a Devit / Devter</title>
      </Head>
      <section className={styles.form_container}>
        {
          user && (
            <section className={styles.avatar_container}>
              <Avatar src={user.avatar} />
            </section>
          )
        }
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={
              styles.textarea + " " + DRAG_STYLE[drag]
            }
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="What's new?"
            value={message}
          ></textarea>
          {imgURL && <section className={styles.remove_image}>
            <button className={styles.button} onClick={() => setImgURL(null)}>x</button>
            <img className={styles.img} src={imgURL} />
          </section>}
          <div className={styles.div}>
            <Button
              disabled={isButtonDisabled}
            >Devit</Button>
          </div>
        </form>
      </section>
    </>
  )
};