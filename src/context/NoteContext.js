import React, {useContext, useState} from "react";

const NoteContext = React.createContext()

export const useNote = () => useContext(NoteContext)

export const NoteProvider = (props) => {
    const [noteId, setNoteId] = useState(null)

    const setId = (value) => {
        setNoteId(value)
    }

    const clearId = () => {
        setNoteId(null)
    }

    const value = {
        noteId,
        setId,
        clearId,
    }
    return(
        <NoteContext.Provider value={value}>
            {props.children}
        </NoteContext.Provider>
    )
}