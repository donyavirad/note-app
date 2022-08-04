import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import NotesSlices from "../components/Notes/NotesSlices";
import ModalSlice from "../components/UI/ModalSlice";
export default configureStore({
    reducer: {
        notes: NotesSlices,
        modal: ModalSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})