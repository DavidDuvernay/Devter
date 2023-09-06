import Devit from "@/componets/Devit";
import { firestore } from "@/firebase/admin";
import { customInitApp } from "@/firebase/client";
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

  customInitApp();
  
  return await firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      };
      // console.log(props.createdAt)

      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
  // return {props: firestore}
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