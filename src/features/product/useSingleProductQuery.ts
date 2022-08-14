import { useQuery } from "@tanstack/react-query";

import { Product } from "@features";

export const useSingleProductQuery = (id: number) => {
  return useQuery<Product, Error>(["products", id], () =>
    fetch(`https://fakestoreapi.com/products/${id}`).then(
      (res): Promise<Product> => res.json()
    )
  );
};
