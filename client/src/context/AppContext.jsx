import { createContext, useContext, useState, useCallback } from "react";


const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast system
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Events CRUD
  const addEvent = useCallback(
    (event) => {
      const newEvent = {
        ...event,
        id: Date.now(),
        status: event.status || "pending",
        rejectionReason: event.rejectionReason || "",
        createdAt: event.createdAt || new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
      addToast("Event request submitted successfully!");
      return newEvent;
    },
    [addToast]
  );

  const updateEvent = useCallback(
    (id, updates) => {
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
      addToast("Event updated successfully!");
    },
    [addToast]
  );

  const approveEvent = useCallback(
    (id) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status: "approved", rejectionReason: "" } : e
        )
      );
      addToast("Event request approved!");
    },
    [addToast]
  );

  const rejectEvent = useCallback(
    (id, reason) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, status: "rejected", rejectionReason: reason }
            : e
        )
      );
      addToast("Event request rejected.", "error");
    },
    [addToast]
  );

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast("Event deleted successfully!", "error");
  }, [addToast]);

  // Coupons CRUD
  const addCoupon = useCallback((coupon) => {
    const newCoupon = { ...coupon, id: Date.now(), usageCount: 0 };
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast("Coupon created successfully!");
    return newCoupon;
  }, [addToast]);

  const updateCoupon = useCallback((id, updates) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addToast("Coupon updated successfully!");
  }, [addToast]);

  const deleteCoupon = useCallback((id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addToast("Coupon deleted successfully!", "error");
  }, [addToast]);

  // Orders
  const updateOrderStatus = useCallback((id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addToast(`Order status changed to ${status}`);
  }, [addToast]);

  // Users
  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast("User removed successfully!", "error");
  }, [addToast]);

  const pendingEvents = events.filter((e) => e.status === "pending");
  const requestEvents = events.filter((e) => !!e.status);

  const value = {
    events,
    requestEvents,
    pendingEvents,
    addEvent,
    updateEvent,
    approveEvent,
    rejectEvent,
    deleteEvent,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    orders,
    updateOrderStatus,
    users,
    deleteUser,
    toasts,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
