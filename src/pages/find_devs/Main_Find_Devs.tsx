import { ScrollArea } from "@/components/ui/scroll-area";
import GetAllUser from "@/hook/getAllUser/GetAllUser";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Devs from "./Devs";
import ProjectShow from "./ProjectShow";
import { Link } from "react-router";

const Main_Find_Devs = () => {
  interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    username: string;
  }

  const { isPending, getuser } = GetAllUser() as {
    isPending: boolean;
    getuser: { users: User[] } | null;
  };

  const { isAuthenticated, user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: { name: string };
      };
    }) => state.auth
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      
      {/* Desktop Layout */}
      <div className="flex justify-center items-center">
        {/* <div className="hidden lg:block">
    <Search_Find_Devs />
  </div> */}
        <div className="w-full max-w-4xl mb-20">
            <div>
            {!isAuthenticated ? (
              <p className="font-bold mb-2">Sign in to find developers <Link to={"/login"}> <span className="text-blue-500 hover:text-blue-700 underline">here</span></Link></p>
            ) : (
              <p className="font-bold mb-2">Hi, {user?.name}</p>
            )}
          </div>
          <ProjectShow/>
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ScrollArea className=" rounded-md  p-4 overflow-y-auto scroll-smooth">
              {getuser?.users?.map((item, index) => (
                <Devs item={item} index={index} key={index} />
              ))}
            </ScrollArea>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Main_Find_Devs;
