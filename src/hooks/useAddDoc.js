import Firebase from "../firebase/config"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"

const useAddDoc = () => {
    const firestoreConfig = getFirestore(Firebase)

    const addDocument = (collectionName, data) => {
        return addDoc(collection(firestoreConfig, collectionName), {
            ...data,
            createdAt: serverTimestamp()
        })
    }

    return addDocument
}

export default useAddDoc