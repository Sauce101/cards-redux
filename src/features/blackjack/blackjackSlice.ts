import { createSlice } from '@reduxjs/toolkit';

interface CountState {
  cardMax: number;
  count: number;
  stand: boolean;
  shuffle: boolean;
  result: any;
}

const initialState: CountState = {
  cardMax: 0,
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
    dealerIncrement: (state) => {
      state.cardMax += 1;
    },
    newDeal: (state) => {
      state.count = 4;
      state.cardMax = 0;
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
    playerStand: (state) => {
      state.cardMax = state.count;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  dealerIncrement,
  newDeal,
  standToggle,
  newStand,
  newShuffle,
  shuffleToggle,
  playerStand,
} = blackjackSlice.actions;

export default blackjackSlice.reducer;
