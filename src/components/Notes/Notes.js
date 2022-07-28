import Container from '../../hoc/Container'
import React, { useEffect, useState } from 'react'
import CardAddNote from './CardAddNote'
import NoteItem from './NoteItem'
import Firebase from "../../firebase/config"
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore"
import AddNote from '../ModalContent/AddNote'
const Notes = () => {
    const [data, setData] = useState()
    const [modal, setModal] = useState(false)
    const firestoreConfig = getFirestore(Firebase)
    useEffect(()=>{
        const noteRef = query(collection(firestoreConfig, "notes"), orderBy("createdAt", "desc"))
        onSnapshot(noteRef, (snap)=>{
            const res = []
            snap.forEach((item)=>{
                res.push({id: item.id , ...item.data()})
            })
            setData(res)
        },(error)=> {
            console.log(error)
        })
    }, [])

  return (
    <Container>
        <div className='flex flex-col'>
            <h2 className='mb-5'>Notes:</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  '>
                <CardAddNote click={()=> setModal(true)}/>
                {data && data.map((item,id) => {
                    return <NoteItem key={id} note={item.data} color={item.colorInput}/>
                })}
                
            </div>
        </div>
        <AddNote modal={modal} click={() => setModal(false)}/>
    </Container>
  )
}

export default Notes