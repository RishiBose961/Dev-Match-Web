import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UseNotification from "@/hook/getNotify/UseNotification";
import { Mail, X } from "lucide-react";
import AcceptedButton from "./AcceptedButton";

const PullRequest = () => {
  const { isPending, getNotify } = UseNotification() as {
    isPending: boolean;
    getNotify: {
      _id: string;
      senderId: { username: string; email: string; image: string };
      status: string;
    }[];
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!getNotify || getNotify.length === 0) {
    return <div>No Pull Request found.</div>;
  }

  return (
    <>
      {getNotify?.map(
        (
          item: {
            _id: string;
            senderId: { username: string; email: string; image: string };
            status: string;
          },
          index: number
        ) => (
          <div className="max-w-5xl mx-auto" key={index}>
            <div className="w-full max-w-5xl  backdrop-blur-sm rounded-lg shadow-lg border mb-2 border-gray-400 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4 w-full">
                {/* User Info Section */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-100 bg-gradient-to-r from-emerald-400 to-cyan-400">
                    <AvatarImage
                      src={item.senderId.image || "/placeholder.svg"}
                      alt={item.senderId.username}
                    />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {item.senderId.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium ">
                      {item?.senderId?.username}
                    </span>
                    <div className="flex items-center text-xs ">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{item?.senderId?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`bg-yellow-100 text-yellow-800 border-yellow-200`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
                {/* Actions Section */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <AcceptedButton id={item?._id} />
                </div>
              </div>
            </div>
          </div>
        )
      )}{" "}
    </>
  );
};

export default PullRequest;
