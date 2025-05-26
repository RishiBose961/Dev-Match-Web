import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetAvaliHook = () => {
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
    data: getAvaliable,
  } = useQuery({
    queryKey: ["getAvaliableInfos"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/getavaliable`, {
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

  return { isPending, getAvaliable };
};

export default GetAvaliHook;
