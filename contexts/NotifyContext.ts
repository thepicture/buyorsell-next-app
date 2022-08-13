import { createContext } from "react";

export const NotifyContext = createContext<(message: string) => void>(() => {});
