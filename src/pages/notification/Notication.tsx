import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import PullNotify from "./PullNotify";
import useNotifypullStore from "@/zustland/notifypullStore";
import { Badge } from "@/components/ui/badge";

const Notication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "pull";

  const unreadCount = useNotifypullStore((state) => state.unreadCount());


  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div className=" max-w-6xl mx-auto mb-20">
      {" "}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
        <TabsList  className="grid w-full grid-cols-2">
          <TabsTrigger className="relative" value="pull">
            Pull Request{" "}
            {unreadCount > 0 && (
              <Badge
                className="absolute -top-3 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="meet">Meeting Notify</TabsTrigger>
        </TabsList>
        <TabsContent value="pull">
          <PullNotify />
        </TabsContent>
        <TabsContent value="meet">
          <p>Pending Request</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notication;
