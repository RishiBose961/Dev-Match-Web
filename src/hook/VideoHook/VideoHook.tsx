import Peer, { MediaConnection } from "peerjs"
import { useEffect, useRef, useState } from "react"

const VideoHook = () => {
  const [peerId, setPeerId] = useState<string>("")
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("")
  const [status, setStatus] = useState<"Idle" | "In call">("Idle")
  const [connectedPeerId, setConnectedPeerId] = useState<string>("")
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null)
  const [incomingPeerId, setIncomingPeerId] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const [hasRemoteVideo, setHasRemoteVideo] = useState<boolean>(false)
  const [hasLocalScreen, setHasLocalScreen] = useState<boolean>(false)
  const [hasRemoteScreen, setHasRemoteScreen] = useState<boolean>(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localScreenRef = useRef<HTMLVideoElement>(null)
  const remoteScreenRef = useRef<HTMLVideoElement>(null)

  const peer = useRef<Peer | null>(null)
  const mainCall = useRef<MediaConnection | null>(null)
  const screenCall = useRef<MediaConnection | null>(null)
  const localStream = useRef<MediaStream | null>(null)
  const screenStream = useRef<MediaStream | null>(null)

  useEffect(() => {
    peer.current = new Peer("", { secure: true })

    peer.current.on("open", (id: string) => setPeerId(id))

    peer.current.on("call", (call: MediaConnection) => {
      if (call.metadata?.type === "screen") {
        setHasRemoteScreen(true)
        call.answer()
        call.on("stream", (remoteScreenStream: MediaStream) => {
          setTimeout(() => {
            if (remoteScreenRef.current) {
              remoteScreenRef.current.srcObject = remoteScreenStream
            }
          }, 100)
        })
        call.on("close", () => {
          if (remoteScreenRef.current) {
            remoteScreenRef.current.srcObject = null
          }
          setHasRemoteScreen(false)
        })
      } else {
        setIncomingCall(call)
        setIncomingPeerId(call.peer)
      }
    })

    return () => {
      peer.current?.destroy()
    }
  }, [])

  const copyPeerId = () => {
    navigator.clipboard.writeText(peerId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const acceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStream.current = stream
      if (localVideoRef.current) localVideoRef.current.srcObject = stream

      setHasRemoteVideo(true)

      incomingCall?.answer(stream)
      setStatus("In call")
      setConnectedPeerId(incomingCall?.peer || "")

      incomingCall?.on("stream", (remoteStream: MediaStream) => {
        setTimeout(() => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream
          }
        }, 100)
      })

      incomingCall?.on("close", stopAll)

      mainCall.current = incomingCall
      setIncomingCall(null)
    } catch (err) {
      console.error("Error accepting call:", err)
      setIncomingCall(null)
    }
  }

  const declineCall = () => {
    setIncomingCall(null)
    setStatus("Idle")
  }

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStream.current = stream
      if (localVideoRef.current) localVideoRef.current.srcObject = stream

      setHasRemoteVideo(true)

      const call = peer.current?.call(remotePeerIdValue, stream, { metadata: { type: "webcam" } })

      call?.on("stream", (remoteStream: MediaStream) => {
        setTimeout(() => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream
            setStatus("In call")
          }
        }, 100)
      })

      call?.on("close", stopAll)

      mainCall.current = call || null
      setConnectedPeerId(remotePeerIdValue)
    } catch (err) {
      console.error("Error starting call:", err)
    }
  }

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenStream.current = stream
      setHasLocalScreen(true)

      setTimeout(() => {
        if (localScreenRef.current) {
          localScreenRef.current.srcObject = stream
        }
      }, 100)

      const call = peer.current?.call(connectedPeerId || remotePeerIdValue, stream, {
        metadata: { type: "screen" },
      })

      screenCall.current = call || null

      stream.getVideoTracks()[0].onended = () => {
        call?.close()
        if (localScreenRef.current) {
          localScreenRef.current.srcObject = null
        }
        setHasLocalScreen(false)
      }
    } catch (err) {
      console.error("Screen share error:", err)
    }
  }

  const stopAll = () => {
    mainCall.current?.close()
    screenCall.current?.close()

    localStream.current?.getTracks().forEach((track) => track.stop())
    screenStream.current?.getTracks().forEach((track) => track.stop())

    if (localVideoRef.current) localVideoRef.current.srcObject = null
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
    if (localScreenRef.current) localScreenRef.current.srcObject = null
    if (remoteScreenRef.current) remoteScreenRef.current.srcObject = null

    setHasRemoteVideo(false)
    setHasLocalScreen(false)
    setHasRemoteScreen(false)
    setConnectedPeerId("")
    setStatus("Idle")
  }

  const isInCall = status === "In call"

  return {
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
    setRemotePeerIdValue, // exposed to allow setting peerId input externally
    localVideoRef,
    remoteVideoRef,
    localScreenRef,
    remoteScreenRef,
    incomingCall,
    incomingPeerId,
    copied,
  }
}

export default VideoHook
