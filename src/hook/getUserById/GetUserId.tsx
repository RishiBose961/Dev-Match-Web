import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetUserId = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { _id:string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getUserId,
  } = useQuery({
    queryKey: ["getUserIds"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/search?id=${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  return { isPending, getUserId };
}

export default GetUserId