import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../screens/HomeScreen';

export type NoteState = {
  notes: Note[];
};

const initialState = {
  notes: [],
} as NoteState;

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    updateNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateNotes } = noteSlice.actions;

export default noteSlice;
