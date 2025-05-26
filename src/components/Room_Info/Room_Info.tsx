import GetRoomJoin from "@/hook/getRoom/GetRoomJoin";
import { Link, Video } from "lucide-react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link as LinkRouter } from "react-router";

const Room_Info = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { _id: string };
      };
    }) => state.auth
  );
  const { isPending, getRoomJoin } = GetRoomJoin() as {
    isPending: boolean;

    getRoomJoin: {
      _id: string;
      joinSession: { session: string };
      receiver: { _id: string; name: string; email: string };
    }[];
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!getRoomJoin) {
    return <span className="text-center text-white">No data available</span>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold">Room Info</h2>
      <span className="text-sm text-gray-500">
        {getRoomJoin?.length} {getRoomJoin?.length > 1 ? "rooms" : "room"}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {" "}
        {getRoomJoin?.map(
          (
            item: {
              _id: string;
              joinSession: { session: string };
              receiver: { _id: string; name: string; email: string };
            },
            index
          ) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 group h-full"
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex flex-col items-center text-center space-y-2 mb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Video className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">
                    {item?.joinSession?.session}
                  </h3>
                </div>
                <div className="text-xs text-gray-500 text-center flex-grow overflow-hidden">
                  {item?.receiver?._id === user._id ? (
                    "You are the host"
                  ) : (
                    <div className=" text-center">
                      <p>{item?.receiver?.name}</p>
                      <p>{item?.receiver?.email}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-4 space-x-2.5">
                  <LinkRouter to={`/meeting-room/${item?._id}`}>
                    <Button>Join</Button>
                  </LinkRouter>

                  <Button>
                    <Link />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </>
  );
};

export default Room_Info;
