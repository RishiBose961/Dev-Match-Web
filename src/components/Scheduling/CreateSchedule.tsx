import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import TimeRange from "./TimeRange";

const CreateSchedule = () => {
 

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Card className="shadow-md ">
        <CardHeader className=" pb-2">
          <div>
            <CardTitle className="text-2xl font-bold ">My Calendar</CardTitle>
          
          </div>
          <Separator className="mb-3 mt-3" />
          <div className="flex items-center justify-between">
          
           
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-1">
          <TimeRange />
        </CardContent>

      
      </Card>
    </div>
  );
};

export default CreateSchedule;
