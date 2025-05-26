import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetJoinRequestById = () => {
   const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { _id:string, token: string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getJoinRequestById,
  } = useQuery({
    queryKey: ["getJoinRequestById",user?._id],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/apI/get/joinrequest/${user?._id}`, {
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

  return { isPending, getJoinRequestById };
}

export default GetJoinRequestById