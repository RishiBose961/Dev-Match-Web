import CreateSchedule from "@/components/Scheduling/CreateSchedule";
import MainTab from "@/components/Scheduling/MainTab";

const Schedule = () => {
  return (
    <div className=" max-w-6xl mx-auto mb-20">
      <h1 className="text-3xl font-bold">Availability Scheduling</h1>
      <p className="text-muted-foreground">
        Manage your availability and schedule sessions with other developers
      </p>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div>
          <CreateSchedule />
        </div>
        <div className=" lg:col-span-2">
          <MainTab />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
