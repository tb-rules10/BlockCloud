import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
//   theme: "dark",
};

export const showError = (message) => {
  toast.error(message, toastOptions);
};

export const showStatus = (message) => {
  toast.info(message, toastOptions);
};

export const showSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showWarning = (message) => {
  toast.warn(message, toastOptions);
};