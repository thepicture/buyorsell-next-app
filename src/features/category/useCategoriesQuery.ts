import { useQuery } from "@tanstack/react-query";

export const useCategoriesQuery = () => {
  return useQuery<string[], Error>(["categories"], () =>
    fetch(`https://fakestoreapi.com/products/categories`).then(
      (res): Promise<string[]> => res.json()
    )
  );
};
