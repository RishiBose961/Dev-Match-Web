import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import GetAvaliHook from "@/hook/getAvaliable/GetAvaliHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import TimeRange from "./TimeRange";

const CreateSchedule = () => {
  const hookResult = GetAvaliHook(); // Store the result in a variable
  const getAvaliable =
    hookResult && "getAvaliable" in hookResult ? hookResult.getAvaliable : null;
  const isPending =
    hookResult && "isPending" in hookResult ? hookResult.isPending : false;
  const [availabilityEnabled, setAvailabilityEnabled] =
    useState<boolean>(false);

    

  interface AuthState {
    isAuthenticated: boolean;
    user: { token: string } | null;
  }

  interface RootState {
    auth: AuthState;
  }

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const queryClient = useQueryClient();

  // Sync state with fetched data
  useEffect(() => {
    if (getAvaliable?.available !== undefined) {
      setAvailabilityEnabled(getAvaliable.available);
    }
  }, [getAvaliable]);

  const mutation = useMutation({
    mutationFn: async (available: boolean) => {
      const response = await fetch(
        "http://localhost:5000/api/createavaliable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ available }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAvaliableInfos"] });
      queryClient.invalidateQueries({ queryKey: ["getbyidavaliableInfos"] });
    },
  });

  const handleAvailabilityChange = (checked: boolean) => {
    setAvailabilityEnabled(checked);
    mutation.mutate(checked);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Card className="shadow-md ">
        <CardHeader className=" pb-2">
          <div>
            <CardTitle className="text-2xl font-bold ">My Calendar</CardTitle>
          
          </div>
          <Separator className="mb-3 mt-3" />
          <div className="flex items-center justify-between">
            <CardDescription className=" mt-1">
              Schedule your availability for collaboration
            </CardDescription>
            <div className="flex items-center space-x-2 w-48 ml-2  p-2 rounded-full shadow-sm border border-slate-100">
              {isAuthenticated && (
                <>
                  <Switch
                    id="availability-mode"
                    checked={availabilityEnabled}
                    onCheckedChange={handleAvailabilityChange}
                    disabled={isPending || mutation.isPending}
                    className="data-[state=checked]:bg-emerald-500"
                  />{" "}
                  <Label
                    htmlFor="availability-mode"
                    className={`text-sm font-medium ${
                      availabilityEnabled
                        ? "text-emerald-600"
                        : "text-orange-500"
                    }`}
                  >
                    {availabilityEnabled ? "Available" : "Unavailable"}
                  </Label>
                </>
              )}
            </div>
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
