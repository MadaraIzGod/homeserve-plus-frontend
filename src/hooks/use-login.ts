import { login } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["use-login"],
    mutationFn: login,
    onSuccess: (response) => {
      console.log("response in category hook =>", response);
      const cookieOptions = {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
      };
      setCookie("token", response.token, cookieOptions);
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
      };

      setCookie("user", JSON.stringify(userData), cookieOptions);
      toast.success(response.message);
      if (userData.role === "admin") {
        router.push("admin/dashboard");
      } else {
        router.push("/dashboard");
      }

      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to log in");
    },
  });
};
