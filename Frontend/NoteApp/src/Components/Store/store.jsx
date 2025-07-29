import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './user/userSlice';
import noteslice from './notes/noteSlice';

export const store=configureStore({
    reducer:{
        user: UserSlice,
        notes:noteslice
    },
})