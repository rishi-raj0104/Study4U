import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import createRoutes from "./routers/router";
import { Provider, useSelector } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const store = configureStore({ reducer: rootReducer });

function AppRouter() {
  const { user } = useSelector((state) => state.profile);
  const router = createRoutes(user);
  
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
      <Toaster />
    </Provider>
  </StrictMode>
);
