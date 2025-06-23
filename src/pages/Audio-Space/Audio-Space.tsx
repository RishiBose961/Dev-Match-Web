import { useAudioRoom } from "@/hook/audiohook/useAudioRoom";
import { useEffect, useState } from "react";
import AudioRoom from "./AudioRoom";
import JoinRoom from "./JoinRoom";

const AudioSpace = () => {
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    roomId: string;
  } | null>(null);

  const {
    isConnected,
    currentRoom,
    participants,
    isMuted,
    isDeafened,
    connections,
    isAdmin,
    canSpeak,
    speakingRequests,
    joinRoom,
    leaveRoom,
    toggleMute,
    toggleDeafened,
    grantSpeaking,
    revokeSpeaking,
    requestSpeaking,
  } = useAudioRoom();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Space bar to toggle mute (only when in a room, can speak, and not typing in an input)
      if (
        e.code === "Space" &&
        currentRoom &&
        canSpeak &&
        e.target instanceof HTMLElement &&
        !["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentRoom, canSpeak, toggleMute]);

  // Auto-rejoin from saved data
  useEffect(() => {
    if (!isConnected || currentRoom) return;

    const saved = localStorage.getItem("audioRoom");
    if (saved) {
      try {
        const { roomId, username, timestamp } = JSON.parse(saved);
        // Auto-rejoin if saved less than 1 hour ago
        if (Date.now() - timestamp < 60 * 60 * 1000) {
          handleJoinRoom(roomId, username);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        localStorage.removeItem("audioRoom");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const handleJoinRoom = async (
    roomId: string,
    username: string
  ): Promise<boolean> => {
    const success = await joinRoom(roomId, username);
    if (success) {
      setCurrentUser({ username, roomId });
    }
    return success;
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setCurrentUser(null);
    // Reset URL to home
    window.history.pushState({}, "", "/");
  };

  // Show loading state while connecting to server
  if (!isConnected) {
    return (
      <div className=" flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to server...</p>
          <p className="text-white/60 text-sm mt-2">
            Please wait while we establish connection
          </p>
        </div>
      </div>
    );
  }

  // Show room interface if user is in a room
  if (currentRoom && currentUser) {
    return (
      <AudioRoom
        roomId={currentRoom}
        participants={participants}
        isMuted={isMuted}
        isDeafened={isDeafened}
        connections={connections}
        onToggleMute={toggleMute}
        onToggleDeafened={toggleDeafened}
        onLeaveRoom={handleLeaveRoom}
        isAdmin={isAdmin}
        canSpeak={canSpeak}
        speakingRequests={speakingRequests}
        onGrantSpeaking={grantSpeaking}
        onRevokeSpeaking={revokeSpeaking}
        onRequestSpeaking={requestSpeaking}
      />
    );
  }
  return (
    <JoinRoom 
      onJoinRoom={handleJoinRoom}
      isConnecting={!isConnected}
    />
  );
};

export default AudioSpace;
