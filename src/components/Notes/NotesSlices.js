import { createSlice } from "@reduxjs/toolkit"

export const noteSlice = createSlice({
    name: "notes",
    initialState: {
        editId: null,
    },
    reducers: {
        setEditId: (state,action) =>{
            state.editId = action.payload
        },
    }
})

export const { setdata, setEditId } = noteSlice.actions

export default noteSlice.reducer