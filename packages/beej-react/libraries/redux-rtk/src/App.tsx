import { useAppDispatch, useAppSelector } from "./app/store";
import {
  decrement,
  getCount,
  increment,
} from "./features/counter/counterSlice";
import ReduxProvider from "./provider/ReduxProvider";

function App() {
  return (
    <ReduxProvider>
      <CounterDetail />
      <Counter />
    </ReduxProvider>
  );
}

function CounterDetail() {
  const count = useAppSelector(getCount);

  return <p>{count}</p>;
}

function Counter() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
}

export default App;
