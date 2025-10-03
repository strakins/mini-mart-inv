import { toast } from 'react-toastify';

export const showToast = {
  // Success messages
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // Error messages
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // Warning messages
  warning: (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // Info messages
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // Loading states
  loading: (message) => {
    return toast.loading(message, {
      position: "top-right",
    });
  },

  // Update loading toast
  update: (toastId, config) => {
    toast.update(toastId, config);
  },

  // Dismiss toast
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  }
};