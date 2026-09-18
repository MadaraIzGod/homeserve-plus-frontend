
import { getProduct } from "@/lib/product";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["get-product"],
    queryFn: getProduct,
  });
};
