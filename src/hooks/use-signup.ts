import { signup } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["use-signup"],
    mutationFn: signup,
    onSuccess: (response) => {
      console.log("response in category hook =>", response);
      toast.success(response.message);
      router.push("/login");
    },
  });
};
