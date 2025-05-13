import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export default function JotaiProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
