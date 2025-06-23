import GetDashBoardHook from "@/hook/getDashboard/GetDashBoardHook";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const DashBoardInfo = () => {
  type DashBoardItem = { roomname: string; roomid: string };

  const { isPending, getDashBoard } = GetDashBoardHook() as {
    isPending: boolean;
    getDashBoard: DashBoardItem[];
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  const localinfo = JSON.parse(localStorage.getItem("audioRoom")!);

  return (
    <>
      {getDashBoard?.map(
        (item: { roomname: string; roomid: string }, index: number) => (
          <div
            className="w-full mt-5  backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-4"
            key={index}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              {/* User Info Section */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-medium ">Room Name</span>
                  <div className="flex items-center text-xs ">
                    {item?.roomname}
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-2">
                <Badge variant="destructive">
                  {item?.roomid === localinfo?.roomId ? "Active" : "Inactive"}
                </Badge>
               
                  <Link to={`/space/${item?.roomid}`}>
                    {" "}
                    <Button size="sm" className="bg-primary">
                      Join
                    </Button>
                  </Link>
              
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default DashBoardInfo;
