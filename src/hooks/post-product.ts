import { postProduct } from "@/lib/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post-product"],
    mutationFn: postProduct,
    onSuccess: (response) => {
      console.log("response in category hook =>", response);
      toast.success(response.message);
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
