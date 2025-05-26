import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


interface RootState {
  auth: {
    isLoading: boolean;
    user: {
      token: string;
      _id: string;
    } | null;
  };
}
interface AcceptedButtonProps {
  senderid: string;
  sessionid: string;
  receiverid: string;
}

const AcceptedButton = ({ senderid, sessionid, receiverid }: AcceptedButtonProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: async () => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/create/room",
        {
          sender: senderid,
          receiver: receiverid,
          joinSession: sessionid,
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
      queryClient.invalidateQueries({ queryKey: ["roomaccept"] });
      queryClient.invalidateQueries({ queryKey: ["getJoinRequestById"] });
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

//   if (isPending) {
//     return <span>Loading...</span>;
//   }

  const handleSubmit = () => mutation.mutate();
  return (
    <>
      <Button onClick={handleSubmit}>
        {" "}
        <Check />
      </Button>
    </>
  );
};

export default AcceptedButton;
