import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "../ui/switch";
import GetAvaliHook from "@/hook/getAvaliable/GetAvaliHook";
import axios from "axios";

const DashBoardCreate = () => {
  const [roomname, setRoomname] = useState("");
  const [availabilityEnabled, setAvailabilityEnabled] = useState(false);

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
        // add other user properties as needed
        [key: string]: string | number | boolean | undefined;
      } | null;
    };
  }

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const queryClient = useQueryClient();

  const token = useMemo(() => user?.token || "", [user]);

  // Sync availability state from backend
  useEffect(() => {
    if (getAvaliable?.available !== undefined) {
      setAvailabilityEnabled(getAvaliable.available);
    }
  }, [getAvaliable]);

  // Update availability (ON/OFF)
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

  // Go live (creates live session)
  const createLiveSession = useMutation({
    mutationFn: async (data: { roomname: string }) => {
      if (!token) throw new Error("User not authenticated");
      const res = await axios.post(
        "http://localhost:5000/api/create/golive",
        { roomname: data.roomname },
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
      queryClient.invalidateQueries({ queryKey: ["live"] });
      alert("Live session started!");
    },
    onError: (error: unknown) => {
      const err = error instanceof Error ? error.message : String(error);
      console.error("Go Live failed:", err);
      alert("Go Live failed. Check console.");
    },
  });

  // Handle button click
  const handleGoLiveToggle = async () => {
    const goingLive = !availabilityEnabled;

    // Prevent live creation without room name
    if (goingLive && !roomname.trim()) {
      alert("Please enter a room name to go live.");
      return;
    }

    try {
      setAvailabilityEnabled(goingLive);
      await updateAvailability.mutateAsync(goingLive);

      if (goingLive) {
        await createLiveSession.mutateAsync({ roomname });
      } else {
        alert("You have ended your live session.");
      }
    } catch (error) {
      console.error("Toggle failed", error);
    }
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
