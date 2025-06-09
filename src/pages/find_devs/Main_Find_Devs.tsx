"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import GetAllUser from "@/hook/getAllUser/GetAllUser";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Devs from "./Devs";
import Recom_Dev from "@/components/recommadation/Recom_Dev";

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
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="space-y-4">
        {!isAuthenticated ? (
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold ">
              Please{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                log in
              </Link>{" "}
              to find amazing developers.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 " />
            <p className="text-lg font-semibold ">
              Hi, {user?.name}! Find amazing developers below.
            </p>
          </div>
        )}
      </div>

      {/* Developers Grid */}
      <ScrollArea className="h-[800px] rounded-xl p-2">
        <Recom_Dev />

        {getuser?.users && getuser.users.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3">
            {getuser.users.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className=" break-inside-avoid"
              >
                <Devs item={item} index={index} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No developers found</h3>
            <p className="text-gray-500">
              Check back later for new developers to connect with.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Main_Find_Devs;
