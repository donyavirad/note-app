import { createSlice } from "@reduxjs/toolkit"

export const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        modal: false,
        modalContent: null,
    },
    reducers: {
        showModal: (state) => {
            state.modal = true
        },
        hideModal: (state) => {
            state.modal = false
        },
        addModalContent: (state) => {
            state.modalContent = "add-note-content"
        },
        editModalContent: (state) => {
            state.modalContent = "edit-note-content"
        }
    }
})

export const { showModal, hideModal, addModalContent, editModalContent } = ModalSlice.actions

export default ModalSlice.reducer