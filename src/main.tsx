import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import Login from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";
import Home from "./pages/home/Home.tsx";
import Profile from "./pages/profile/Profile.tsx";
import { store } from "./store.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Schedule from "./pages/schedule/Schedule.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import SettingsPage from "./pages/Setting/setting.tsx";
import JoinRequest from "./pages/join_Request/JoinRequest.tsx";
import Room from "./pages/Room/Room.tsx";
import VideoMeeting from "./pages/Video-Meeting/VideoMeeting.tsx";
import Notication from "./pages/notification/Notication.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      {/* Protected Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/request/:id" element={<JoinRequest />} />
        <Route path="/meeting-room" element={<Room />} />
        <Route path="/notification" element={<Notication />} />
        <Route path="/meeting-room/:id" element={<VideoMeeting />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
