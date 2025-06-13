import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Notication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "pull";

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
        <TabsList>
          <TabsTrigger value="pull">Pull Request</TabsTrigger>
          <TabsTrigger value="meet">Meeting Notify</TabsTrigger>
        </TabsList>
        <TabsContent value="pull">
          <p>Created Session</p>
        </TabsContent>
        <TabsContent value="meet">
          <p>Pending Request</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notication;
