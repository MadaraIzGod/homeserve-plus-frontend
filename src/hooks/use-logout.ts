import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1. Delete all auth cookies
    deleteCookie("token", { path: "/" });
    deleteCookie("user", { path: "/" });

    // 2. Clear cached server queries so the next user doesn't see old data
    queryClient.clear();

    // 3. UI feedback
    toast.success("Logged out successfully");

    // 4. Redirect and refresh Next.js server components
    router.push("/login");
    router.refresh();
  };
  return { logout };
};
