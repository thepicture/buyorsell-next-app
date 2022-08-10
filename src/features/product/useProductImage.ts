import { useQuery } from "@tanstack/react-query";

export const useProductImage = () => {
  return useQuery<string, Error>(["repoData"], () =>
    fetch(`https://fakestoreapi.com/products/1`)
      .then((res) => res.json())
      .then((json) => json.image as string)
  );
};
