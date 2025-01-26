import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      return null; 
    }
    return(
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}