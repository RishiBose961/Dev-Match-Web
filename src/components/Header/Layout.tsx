import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import BottomNavigation from "./Bottomavigation";

import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
      };
    }) => state.auth
  );
  return (
    <>
      <div className="lg:flex lg:flex-auto h-screen">
        {isAuthenticated && <SideBar />}

        <div className="grow">
          <NavBar />
          <div className="m-5">{children}</div>
        </div>
        {isAuthenticated && <BottomNavigation />}
      </div>
    </>
  );
};

export default Layout;
