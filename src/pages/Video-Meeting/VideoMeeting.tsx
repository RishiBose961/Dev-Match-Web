import { Input } from "@/components/ui/input";
import VideoHook from "@/hook/VideoHook/VideoHook";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCheck,
  Copy,
  Monitor,
  Phone,
  PhoneOff,
  User,
  Users,
  Video,
} from "lucide-react";
import Participant from "./Participant";
import { useParams } from "react-router";

interface VideoContainerProps {
  title: string;
  icon: React.ReactNode;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  delay: number;
  isAnimated?: boolean;
}

export default function VideoMeeting() {

  const {id} = useParams<{ id: string }>();

  
  const {
    peerId,
    status,
    connectedPeerId,
    hasRemoteVideo,
    hasLocalScreen,
    hasRemoteScreen,
    isInCall,
    copyPeerId,
    acceptCall,
    declineCall,
    startCall,
    shareScreen,
    stopAll,
    remotePeerIdValue,
    setRemotePeerIdValue,
    localVideoRef,
    remoteVideoRef,
    localScreenRef,
    remoteScreenRef,
    incomingCall,
    incomingPeerId,
    copied,
  } = VideoHook();

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className=" rounded-xl p-6 mb-8 shadow-xl border border-slate-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 w-full md:w-auto">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-white">Your ID</p>
                <p className="font-mono text-primary truncate max-w-[200px]">
                  {peerId}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyPeerId}
                className="ml-2 p-2 rounded-md hover:bg-slate-700 transition-colors"
                aria-label="Copy ID"
              >
                {copied ? (
                  <CheckCheck className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 text-slate-400" />
                )}
              </motion.button>
            </div>

            {peerId !== remotePeerIdValue ? (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Enter remote peer ID"
                  value={remotePeerIdValue}
                  onChange={(e) => setRemotePeerIdValue(e.target.value)}
                  className=" px-4 py-2 rounded-lg  border border-slate-700 focus:outline-none focus:ring-2 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCall}
                  disabled={isInCall || !remotePeerIdValue}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isInCall || !remotePeerIdValue
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  } transition-colors`}
                >
                  <Phone className="h-5 w-5" />
                  <span>Call</span>
                </motion.button>
              </div>
            ) : (
              "Please enter a remote peer ID to call"
            )}
          </div>

         

          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  status === "Idle" ? "bg-yellow-400" : "bg-green-400"
                }`}
              ></div>
              <span className="text-sm">
                Status: <span className="font-medium">{status}</span>
              </span>
              {connectedPeerId && (
                <div className="flex items-center gap-2 ml-4">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    Connected to:{" "}
                    <span className="font-mono text-primary">
                      {connectedPeerId.substring(0, 8)}...
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareScreen}
                disabled={!isInCall && !connectedPeerId}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  !isInCall && !connectedPeerId
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                } transition-colors`}
              >
                <Monitor className="h-5 w-5" />
                <span>Share Screen</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopAll}
                disabled={!isInCall && !connectedPeerId}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  !isInCall && !connectedPeerId
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500 text-white"
                } transition-colors`}
              >
                <PhoneOff className="h-5 w-5" />
                <span>End</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Video - Always visible */}
              <VideoContainer
                title="Your Video"
                icon={<Video className="h-5 w-5 text-primary" />}
                videoRef={localVideoRef}
                delay={0.3}
              />
              {/* Remote Video - Only visible when connected */}
              <AnimatePresence>
                {hasRemoteVideo && (
                  <VideoContainer
                    title="Remote Video"
                    icon={<Video className="h-5 w-5 text-blue-400" />}
                    videoRef={remoteVideoRef}
                    delay={0}
                    isAnimated={true}
                  />
                )}
              </AnimatePresence>

              {/* Your Screen - Only visible when sharing screen */}
              <AnimatePresence>
                {hasLocalScreen && (
                  <VideoContainer
                    title="Your Screen"
                    icon={<Monitor className="h-5 w-5 text-primary" />}
                    videoRef={localScreenRef}
                    delay={0}
                    isAnimated={true}
                  />
                )}
              </AnimatePresence>

              {/* Remote Screen - Only visible when remote is sharing screen */}
              <AnimatePresence>
                {hasRemoteScreen && (
                  <VideoContainer
                    title="Remote Screen"
                    icon={<Monitor className="h-5 w-5 text-blue-400" />}
                    videoRef={remoteScreenRef}
                    delay={0}
                    isAnimated={true}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          <Participant id={id ?? ""} />
        </div>
      </div>

      <AnimatePresence>
        {incomingCall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold">Incoming Call</h3>
                <p className="text-slate-400 mt-1">
                  From{" "}
                  <span className="font-mono text-primary">
                    {incomingPeerId.substring(0, 12)}...
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={declineCall}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneOff className="h-5 w-5" />
                  <span>Decline</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={acceptCall}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Accept</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoContainer({
  title,
  icon,
  videoRef,
  delay,
  isAnimated = false,
}: VideoContainerProps) {
  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={isAnimated ? "hidden" : { opacity: 0, y: 20 }}
      animate={isAnimated ? "visible" : { opacity: 1, y: 0 }}
      exit={isAnimated ? "exit" : undefined}
      variants={isAnimated ? variants : undefined}
      transition={!isAnimated ? { delay, duration: 0.5 } : undefined}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-slate-700"
      layout
    >
      <div className="p-4 flex items-center gap-2 border-b border-slate-700">
        {icon}
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="aspect-video bg-slate-900 relative">
        <video
          ref={videoRef}
          autoPlay
          muted={title.includes("Your")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-slate-500 text-sm"></div>
        </div>
      </div>
    </motion.div>
  );
}
