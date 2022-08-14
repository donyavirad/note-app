import React from 'react'
import Container from '../../hoc/Container'
import Title from '../UI/Title'
import Notes from './Notes'
import AddNote from './AddNote'
import { notesData } from '../../publicData'
const NotesControl = () => {
  return (
    <Container>
        <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
                <Title className="py-8">
                    {notesData.noteControls.title}
                </Title>
                <AddNote/>
            </div>
            <Notes/>
        </div>
    </Container>
  )
}

export default NotesControl