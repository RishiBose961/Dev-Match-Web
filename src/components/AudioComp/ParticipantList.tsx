import type { AudioConnection, User as UserType } from "@/types";
import { Check, Crown, User, X } from "lucide-react";

interface ParticipantListProps {
  participants: UserType[];
  connections: Map<string, AudioConnection>;
  isAdmin?: boolean;
  onGrantSpeaking?: (userId: string) => void;
  onRevokeSpeaking?: (userId: string) => void;
}

const ParticipantList = ({
  participants,
  isAdmin = false,
  onGrantSpeaking,
  onRevokeSpeaking,
}: ParticipantListProps) => {
  return (
    <div className="backdrop-blur-lg rounded-2xl p-6 border border-gray-200/20 dark:border-white/20
     shadow-2xl bg-white/10 dark:bg-black/10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Participants ({participants.length})
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {participants.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <User className="w-12 h-12 text-gray-400 dark:text-white/40 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-white/60">
              No participants yet
            </p>
            <p className="text-gray-500 dark:text-white/40 text-sm">
              Waiting for others to join...
            </p>
          </div>
        ) : (
          participants.map((participant) => {
            return (
              <div
                key={`${participant.userId}-${participant.isMuted}`}
                className={`relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  participant.isSpeaking
                    ? "bg-gradient-to-b from-green-500/30 to-blue-500/30 border-2 border-green-400/60 shadow-lg shadow-green-500/20 scale-[1.02] dark:from-green-400/20 dark:to-blue-400/20"
                    : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-200/50 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10"
                }`}
              >
                {participant.isSpeaking && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-green-400/20 to-blue-400/20 animate-pulse dark:from-green-400/15 dark:to-blue-400/15"></div>
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-b from-green-400/30 to-blue-400/30 blur-sm animate-pulse dark:from-green-400/20 dark:to-blue-400/20"></div>
                  </>
                )}

                {isAdmin && !participant.isAdmin && (
                  <div className="absolute top-2 right-2 z-20">
                    {participant.canSpeak ? (
                      <button
                        onClick={() => onRevokeSpeaking?.(participant.userId)}
                        className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors dark:bg-red-400/20 dark:hover:bg-red-400/30"
                        title="Revoke speaking permission"
                      >
                        <X className="w-3 h-3 text-red-600 dark:text-red-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onGrantSpeaking?.(participant.userId)}
                        className="p-1 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-colors dark:bg-green-400/20 dark:hover:bg-green-400/30"
                        title="Grant speaking permission"
                      >
                        <Check className="w-3 h-3 text-green-600 dark:text-green-300" />
                      </button>
                    )}
                  </div>
                )}

                <div className="relative flex flex-col items-center space-y-3 z-10 w-full">
                  <div
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                      participant.isSpeaking
                        ? "bg-gradient-to-br from-green-400 to-blue-500 shadow-lg shadow-green-400/50 scale-110 dark:shadow-green-400/30"
                        : participant.isAdmin
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : participant.canSpeak
                        ? "bg-gradient-to-br from-purple-400 to-pink-400"
                        : "bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700"
                    }`}
                  >
                    <User className="w-8 h-8 text-white" />
                    {participant.isAdmin && (
                      <div className="absolute -top-2 -right-1">
                        <Crown className="w-5 h-5 text-yellow-300 dark:text-yellow-200" />
                      </div>
                    )}
                    {participant.isSpeaking && (
                      <>
                        <div className="absolute -inset-3 border-2 border-green-400 dark:border-green-300 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute -inset-2 border border-green-300 dark:border-green-200 rounded-full animate-pulse"></div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 dark:bg-green-300 rounded-full animate-bounce shadow-lg">
                          <div className="absolute inset-1 bg-green-300 dark:bg-green-200 rounded-full animate-pulse"></div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col items-center space-y-2 w-full">
                    <div className="flex flex-col items-center space-y-1">
                      <p
                        className={`font-medium text-center transition-all duration-300 text-gray-900 dark:text-white ${
                          participant.isSpeaking ? "text-lg" : ""
                        }`}
                      >
                        {participant.username}
                      </p>
                      <div className="flex flex-col items-center space-y-1">
                        {participant.isAdmin && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full border border-yellow-500/30">
                            Admin
                          </span>
                        )}
                        {!participant.canSpeak && !participant.isAdmin && (
                          <span className="text-xs bg-red-500/20 text-red-700 dark:text-red-300 px-2 py-1 rounded-full border border-red-500/30">
                            Listener
                          </span>
                        )}
                      </div>
                    </div>

                    {participant.isSpeaking && (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-1">
                          {[3, 4, 2, 5, 3].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 bg-green-500 dark:bg-green-300 rounded-full animate-pulse"
                              style={{
                                height: `${h * 0.25}rem`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-green-600 dark:text-green-300 text-sm font-medium animate-pulse">
                          Speaking
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {participants.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200/20 dark:border-white/20">
          <p className="text-gray-600 dark:text-white/60 text-sm text-center">
            Share the room link to invite more people
          </p>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;
