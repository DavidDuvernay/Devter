import Link from "next/link"

export const getStaticProps = async () => {
  // return { userName: "Hello World!"}
  return fetch("http://localhost:3000/api/hello")
  .then( res => res.json())
  .then((res) =>{
    // return res
    console.log({res})
    return { props: {res}}
  })
}

export default function TimeLine () {
  return (
    <>
      <h1>This is the timelime of</h1>
      <Link href="/">Go back Home</Link>
    </>
  )
};

