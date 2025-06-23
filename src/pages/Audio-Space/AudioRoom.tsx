import { AudioControls } from "@/components/AudioComp/AudioControls";
import ParticipantList from "@/components/AudioComp/ParticipantList";
import RoomHeader from "@/components/AudioComp/RoomHeader";
import type { AudioConnection, User } from "@/types";
import { useEffect, useRef } from "react";
interface AudioRoomProps {
  roomId: string;
  participants: User[];
  isMuted: boolean;
  isDeafened: boolean;
  connections: Map<string, AudioConnection>;
  onToggleMute: () => void;
  onToggleDeafened: () => void;
  onLeaveRoom: () => void;
  isAdmin?: boolean;
  canSpeak?: boolean;
  speakingRequests?: Array<{ userId: string; username: string }>;
  onGrantSpeaking?: (userId: string) => void;
  onRevokeSpeaking?: (userId: string) => void;
  onRequestSpeaking?: () => void;
}

const AudioRoom = ({
  roomId,
  participants,
  isMuted,
  isDeafened,
  connections,
  onToggleMute,
  onToggleDeafened,
  onLeaveRoom,
  isAdmin = false,
  canSpeak = false,
  speakingRequests = [],
  onGrantSpeaking,
  onRevokeSpeaking,
  onRequestSpeaking,
}: AudioRoomProps) => {
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Handle audio streams
  useEffect(() => {
    connections.forEach((connection, peerId) => {
      if (connection.stream) {
        let audioElement = audioElementsRef.current.get(peerId);

        if (!audioElement) {
          audioElement = new Audio();
          audioElement.autoplay = true;
          audioElementsRef.current.set(peerId, audioElement);
        }

        if (audioElement.srcObject !== connection.stream) {
          audioElement.srcObject = connection.stream;
          audioElement.volume = isDeafened ? 0 : 1;
        }
      }
    });

    // Clean up removed connections
    audioElementsRef.current.forEach((audioElement, peerId) => {
      if (!connections.has(peerId)) {
        audioElement.pause();
        audioElement.srcObject = null;
        audioElementsRef.current.delete(peerId);
      }
    });
  }, [connections, isDeafened]);

  // Update audio volume based on deafened state
  useEffect(() => {
    audioElementsRef.current.forEach((audioElement) => {
      audioElement.volume = isDeafened ? 0 : 1;
    });
  }, [isDeafened]);

  // Update page title with participant count
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `(${participants.length}) ${roomId} - Audio Room`;

    return () => {
      document.title = originalTitle;
    };
  }, [participants.length, roomId]);

  // Update URL
  useEffect(() => {
    const newUrl = `/space/${roomId}`;
    if (window.location.pathname !== newUrl) {
      window.history.pushState({}, "", newUrl);
    }
  }, [roomId]);

  return (
    <>
      <RoomHeader
        roomId={roomId}
        participantCount={participants.length}
        onLeaveRoom={onLeaveRoom}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <ParticipantList
            participants={participants}
            connections={connections}
            isAdmin={isAdmin}
            onGrantSpeaking={onGrantSpeaking}
            onRevokeSpeaking={onRevokeSpeaking}
          />
        </div>
        <div className="md:col-span-1 ring-1 rounded-2xl h-[65vh]">
          <p>sads</p>
        </div>
      </div>
      
        <AudioControls
          isMuted={isMuted}
          isDeafened={isDeafened}
          onToggleMute={onToggleMute}
          onToggleDeafened={onToggleDeafened}
          onLeaveRoom={onLeaveRoom}
          participantCount={participants.length}
          isAdmin={isAdmin}
          canSpeak={canSpeak}
          speakingRequests={speakingRequests}
          onGrantSpeaking={onGrantSpeaking}
          onRequestSpeaking={onRequestSpeaking}
        />
    </>
  );
};

export default AudioRoom;
