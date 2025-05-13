import { create } from "zustand";

type CounterState = {
  count: number;
};

type CounterAction = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounter = create<CounterState & CounterAction>((set) => ({
  count: 0,
  increment: () => set((state: CounterState) => ({ count: state.count + 1 })),
  decrement: () => set((state: CounterState) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
