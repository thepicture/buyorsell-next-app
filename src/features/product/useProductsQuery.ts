import { useQuery } from "@tanstack/react-query";

import { Product } from "@features";

export const useProductsQuery = () => {
  return useQuery<Product[], Error>(["products"], () =>
    fetch(`https://fakestoreapi.com/products`).then(
      (res): Promise<Product[]> => res.json()
    )
  );
};
