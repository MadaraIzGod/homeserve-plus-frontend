import API from "@/api/api";
import { Product } from "@/types/interfaces/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: async ({ id, data }: { id: string; data: Product }) => {
      const res = await API.put(`/admin/products/${id}`, data);
      return res.data;
    },
    onSuccess: (res) => {
      console.log("Product Update success:", res);

      queryClient.invalidateQueries({
        queryKey: ["get-product"],
      });
    },
    onError: (error: any) => {
      console.log("Error update product:", error?.message || error);
    },
  });
};
