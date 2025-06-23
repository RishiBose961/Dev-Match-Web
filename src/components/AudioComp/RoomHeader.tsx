import { Check, Copy, LogOut } from "lucide-react";
import { useState } from "react";

interface RoomHeaderProps {
  roomId: string;
  participantCount: number;
  onLeaveRoom: () => void;
}

const RoomHeader = ({
  roomId,
  onLeaveRoom,
}: RoomHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const copyRoomLink = async () => {
    const url = `${window.location.origin}/space/${roomId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="bg-white/80 mb-4 dark:bg-white/10 dark:backdrop-blur-lg dark:border-white/20 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:shadow-2xl shadow-lg transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Room Info */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              {roomId}
            </h1>
      
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Copy Link Button */}
          <button
            onClick={copyRoomLink}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-white/20 hover:bg-gray-200 dark:hover:bg-white/30 text-black dark:text-white rounded-lg transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Share Link</span>
              </>
            )}
          </button>

          {/* Leave Room Button */}
          <button
            onClick={onLeaveRoom}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 text-red-600 dark:text-red-200 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </div>

      {/* Room URL Display */}
    </div>
  );
};

export default RoomHeader;
