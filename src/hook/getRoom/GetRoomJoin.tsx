import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetRoomJoin = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { token: string , _id: string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getRoomJoin,
  } = useQuery({
    queryKey: ["getRoomJoins", user?._id],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/get/roomjoin/${user?._id}`, {
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

  return { isPending, getRoomJoin };
}

export default GetRoomJoin