import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetTimeSchedule = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { token: string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getSchedule,
  } = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/gettimeschedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
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

  return { isPending, getSchedule };
};

export default GetTimeSchedule;
