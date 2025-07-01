import "./index.css";
import "@radix-ui/themes/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";

import { App } from "./app.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme className="h-full w-full bg-gray-200" hasBackground={false}>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </BrowserRouter>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
