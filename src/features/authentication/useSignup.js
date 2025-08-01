import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from '../../services/apiAuth';
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Account successfully created! Please verify the new account from the user's email address.");
    },
  });

  return { signup, isPending };
}