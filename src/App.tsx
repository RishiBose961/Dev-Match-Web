import { Outlet } from "react-router";
import Layout from "./components/Header/Layout";
import useAuthEffect from "./components/useAuthEffect";

const App = () => {
  useAuthEffect();
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default App;
