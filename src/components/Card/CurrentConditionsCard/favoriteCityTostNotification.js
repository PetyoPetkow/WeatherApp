import { toast } from "react-toastify";

export const notify = (city, action) =>
  toast(`${city} was ${action} as your favorite city!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
  });
