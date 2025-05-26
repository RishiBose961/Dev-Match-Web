import { CalendarIcon, Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface ExperienceItem {
  position_at: string;
  company: string;
  start_At: string;
  end_At: string;
  country: string;
}

interface SettingExperienceProps {
  exper: ExperienceItem[];
}

const SettingExperience = ({ exper }: SettingExperienceProps) => {
  return (
    <div>
      {exper?.map(
        (
          item: {
            position_at: string;
            company: string;
            start_At: string;
            end_At: string;
            country: string;
          },
          index: number
        ) => (
          <div key={index} className="mb-6 group relative ring-1 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between  p-3 gap-2 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {item.position_at}
                </h3>
                <p className="text-zinc-300 font-medium">{item?.company} - {item?.country}</p>
              </div>
              <div className="flex items-center text-zinc-400 text-sm">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>
                  {new Date(item.start_At).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {" — "}
                  {new Date(item.end_At).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 mx-5 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Edit
                <Edit className=" size-5" />
              </Button>
                 <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 mx-5 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Delete
                <Trash className=" size-5" />
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SettingExperience;
