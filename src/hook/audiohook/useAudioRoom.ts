import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Peer, { MediaConnection } from 'peerjs';
import type { User, AudioConnection } from '@/types';

export const useAudioRoom = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [connections, setConnections] = useState<Map<string, AudioConnection>>(new Map());
  const [isAdmin, setIsAdmin] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const [speakingRequests, setSpeakingRequests] = useState<Array<{userId: string, username: string}>>([]);
  
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio context for voice detection
  const initializeAudioContext = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      localStreamRef.current = stream;
      
      // Create audio context for voice activity detection
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      
      // Start voice activity detection
      detectVoiceActivity();
      
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Voice activity detection
  const detectVoiceActivity = useCallback(() => {
    if (!analyserRef.current || !socket || !currentRoom) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const checkAudio = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      
      const isSpeaking = average > 30 && !isMuted; // Threshold for speaking detection
      
      if (isSpeaking) {
        socket.emit('speaking', { roomId: currentRoom, isSpeaking: true });
        
        // Clear existing timeout
        if (speakingTimeoutRef.current) {
          clearTimeout(speakingTimeoutRef.current);
        }
        
        // Set timeout to stop speaking indication
        speakingTimeoutRef.current = setTimeout(() => {
          socket.emit('speaking', { roomId: currentRoom, isSpeaking: false });
        }, 500);
      }
      
      requestAnimationFrame(checkAudio);
    };
    
    checkAudio();
  }, [socket, currentRoom, isMuted]);

  // Initialize socket and peer connections
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    const newPeer = new Peer();

    setSocket(newSocket);
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      console.log('Peer connected with ID:', id);
      setIsConnected(true);
    });

    newPeer.on('call', (call) => {
      // Answer incoming calls with local stream
      if (localStreamRef.current) {
        call.answer(localStreamRef.current);
        
        call.on('stream', (remoteStream) => {
          // console.log('Received remote stream from:', call.peer);
          setConnections(prev => {
            const newConnections = new Map(prev);
            const connection = newConnections.get(call.peer) || { peerId: call.peer, username: 'Unknown' };
            connection.stream = remoteStream;
            connection.call = call;
            newConnections.set(call.peer, connection);
            return newConnections;
          });
        });

        call.on('close', () => {
          // console.log('Call closed from:', call.peer);
          setConnections(prev => {
            const newConnections = new Map(prev);
            newConnections.delete(call.peer);
            return newConnections;
          });
        });
      }
    });

    // Socket event listeners
    newSocket.on('room-participants', (participantList: User[]) => {
      // console.log('Room participants:', participantList);
      setParticipants(participantList);
    });

    newSocket.on('room-joined', ({isAdmin: adminStatus }) => {
      setIsAdmin(adminStatus);
      setCanSpeak(adminStatus); // Admin can always speak
    });

    newSocket.on('user-joined', ({ userId, username, peerId, isMuted }: User) => {
      // console.log('User joined:', username);
      setParticipants(prev => {
        const exists = prev.find(p => p.userId === userId);
        if (exists) return prev;
        return [...prev, { userId, username, peerId, isMuted }];
      });

      // Call the new user
      if (localStreamRef.current && newPeer) {
        const call = newPeer.call(peerId, localStreamRef.current);
        
        call.on('stream', (remoteStream) => {
          setConnections(prev => {
            const newConnections = new Map(prev);
            newConnections.set(peerId, {
              peerId,
              username,
              stream: remoteStream,
              call
            });
            return newConnections;
          });
        });

        call.on('close', () => {
          setConnections(prev => {
            const newConnections = new Map(prev);
            newConnections.delete(peerId);
            return newConnections;
          });
        });
      }
    });

    newSocket.on('user-left', ({ userId, username }) => {
      console.log('User left:', username);
      setParticipants(prev => prev.filter(p => p.userId !== userId));
    });

    newSocket.on('user-mute-changed', ({ userId, isMuted }) => {
      setParticipants(prev => 
        prev.map(p => p.userId === userId ? { ...p, isMuted } : p)
      );
    });

    newSocket.on('user-speaking', ({ userId, isSpeaking }) => {
      setParticipants(prev => 
        prev.map(p => p.userId === userId ? { ...p, isSpeaking } : p)
      );
    });

    newSocket.on('speaking-permission-changed', ({ userId, canSpeak: userCanSpeak, grantedBy, revokedBy }) => {
      setParticipants(prev => 
        prev.map(p => p.userId === userId ? { ...p, canSpeak: userCanSpeak } : p)
      );
      
      // If it's current user, update local state
      if (userId === newSocket.id) {
        setCanSpeak(userCanSpeak);
        if (!userCanSpeak) {
          setIsMuted(true); // Force mute when permission revoked
        }
      }
      
      // Show notification
      if (grantedBy) {
        // console.log(`Speaking permission granted by ${grantedBy}`);
      } else if (revokedBy) {
        // console.log(`Speaking permission revoked by ${revokedBy}`);
      }
    });

    newSocket.on('speaking-request', ({ userId, username }) => {
      setSpeakingRequests(prev => [...prev, { userId, username }]);
    });

    newSocket.on('speaking-request-sent', () => {
      console.log('Speaking request sent to admin');
    });

    newSocket.on('admin-changed', ({ newAdminId, newAdminUsername }) => {
      setParticipants(prev => 
        prev.map(p => ({ 
          ...p, 
          isAdmin: p.userId === newAdminId,
          canSpeak: p.userId === newAdminId ? true : p.canSpeak
        }))
      );
      
      if (newAdminId === newSocket.id) {
        setIsAdmin(true);
        setCanSpeak(true);
      }
      
      console.log(`${newAdminUsername} is now the admin`);
    });

    newSocket.on('left-room', () => {
      setCurrentRoom(null);
      setParticipants([]);
      setConnections(new Map());
      setIsAdmin(false);
      setCanSpeak(false);
      setSpeakingRequests([]);
    });

    return () => {
      newSocket.disconnect();
      newPeer.destroy();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const joinRoom = useCallback(async (roomId: string, username: string) => {
    if (!socket || !peer || !isConnected) return false;

    try {
      // Initialize audio
      await initializeAudioContext();
      
      // Join room via socket
      socket.emit('join-room', {
        roomId,
        username,
        peerId: peer.id
      });

      setCurrentRoom(roomId);
      
      // Store in localStorage for persistence
      localStorage.setItem('audioRoom', JSON.stringify({
        roomId,
        username,
        timestamp: Date.now()
      }));

      return true;
    } catch (error) {
      console.error('Error joining room:', error);
      return false;
    }
  }, [socket, peer, isConnected, initializeAudioContext]);

  const leaveRoom = useCallback(() => {
    if (!socket) return;

    socket.emit('leave-room');
    
    // Clean up connections
    connections.forEach(connection => {
      if (connection.call) {
        connection.call.close();
      }
    });
    
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setConnections(new Map());
    localStorage.removeItem('audioRoom');
  }, [socket, connections]);

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current || !socket || !currentRoom || !canSpeak) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Mute/unmute local stream
    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !newMutedState;
    });

    // Notify others
    socket.emit('toggle-mute', {
      roomId: currentRoom,
      isMuted: newMutedState
    });
  }, [isMuted, socket, currentRoom, canSpeak]);

  const toggleDeafened = useCallback(() => {
    setIsDeafened(prev => !prev);
  }, []);

  const grantSpeaking = useCallback((targetUserId: string) => {
    if (!socket || !currentRoom || !isAdmin) return;
    
    socket.emit('grant-speaking', {
      roomId: currentRoom,
      targetUserId
    });
    
    // Remove from requests
    setSpeakingRequests(prev => prev.filter(req => req.userId !== targetUserId));
  }, [socket, currentRoom, isAdmin]);

  const revokeSpeaking = useCallback((targetUserId: string) => {
    if (!socket || !currentRoom || !isAdmin) return;
    
    socket.emit('revoke-speaking', {
      roomId: currentRoom,
      targetUserId
    });
  }, [socket, currentRoom, isAdmin]);

  const requestSpeaking = useCallback(() => {
    if (!socket || !currentRoom || canSpeak) return;
    
    socket.emit('request-speaking', {
      roomId: currentRoom
    });
  }, [socket, currentRoom, canSpeak]);

  return {
    socket,
    peer,
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
    requestSpeaking
  };
};