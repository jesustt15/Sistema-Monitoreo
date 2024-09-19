import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSensorData = createAsyncThunk('valores/fetchSensorData', async () => {
  const response = await axios.get('http://localhost:3000/sensor/valores');
  return response.data;
});


const valoresSlice = createSlice({
  name: 'valores',
  initialState: {
    data: [],
    filteredData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addSensorData: (state, action) => {
        state.data.push(action.payload);
      },
      
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSensorData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
}});

export const { addSensorDataa, filtrando } = valoresSlice.actions;

export default valoresSlice.reducer;
