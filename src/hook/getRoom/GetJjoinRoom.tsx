import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const GetJjoinRoom = (id: string) => {
    
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
    data: getRoomById,
  } = useQuery({
    queryKey: ["getRoomByIds", id],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/get/roomid/${id}`, {
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

  return { isPending, getRoomById };
}

export default GetJjoinRoom