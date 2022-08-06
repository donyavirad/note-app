import React from 'react'
import { useModal } from '../../context/modalContext'
import AddNote from '../ModalContent/AddNote'
import EditNote from '../ModalContent/EditNote'
const Modal = () => {
    const { modal, hideModal } = useModal()
    let res = <div></div>
    let contentModal = null

    switch(modal) {
        case "add-note-content":
            contentModal = <AddNote/>
            break
        case "edit-note-content":
            contentModal = <EditNote />
            break
    }
    
    if(modal){
        res = (
            <div className='fixed inset-0 w-full h-full flex justify-center items-center z-30 overflow-y-hidden'>
                <div onClick={()=> hideModal()} className='fixed w-full h-full left-0 top-0 backdrop-blur bg-gray-300 bg-opacity-60 ' aria-hidden={true}></div>
                <div className='relative z-50 rounded-sm'>
                    {contentModal}
                </div>
            </div>
        )
    }

  return res
}

export default Modal