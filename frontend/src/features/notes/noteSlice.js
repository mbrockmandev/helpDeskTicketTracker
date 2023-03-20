import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create new note
export const addNote = createAsyncThunk(
  'notes/create',
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createTicket(noteData, token);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  },
);

// get notes for a ticket
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  },
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.note = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
