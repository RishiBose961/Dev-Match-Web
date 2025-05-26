import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GetJoinRequestById from "@/hook/GetJoinRequest/GetJoinRequestById";

import { X } from "lucide-react";
import AcceptedButton from "../Room_Info/AcceptedButton";
import { Button } from "../ui/button";
const PendingRequest = () => {
  const { isPending, getJoinRequestById } = GetJoinRequestById() as {
    isPending: boolean;
    getJoinRequestById: {
      _id: string;
      accepted: boolean;
      postedBy: string;
      session: string;
      dateflexibility: string;
      timeflexibility: string;
      senderequest: {
        name: string;
        email: string;
        _id: string;
      };
    }[];
  };

  if (isPending) {
    return <span>Pending...</span>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Session Created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Session</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className=" text-center">Request By</TableHead>
            <TableHead className=" text-center">Accept/Decline</TableHead>
          </TableRow>
        </TableHeader>

        {getJoinRequestById?.map((item, index: number) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-medium">{item?.session}</TableCell>
              <TableCell> {formatDate(item?.dateflexibility)}</TableCell>
              <TableCell>{formatTime(item?.timeflexibility)}</TableCell>
              <TableCell className=" text-center">
                <div className="text-xs">
                  <p>{item?.senderequest?.name}</p>
                  <p>{item?.senderequest?.email}</p>
                </div>
              </TableCell>
              <TableCell className=" text-center space-x-3">
              {
                item?.accepted ? "":<AcceptedButton senderid={item?.senderequest?._id} 
                sessionid={item?._id} receiverid={item?.postedBy}/>
              }
                  
              
                <Button variant={"destructive"}>
                  <X />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default PendingRequest;
