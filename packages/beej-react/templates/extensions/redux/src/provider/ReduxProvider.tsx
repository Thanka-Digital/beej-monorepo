import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";

export function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
