import { Button } from "@/components/ui/button";
import { Mic, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

interface JoinRoomProps {
  onJoinRoom: (roomId: string, username: string) => Promise<boolean>;
  isConnecting?: boolean;
}

const JoinRoom = ({ onJoinRoom, isConnecting }: JoinRoomProps) => {
  const location = useLocation();

  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { username: string };
      };
    }) => state.auth
  );
  const [username, setUsername] = useState(user?.username || "");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved data and URL params
  useEffect(() => {
    const roomFromUrl = location?.pathname.split("/")[2];

    // Check localStorage
    const saved = localStorage.getItem("audioRoom");
    if (saved) {
      try {
        const {
          roomId: savedRoom,
          username: savedUsername,
          timestamp,
        } = JSON.parse(saved);
        // Use saved data if it's less than 24 hours old
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setUsername(savedUsername || "");
          setRoomId(roomFromUrl || savedRoom || "");
        }
      } catch (e) {
        console.error("Error parsing saved room data:", e);
      }
    } else if (roomFromUrl && roomFromUrl !== "/") {
      setRoomId(roomFromUrl);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) {
      setError("Please enter both username and room name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await onJoinRoom(roomId.trim(), username.trim());
      if (!success) {
        setError(
          "Failed to join room. Please check your microphone permissions."
        );
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred while joining the room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div  className=" flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Coder Space</h1>
          <p className="text-purple-200">Join or create a voice chat room</p>
        </div>

        {/* Join Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
                maxLength={30}
                disabled
              />
            </div>

            {/* Room ID Input */}
            <div>
              <label
                htmlFor="roomId"
                className="block text-sm font-medium text-white mb-2"
              >
                Room ID
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter room name"
                  maxLength={50}
                  disabled={isLoading || isConnecting}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Microphone Permission Note */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-blue-200" />
                <p className="text-blue-200 text-sm">
                  Microphone access required for voice chat
                </p>
              </div>
            </div>

            {/* Join Button */}
            <Button
              type="submit"
              disabled={
                isLoading || isConnecting || !username.trim() || !roomId.trim()
              }
              className="w-full h-12 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading || isConnecting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                "Join Room"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
