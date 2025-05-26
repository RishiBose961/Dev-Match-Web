import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingRequest from "./PendingRequest";
import UpcomingSession from "./UpcomingSession";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const MainTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "session";

  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
        <TabsList>
          <TabsTrigger value="session">Created Session</TabsTrigger>
          <TabsTrigger value="pending">Pending Request</TabsTrigger>
        </TabsList>
        <TabsContent value="session">
          <UpcomingSession />
        </TabsContent>
        <TabsContent value="pending">
          <PendingRequest />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainTab;
