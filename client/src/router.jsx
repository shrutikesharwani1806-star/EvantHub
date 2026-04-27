import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookTicketPage from "./pages/BookTicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import CreateEventRequestPage from "./pages/CreateEventRequestPage";
import RejectReasonPage from "./pages/RejectReasonPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateComponent from "./components/privateComponet";
import AdminPrivateComponent from "./components/adminPrivateComponent";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRequest from "./pages/admin/AdminRequest";
import AdminRatings from "./pages/admin/AdminRatings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminCoupons from "./pages/admin/AdminCoupons";
import TicketSuccessPage from "./pages/TicketSuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:eid", element: <EventDetailsPage /> },
      { path: "create-event", element: <CreateEventRequestPage /> },
      { path: "request-status/:id", element: <RejectReasonPage /> },
      {
        element: <PrivateComponent />,
        children: [
          { path: "book-ticket/:eid", element: <BookTicketPage /> },
          { path: "my-tickets", element: <MyTicketsPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "ticket-success", element: <TicketSuccessPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/admin",
    element: <AdminPrivateComponent />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "events", element: <AdminEvents /> },
          { path: "requests", element: <AdminRequest /> },
          { path: "ratings", element: <AdminRatings /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "users", element: <AdminUsers /> },
          { path: "users/:id", element: <AdminUserDetail /> },
          { path: "coupons", element: <AdminCoupons /> },
        ],
      },
    ],
  },
]);
