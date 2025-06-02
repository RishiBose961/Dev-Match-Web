import DateTimePicker from "@/components/Join_Req/datetime-picker";
import { Button } from "@/components/ui/button";
import GetScheduleEvery from "@/hook/getTimeSchedulling/GetScheduleEvery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

interface RootState {
  auth: {
    isLoading: boolean;
    user: {
      token: string;
      _id: string;
    } | null;
  };
}

const JoinRequest = () => {
  const { id } = useParams();

  const { user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();
  const { isPending, getEveryTimeSchedule } = GetScheduleEvery(id) as {
    isPending: boolean;
    getEveryTimeSchedule: {
      statingdatetime: string;
      endingdatetime: string;
      session: string;
      postedBy: string;
    };
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/create/joinrequest",
        {
          senderequest: user?._id,
          postedBy: getEveryTimeSchedule?.postedBy,
          dateflexibility: getEveryTimeSchedule?.statingdatetime,
          timeflexibility: getEveryTimeSchedule?.endingdatetime,
          session: getEveryTimeSchedule?.session,
          joinid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return console.log(res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joinsent"] });
      alert("Join Request sent successfully!");
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

  if (isPending) {
    return <span>Loading...</span>;
  }

  const handleSubmit = () => mutation.mutate();

  // Check if time is expired

  const endingDateTime = getEveryTimeSchedule?.endingdatetime;

  if (!endingDateTime) {
    return (
      <div className="mx-auto text-center mt-10 space-y-4">
        No ending date time available
      </div>
    );
  }

  const date = new Date(endingDateTime);
  const endingDateStr = date?.toISOString()?.split("T")[0];

  const now = new Date();
  const nowStr = now?.toISOString()?.split("T")[0];

  const isExpired = nowStr > endingDateStr;

  return (
    <div className=" mx-auto max-w-sm mt-10 space-y-4">
      <p className="mt-4 ">
        Session ID: <span className="text-primary">{id}</span>
      </p>
      <DateTimePicker
        enddate={getEveryTimeSchedule?.endingdatetime}
        startdate={getEveryTimeSchedule?.statingdatetime}
      />

      <div className="space-y-4">
        <p className="font-bold ">
          Session Type :{" "}
          <span className=" text-primary">{getEveryTimeSchedule?.session}</span>
        </p>
      </div>

      {isExpired ? (
        <p className="text-red-500 text-center">Session Expired</p>
      ) : getEveryTimeSchedule?.postedBy === user?._id ? (
       <p className="text-red-500 text-center">You can't join your own session</p> 
      ) : (
        <Button className="w-full" onClick={handleSubmit}>
          Join Session
        </Button>
      )}
    </div>
  );
};

export default JoinRequest;
