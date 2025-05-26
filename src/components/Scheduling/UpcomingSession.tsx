import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetTimeSchedule from "@/hook/getTimeSchedulling/GetTimeSchedule";
import { Trash, Video } from "lucide-react";
import { Button } from "../ui/button";

// Define the ScheduleItem type
interface ScheduleItem {
  session: string;
  statingdatetime: string;
  endingdatetime: string;
}

const UpcomingSession = () => {
  const scheduleData = useGetTimeSchedule();

  if (!("getSchedule" in scheduleData)) {
    return <div>Error: Invalid schedule data</div>;
  }

  const { isPending, getSchedule } = scheduleData;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <Table>
        <TableCaption>A list of your recent Session Created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Session</TableHead>
            <TableHead>Stating Date/Time</TableHead>
            <TableHead>Ending Date/Time</TableHead>
            <TableHead className=" text-center">Join Request</TableHead>
            <TableHead className=" text-center">Join</TableHead>
          </TableRow>
        </TableHeader>

        {getSchedule?.map((item: ScheduleItem, index: number) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-medium">{item?.session}</TableCell>
              <TableCell>
                {new Date(item?.statingdatetime).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(item?.endingdatetime).toLocaleString()}
              </TableCell>
              <TableCell className=" text-center">1</TableCell>
              <TableCell className=" text-center space-x-3">
                <Button>
                  <Video />
                </Button>
                <Button variant={"destructive"}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default UpcomingSession;
