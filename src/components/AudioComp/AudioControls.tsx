"use client"

import {
  Crown,
  Hand,
  Mic,
  MicOff,
  Users,
  Volume2,
  VolumeX,
  Bell,
} from "lucide-react"
import React from "react"

interface AudioControlsProps {
  isMuted: boolean
  isDeafened: boolean
  onToggleMute: () => void
  onToggleDeafened: () => void
  onLeaveRoom: () => void
  participantCount: number
  isAdmin?: boolean
  canSpeak?: boolean
  onRequestSpeaking?: () => void
  speakingRequests?: Array<{ userId: string; username: string }>
  onGrantSpeaking?: (userId: string) => void
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isMuted,
  isDeafened,
  onToggleMute,
  onToggleDeafened,
  isAdmin = false,
  canSpeak = false,
  onRequestSpeaking,
  speakingRequests = [],
  onGrantSpeaking,
  participantCount,
}) => {
  const [showRequests, setShowRequests] = React.useState(false)

  return (
    <>
      {/* Speaking Requests Popup */}
      {isAdmin && speakingRequests.length > 0 && showRequests && (
        <div className="fixed top-3 w-96 right-10 bg-yellow-500/10 backdrop-blur-lg rounded-2xl p-4 border border-yellow-500/20 shadow-2xl z-50">
          <div className="flex items-center  justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center">
              <Hand className="w-4 h-4 mr-2 text-yellow-300" />
              Speaking Requests ({speakingRequests.length})
            </h3>
            <button onClick={() => setShowRequests(false)} className="text-white/60 hover:text-white text-sm">
              ✕
            </button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {speakingRequests.map((request) => (
              <div key={request.userId} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                <span className="text-white text-sm">{request.username}</span>
                <button
                  onClick={() => onGrantSpeaking?.(request.userId)}
                  className="px-2 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded text-xs"
                >
                  Grant
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0  bg-black/80 w-fit backdrop-blur-lg border-t border-white/10 shadow-2xl z-40">
        <div className="px-4 py-3">
          {/* Status Bar */}
          <div className="flex items-center justify-center mb-3 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {isAdmin ? (
                  <Crown className="w-3 h-3 mr-1 text-yellow-300" />
                ) : (
                  <Users className="w-3 h-3 mr-1 text-purple-300" />
                )}
                <span className={`${isAdmin ? "text-yellow-300" : "text-purple-300"}`}>
                  {isAdmin ? "Admin" : "Participant"}
                </span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${canSpeak ? "bg-green-300" : "bg-red-300"}`} />
                <span className={`${canSpeak ? "text-green-300" : "text-red-300"}`}>
                  {canSpeak ? "Can Speak" : "Listener"}
                </span>
              </div>
            </div>
            <div className="flex items-center mx-3 text-white/60">
              <Users className="w-3 h-3 mr-1" />
              <span>{participantCount}</span>
            </div>
          </div>

          {/* Bottom Centered Controls */}
          <div className="flex justify-center items-center space-x-6">
            {/* Mute (Speakers only) */}
            {canSpeak && (
              <button
                onClick={onToggleMute}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                  isMuted
                    ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/40"
                    : "bg-green-500/20 hover:bg-green-500/30 border border-green-500/40"
                }`}
              >
                {isMuted ? <MicOff className="text-red-300" /> : <Mic className="text-green-300" />}
              </button>
            )}

            {/* Request (Non-speakers only) */}
            {!canSpeak && !isAdmin && (
              <button
                onClick={onRequestSpeaking}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-400 transition"
              >
                <Hand className="text-white" />
              </button>
            )}

            {/* Deafen Toggle */}
            <button
              onClick={onToggleDeafened}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                isDeafened
                  ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/40"
                  : "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40"
              }`}
            >
              {isDeafened ? (
                <VolumeX className="text-red-300" />
              ) : (
                <Volume2 className="text-blue-300" />
              )}
            </button>

            {/* Speaking Requests Notification (Admin only) */}
            {isAdmin && speakingRequests.length > 0 && (
              <button
                onClick={() => setShowRequests(!showRequests)}
                className="relative w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 transition"
              >
                <Bell className="text-yellow-300" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {speakingRequests.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Padding to prevent overlap */}
      <div className="h-20" />
    </>
  )
}
