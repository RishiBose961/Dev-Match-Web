import { useQuery } from "@tanstack/react-query";

const GetScheduleEvery = (id: string | undefined) => {
   const {
        isPending,
        error,
        isError,
        data: getEveryTimeSchedule
      } = useQuery({
        queryKey: ["getEveryTimeSchedule",id],
        queryFn: async () => {
          return await fetch(`http://localhost:5000/api/gettimeschedulebyid/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((res) => res.json());
        },
        staleTime: 1000,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      if (isPending) {
        return <span>Pending...</span>;
      }
    
      return { isPending, getEveryTimeSchedule };
}

export default GetScheduleEvery