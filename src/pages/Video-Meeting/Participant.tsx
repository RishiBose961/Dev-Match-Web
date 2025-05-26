import { Button } from "@/components/ui/button";
import GetJjoinRoom from "@/hook/getRoom/GetJjoinRoom";
import { AnimatePresence, motion } from "framer-motion";
import { Users, X } from "lucide-react";
import { useEffect, useState } from "react";



interface ParticipantProps {
  id: string;
}

const Participant = ({ id }: ParticipantProps) => {
  const [showParticipantsPanel, setShowParticipantsPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);



  const { isPending, getRoomById } = GetJjoinRoom(id) as {
    isPending: boolean;
    getRoomById: {
      sender: {
        name: string;
        email: string;
      };
      receiver: {
        name: string;
        email: string;
      };
    };
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowParticipantsPanel(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getParticipantInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const toggleParticipantsPanel = () =>
    setShowParticipantsPanel(!showParticipantsPanel);

  if (isPending) {
    return <div>Loading...</div>;
  }

 

  return (
    <div>
      {isMobile && (
        <Button
          variant={showParticipantsPanel ? "default" : "outline"}
          size="sm"
          onClick={toggleParticipantsPanel}
          className="fixed top-4 right-4 z-50 shadow-lg text-xs md:text-sm"
        >
          <Users className="h-4 w-4 mr-1 md:mr-2" />
      
        </Button>
      )}

      <AnimatePresence>
        {showParticipantsPanel && (
          <motion.div
            key="participants-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${
              isMobile
                ? "fixed inset-0 z-50 bg-gray-900"
                : "w-80 bg-gray-800 border-l border-gray-700"
            } flex flex-col w-full rounded-xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">Participants</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowParticipantsPanel(false)}
                className="h-8 w-8 p-0 lg:hidden flex"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              <div
                className="flex items-center w-full gap-3 p-3 rounded-lg
                     bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {getParticipantInitials(getRoomById?.sender?.name)}
                  </div>
             
                </div>

                <div className="flex-1 ">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {getRoomById?.sender.name}
                    </span>
                   
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {getRoomById?.sender.email}
                  </div>
                </div>
              </div>
              <div
                className="flex items-center w-full gap-3 p-3 rounded-lg
                     bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {getParticipantInitials(getRoomById?.receiver.name)}
                  </div>
                  {/* {participant.isHost && (
                        <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 bg-gray-800 rounded-full p-0.5" />
                      )} */}
                </div>

                <div className="flex-1 ">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {getRoomById?.receiver.name}
                    </span>
                   
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {getRoomById?.receiver.email}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {showParticipantsPanel && isMobile && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setShowParticipantsPanel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Participant;
