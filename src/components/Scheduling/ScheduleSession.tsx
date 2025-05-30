import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import GetScheduleId from "@/hook/getTimeSchedulling/GetScheduleId";
import { Calendar, Clock, Video } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface ScheduleSessionProps {
  user: unknown; // Replace 'unknown' with a specific user type if available
}

const ScheduleSession = ({ user }: ScheduleSessionProps) => {
  const userId = typeof user === "string" ? user : undefined;
  const result = GetScheduleId(userId);

  const isObject =
    typeof result === "object" &&
    result !== null &&
    "isPending" in result &&
    "getbyidSchedule" in result;
  const isPending = isObject ? result.isPending : false;
  const getbyidSchedule = isObject ? result.getbyidSchedule : [];

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="size-10 cursor-pointer rounded-full items-center">
            <Calendar className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Upcoming Sessions</DrawerTitle>
            <DrawerDescription>
              View and join your scheduled sessions
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-4 space-y-4 max-h-[60vh] overflow-y-auto py-2">
            {isPending ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-9 w-16" />
                    </div>
                    <Separator className="my-3" />
                  </div>
                ))}
              </div>
            ) : getbyidSchedule && getbyidSchedule.length > 0 ? (
              getbyidSchedule.map(
                (
                  item: {
                    session: string;
                    _id: string;
                    statingdatetime: string;
                    endingdatetime: string;
                  },
                  index: number
                ) => (
                  <div key={index} className="rounded-lg border p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(item?.statingdatetime).toLocaleString()} -{" "}
                            {new Date(item?.endingdatetime).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Video className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Session</p>
                            <p className="text-sm text-muted-foreground">
                              {item.session}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link to={`/request/${item?._id}`}>
                        <Button size="sm">Join</Button>
                      </Link>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  No scheduled sessions found
                </p>
              </div>
            )}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ScheduleSession;
