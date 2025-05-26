import { Outlet } from "react-router";
import Bottomavigation from "./components/Header/Bottomavigation";
import NavBar from "./components/Header/NavBar";
import useAuthEffect from "./components/useAuthEffect";

const App = () => {
  useAuthEffect();
  return (
    <div className="px-4">
      <NavBar />

      <Outlet />

      <Bottomavigation />
    </div>
  );
};

export default App;
