import React, {useContext, useState} from "react";

const ModalContext = React.createContext()

export const useModal = () => useContext(ModalContext)

export const ModalProvider = (props) => {
    const [modal, setModal] = useState(null)
    
    const showModal = (value) =>{
        setModal(value)
    }
    const hideModal = () => {
        setModal(false)
    }
    const value = {
        modal,
        showModal,
        hideModal
    }
    return(
        <ModalContext.Provider value={value}>
            {props.children}
        </ModalContext.Provider>
    )
}