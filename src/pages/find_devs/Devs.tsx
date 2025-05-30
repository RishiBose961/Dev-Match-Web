import Avatars from "@/components/Find_Dev/Avatar";
import ScheduleSession from "@/components/Scheduling/ScheduleSession";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Handshake, User } from "lucide-react";
import { Link } from "react-router";

interface DevItem {
  username: string;
  _id: string;
  availableHistory?: boolean;
  image?: string;
  name: string;
  experience?: {
    position_at?: string;
    company?: string;
  } | null;
  userDetails?: {
    skills?: string[];
    availability?: string;
    image?: string;
  };
}

const Devs = ({ item, index }: { item: DevItem; index: number }) => {
  const nofounduserDetails = Object.keys(item?.userDetails || {}).length === 0;
  return (
    <div className="mb-4" key={index}>
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-4">
              <div className="flex items-center gap-4">
                <Avatars
                  image={item?.userDetails?.image}
                  name={item?.name}
                  avali={item?._id}
                />
                <div>
                  <h3 className="font-semibold text-lg">{item?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item?.experience === null
                      ? "No Experience"
                      : `${item?.experience?.position_at} • ${item?.experience?.company}`}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-semibold text-sm text-foreground">
                    Skills & Expertise
                  </h4>
                  <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {nofounduserDetails
                    ? " No Skill Found "
                    : (item?.userDetails?.skills ?? []).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="ring-2 ring-primary px-2"
                        >
                          {skill}
                        </Badge>
                      ))}
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <p className="text-sm">
                    <span className="font-medium">Availability:</span>{" "}
                    <span className="text-muted-foreground">
                      {nofounduserDetails
                        ? " No Availability Found "
                        : item?.userDetails?.availability}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button className="size-10 cursor-pointer rounded-full items-center">
                  <Handshake className="size-5" />
                </Button>

                <div>
                  <ScheduleSession user={item?._id} />
                </div>

                <Link
                  to={`/profile/${item?.username}`}
                  className="w-full block"
                >
                  <Button className="size-10 cursor-pointer rounded-full items-center">
                    <User className=" size-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Devs;
