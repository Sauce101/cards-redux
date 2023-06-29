import { createSlice } from '@reduxjs/toolkit';

interface CountState {
  count: number;
  stand: boolean;
  shuffle: boolean;
  result: any;
}

const initialState: CountState = {
  count: 4,
  stand: false,
  shuffle: false,
  result: null,
};

export const blackjackSlice = createSlice({
  name: 'blackjack',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    newDeal: (state) => {
      state.count = 4;
    },
    standToggle: (state) => {
      state.stand = !state.stand;
    },
    newStand: (state) => {
      state.stand = false;
    },
    shuffleToggle: (state) => {
      state.shuffle = !state.shuffle;
    },
    newShuffle: (state) => {
      state.shuffle = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  newDeal,
  standToggle,
  newStand,
  newShuffle,
  shuffleToggle,
} = blackjackSlice.actions;

export default blackjackSlice.reducer;
