import API from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async (id: string) => {
      const res = await API.delete(`/admin/products/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      console.log("Product Deleted:", res);
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["get-product"],
        exact: true,
      });
    },
    onError: (error) => {
      console.log("Error in category hook=>", error);
    },
  });
};
