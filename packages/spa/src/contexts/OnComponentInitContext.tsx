import { createContext } from "react";

export const OnComponentInitContext = createContext<() => void>(() => {
  window.scrollTo(0, 0);
});
