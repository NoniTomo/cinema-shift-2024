import { toast } from "react-toastify";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-left'
  });
}