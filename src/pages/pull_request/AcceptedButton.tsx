import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";

interface AcceptedButtonProps {
  id: string;
}

const AcceptedButton = ({ id }: AcceptedButtonProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/accept",
        {
          requestId: id,
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
      queryClient.invalidateQueries({ queryKey: ["getNotifys"] });
      alert("Request accepted successfully!");
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Request failed:", error.message);
      } else {
        console.error("Request failed:", error);
      }
      alert("Error sending request.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div>
      {" "}
      <Button
        onClick={handleSubmit}
        disabled={!isAuthenticated}
        size="sm"
        className="bg-primary hover:bg-orange-700/90 text-white"
      >
        <Check className="h-4 w-4 mr-1" />
        Accept
      </Button>
    </div>
  );
};

export default AcceptedButton;
