import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

const noteslice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        loadNotes: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { loadNotes } = noteslice.actions;

export default noteslice.reducer;
