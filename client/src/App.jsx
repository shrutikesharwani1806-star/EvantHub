import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppProvider } from "./context/AppContext";
import Loader from "./components/Loader";
import ChatBot from "./components/ChatBot";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      {loading && (
        <div className={fadeOut ? "loader-container fade-out" : ""}>
          <Loader />
        </div>
      )}
      <div className={loading ? "opacity-0" : "animate-fadeIn"}>
        <RouterProvider router={router} />
        <ChatBot />
      </div>
      <ToastContainer />
    </AppProvider>
  );
}
