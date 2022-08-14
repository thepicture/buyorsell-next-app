import { createContext } from "react";

import { Product } from "@features";

interface ShoppingCartContextProps {
  add: (product: Product) => void;
  remove: (id: number) => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps
);
