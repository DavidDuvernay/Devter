import Devit from "@/componets/Devit";
import { firestore } from "@/firebase/admin";
import {  doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "aq9gzq5yyrKiXxL92FeI" } }],
    fallback: true
  }
};

export async function getStaticProps(ctx) {
  const { params, res } = ctx;
  const { id } = params;

  const db = getFirestore(firestore)
  const docRef = doc(db, "devits", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data();
    const id = docSnap.id;
    const { createdAt } = data;
    const props = {
      ...data,
      id,
      createdAt: +createdAt.toDate()
    };

    return { props }

  } else {
    return { props: {} }
  }
};

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Loading...</h1>

  return (
    <>
      <Devit {...props}></Devit>
    </>
  )
};