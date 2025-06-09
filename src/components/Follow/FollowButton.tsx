import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
const FollowButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <motion.button
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
        className="inline-flex items-center px-2 py-2 bg-primary  cursor-pointer text-white border border-transparent 
                   rounded-lg shadow-lg transition-all duration-300 ease-out
                   hover:bg-primary hover:shadow-xl focus:outline-none  focus:ring-offset-2
                   relative overflow-hidden"
      >
        {/* Icon with smooth scaling and rotation */}
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
          <HeartHandshake className="size-5" />
        </motion.span>

        {/* Smooth width transition container */}
        <motion.div
          animate={{
            width: isHovered ? "auto" : 0,
            marginLeft: isHovered ? 12 : 0,
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
            {isHovered && (
              <motion.span
                key="button-text"
                initial={{
                  opacity: 0,
                  x: -20,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  filter: "blur(4px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.6,
                }}
                className="whitespace-nowrap font-medium"
              >
                Send Pull Request
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 rounded-lg"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.button>
    </div>
  );
};

export default FollowButton;
