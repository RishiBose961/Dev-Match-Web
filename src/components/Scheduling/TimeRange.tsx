import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    isLoading: boolean;
    user: {
      token: string;
    } | null;
  };
}

const TimeRange = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionType, setSessionType] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: {
      startTime: string;
      endTime: string;
      sessionType: string;
    }) => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/createtimeschedule",
        {
          statingdatetime: data.startTime,
          endingdatetime: data.endTime,
          session: data.sessionType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      alert("Schedule created successfully!");
      setStartTime("");
      setEndTime("");
      setSessionType("");
      setDuration("");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Schedule creation failed:", error.message);
      } else {
        console.error("Schedule creation failed:", error);
      }
      alert("Error creating schedule. Check console.");
    },
  });

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffMs = end.getTime() - start.getTime();

      if (diffMs < 0) {
        setDuration("End time must be after start time.");
      } else {
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const minutes = diffMins % 60;
        setDuration(`${hours} hour(s) and ${minutes} minute(s)`);
      }
    } else {
      setDuration("");
    }
  }, [startTime, endTime]);

  const handleSubmit = () => {
    if (!startTime || !endTime || !sessionType) {
      alert("Please fill in all fields.");
      return;
    }

    if (new Date(endTime) < new Date(startTime)) {
      alert("End time must be after start time.");
      return;
    }

    mutation.mutate({ startTime, endTime, sessionType });
  };

  return (
    <div>
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Time Range
        </h3>
        <Separator className="mb-4" />

        <div className="space-y-2">
          <Label htmlFor="start-time" className="text-xs">
            Starting Date/Time
          </Label>
          <Input
            id="start-time"
            type="datetime-local"
            value={startTime}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="end-time" className="text-xs">
            Ending Date/Time
          </Label>
          <Input
            id="end-time"
            type="datetime-local"
            value={endTime}
            min={startTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          {startTime && endTime && new Date(endTime) < new Date(startTime) && (
            <p className="text-red-500 text-xs">
              End time must be after start time.
            </p>
          )}
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="duration" className="text-xs">
            Calculated Duration
          </Label>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-slate-400" />
            {duration ? (
              <p>{duration}</p>
            ) : (
              "Select start and end time"
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium pt-6 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Session Details
        </h3>
        <Separator className="mb-4" />

        <div className="space-y-2">
          <Label htmlFor="session-type" className="text-xs">
            Session Type
          </Label>
          <Select
            onValueChange={(value) => setSessionType(value)}
            value={sessionType}
          >
            <SelectTrigger
              id="session-type"
              className="w-full focus-visible:ring-slate-400"
            >
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pair Programming">Pair Programming</SelectItem>
              <SelectItem value="Code Review">Code Review</SelectItem>
              <SelectItem value="Mentoring">Mentoring</SelectItem>
              <SelectItem value="Project Collaboration">
                Project Collaboration
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-end-safe">
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Submit Schedule"}
        </Button>
      </div>
    </div>
  );
};

export default TimeRange;
