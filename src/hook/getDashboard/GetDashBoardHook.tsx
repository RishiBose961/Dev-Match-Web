import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetDashBoardHook = () => {
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
    data: getDashBoard,
  } = useQuery({
    queryKey: ["getDashBoard"],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/get/golive`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>Pending...</span>;
  }

  return { isPending, getDashBoard };
};

export default GetDashBoardHook;
