import GetAvaliHook from "@/hook/getAvaliable/GetAvaliHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const DashBoardCreate = () => {
  const [roomname, setRoomname] = useState("");
  const [roomid, setRoomid] = useState("");
  const [availabilityEnabled, setAvailabilityEnabled] = useState(false);

  const navigate = useNavigate();
  const hookResult = GetAvaliHook();
  const getAvaliable =
    hookResult && "getAvaliable" in hookResult ? hookResult.getAvaliable : null;
  const isPending =
    hookResult && "isPending" in hookResult ? hookResult.isPending : false;

  interface RootState {
    auth: {
      isAuthenticated: boolean;
      user: {
        token?: string;
        [key: string]: string | number | boolean | undefined;
      } | null;
    };
  }

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const queryClient = useQueryClient();

  const token = useMemo(() => user?.token || "", [user]);

  useEffect(() => {
    if (getAvaliable?.available !== undefined) {
      setAvailabilityEnabled(getAvaliable.available);
    }
  }, [getAvaliable]);

  const updateAvailability = useMutation({
    mutationFn: async (available: boolean) => {
      const response = await fetch(
        "http://localhost:5000/api/createavaliable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ available }),
        }
      );
      if (!response.ok) throw new Error("Failed to update availability");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAvaliableInfos"] });
      queryClient.invalidateQueries({ queryKey: ["getbyidavaliableInfos"] });
    },
  });

  const createLiveSession = useMutation({
    mutationFn: async (data: { roomname: string; roomid: string }) => {
      if (!token) throw new Error("User not authenticated");
      const res = await axios.post(
        "http://localhost:5000/api/create/golive",
        { roomname: data.roomname, roomid: data.roomid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDashBoard"] });
      navigate(`/space/${roomid}`);
      alert("Live session started!");
    },
    onError: (error: unknown) => {
      const err = error instanceof Error ? error.message : String(error);
      console.error("Go Live failed:", err);
      alert("Go Live failed. Check console.");
    },
  });

  const handleGoLiveToggle = async () => {
    const goingLive = !availabilityEnabled;

    if (goingLive && !roomname.trim()) {
      alert("Please enter a room name to go live.");
      return;
    }

    try {
      let finalRoomId = roomid;
      if (goingLive && !roomid.trim()) {
        const words = [
          "chat",
          "talk",
          "voice",
          "room",
          "space",
          "hub",
          "lounge",
          "cafe",
        ];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomNum = Math.floor(Math.random() * 1000);
        finalRoomId = `${randomWord}-${randomNum}`;
        setRoomid(finalRoomId);
      }

      setAvailabilityEnabled(goingLive);
      await updateAvailability.mutateAsync(goingLive);

      if (goingLive) {
        await createLiveSession.mutateAsync({ roomname, roomid: finalRoomId });
      } else {
        alert("You have ended your live session.");
      }
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  const generateRoomId = () => {
    const words = [
      "chat",
      "talk",
      "voice",
      "room",
      "space",
      "hub",
      "lounge",
      "cafe",
    ];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    setRoomid(`${randomWord}-${randomNum}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label>Room Name</Label>
          <Input
            id="roomname"
            name="roomname"
            placeholder="Enter your Room name"
            required
            value={roomname}
            onChange={(e) => setRoomname(e.target.value)}
            disabled={availabilityEnabled}
          />
        </div>
        <div className="space-y-2">
          <Label>Room Id</Label>
          <div className="flex justify-center">
            <Input
              id="roomid"
              name="roomid"
              placeholder="Enter Room ID or Generate"
              className="mx-2"
              required
              value={roomid}
              onChange={(e) => setRoomid(e.target.value)}
              disabled={availabilityEnabled}
            />
            <Button type="button" onClick={generateRoomId}>
              Generate
            </Button>
          </div>
        </div>
        <div>
          <Label>Your Availability</Label>
          <div className="flex items-center mt-2 space-x-2 w-full ml-2 p-2 rounded-full shadow-sm border border-slate-100">
            {isAuthenticated && (
              <>
                <Switch
                  id="availability-mode"
                  checked={availabilityEnabled}
                  disabled
                  className="data-[state=checked]:bg-emerald-500"
                />
                <Label
                  htmlFor="availability-mode"
                  className={`text-sm font-medium ${
                    availabilityEnabled ? "text-emerald-600" : "text-orange-500"
                  }`}
                >
                  {availabilityEnabled ? "Available" : "Unavailable"}
                </Label>
              </>
            )}
          </div>
        </div>

        <div>
          <Label>Go Live</Label>
          <Button
            className={`w-full mt-2 ${
              availabilityEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
            disabled={
              isPending ||
              updateAvailability.isPending ||
              createLiveSession.isPending
            }
            onClick={handleGoLiveToggle}
          >
            {updateAvailability.isPending || createLiveSession.isPending
              ? "Processing..."
              : availabilityEnabled
              ? "End Live"
              : "Go Live"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCreate;
