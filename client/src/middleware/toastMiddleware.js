import { isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastMiddleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const message = action.payload || action.error?.message || "Something went wrong";
    toast.error(message, { position: "top-center", theme: "dark" });
  }

  return next(action);
};

export default toastMiddleware;
