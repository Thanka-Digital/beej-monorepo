import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  count: 0,
}

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export const getCount = (state: RootState) => state.counter.count;

export const { increment, decrement } = CounterSlice.actions;
export default CounterSlice.reducer;
