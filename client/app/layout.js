import "./globals.css";

// Providers
import Providers from "@/providers";

// Components
import SideBar from "@/components/sidebar";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Constants
import { SIDEBAR_MENU } from "@/constants";

export const metadata = {
  title: "Flight Booking App",
  description: "Web application for managing flight bookings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />

        <Providers>
          <SideBar menu={SIDEBAR_MENU}>{children}</SideBar>
        </Providers>
      </body>
    </html>
  );
}
