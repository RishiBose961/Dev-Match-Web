import type { MediaConnection } from "peerjs";

export interface User {
  userId: string;
  username: string;
  peerId: string;
  isMuted: boolean;
  isSpeaking?: boolean;
  isAdmin?: boolean;
  canSpeak?: boolean;
    close?: unknown;
}

export interface Room {
  roomId: string;
  participantCount: number;
  adminId?: string;
}

export interface AudioConnection {
  peerId: string;
  username: string;
  stream?: MediaStream;
  call?: MediaConnection;
  
}