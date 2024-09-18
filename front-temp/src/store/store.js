import { configureStore } from '@reduxjs/toolkit';
import { valoresSlice } from './';


export const store = configureStore({
    reducer: {
        valores: valoresSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})