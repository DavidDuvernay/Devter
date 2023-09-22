import Devit from "@/componets/Devit";
import { getDevitById } from "@/firebase/admin";
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

  return await getDevitById(id)
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