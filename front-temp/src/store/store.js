import { configureStore } from '@reduxjs/toolkit';
import valoresSlice from './valores/valoresSlice';
import { authSlice } from './auth';



export const store = configureStore({
    reducer: {
        valores:    valoresSlice,
        auth:     authSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})