import { useQuery } from "@tanstack/react-query";

import { Product } from "@features";

export const useProductImageQuery = () => {
  return useQuery<string, Error>(["product", "image"], () =>
    fetch(`https://fakestoreapi.com/products/1`)
      .then((res) => res.json())
      .then((json: Product) => json.image)
  );
};
