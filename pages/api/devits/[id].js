import { firestore } from "@/firebase/admin"
import { customInitApp } from "@/firebase/client";

export default (request, response) => {
  const { query } = request;
  const { id } = query

  customInitApp();

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      response.json({
        ...data,
        id,
        createdAt: +createdAt.toDate()
      })
    })
    .catch(() => {
      response.status(404).end()
    })
}