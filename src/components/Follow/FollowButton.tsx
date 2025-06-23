import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, Loader2, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Getacceptedhook from "@/hook/GetAccepted/Getacceptedhook";

interface FollowButtonProps {
  recerid: string;
}

const FollowButton = ({ recerid }: FollowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );

  const queryClient = useQueryClient();

  const { isPending, getaccept } = Getacceptedhook(recerid) as {
    isPending: boolean;
    getaccept: { status: string };
  };

  const requestStatus = getaccept?.status;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/createsendrequest",
        {
          receiverId: recerid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getaccepte"] });
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Request failed:", error.message);
      } else {
        console.error("Request failed:", error);
      }
      alert("Error sending request.");
    },
  });

  const handleSubmit = () => {
    if (requestStatus === "No request found") {
      mutation.mutate();
    }
  };

  const userinfo = user?._id === recerid;

  const getButtonLabel = () => {
    if (requestStatus === "Accepted") return "Accepted";
    if (requestStatus === "Please wait") return "Please wait";
    return "Send Pull Request";
  };

  if (isPending && isAuthenticated) {
    return (
      <button
        disabled
        className="inline-flex items-center px-3 py-2 bg-gray-300 text-gray-700 border border-transparent rounded-lg shadow-lg cursor-not-allowed"
      >
        <Loader2 className="size-5 animate-spin" />
      </button>
    );
  }
  const getIcon = () => {
    if (requestStatus === "Accepted")
      return <Check className="size-5 text-green-500" />;
    if (requestStatus === "Please wait")
      return <Loader2 className="size-5 text-yellow-400 animate-spin" />;
    return <HeartHandshake className="size-5 text-white" />;
  };

  const isDisabled =
    requestStatus === "Accepted" || requestStatus === "Please wait";

  if (userinfo) return null;

  return (
    <>
      {isAuthenticated ? (
        <motion.button
          onClick={handleSubmit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          }}
          disabled={isDisabled}
          className={`inline-flex items-center px-3 py-2 bg-primary text-white border border-transparent 
                    rounded-lg shadow-lg transition-all duration-300 ease-out
                    hover:bg-primary hover:shadow-xl focus:outline-none focus:ring-offset-2
                    relative overflow-hidden ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
        >
          <motion.span
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? -8 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              mass: 0.5,
            }}
            className="flex-shrink-0 z-10"
          >
            {getIcon()}
          </motion.span>

          <motion.div
            animate={{
              width: isHovered || isDisabled ? "auto" : 0,
              marginLeft: isHovered || isDisabled ? 12 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {(isHovered || isDisabled) && (
                <motion.span
                  key="button-text"
                  initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.6,
                  }}
                  className="whitespace-nowrap font-medium"
                >
                  {getButtonLabel()}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 rounded-lg"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.button>
      ) : (
        ""
      )}
    </>
  );
};

export default FollowButton;
