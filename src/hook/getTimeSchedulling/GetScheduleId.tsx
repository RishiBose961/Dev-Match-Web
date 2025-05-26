import { useQuery } from "@tanstack/react-query";

const GetScheduleId = (user: string | undefined) => {

    const {
        isPending,
        error,
        isError,
        data: getbyidSchedule,
      } = useQuery({
        queryKey: ["getbyidSchedule",user],
        queryFn: async () => {
          return await fetch(`http://localhost:5000/api/gettimeschedule/${user}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((res) => res.json());
        },
        staleTime: 10000,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      if (isPending) {
        return <span>Pending...</span>;
      }
    
      return { isPending, getbyidSchedule };
}

export default GetScheduleId