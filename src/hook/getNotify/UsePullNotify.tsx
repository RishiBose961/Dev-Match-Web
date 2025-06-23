import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UsePullNotify = () => {
  const { user, isLoading } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );

  const {
    isPending,
    error,
    isError,
    data: getPullNotify,
  } = useQuery({
    queryKey: ["getPullNotifys", user?._id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/get/notifications/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch developer recommendations");
      }
      return res.json();
    },
    enabled: !!user && !isLoading,
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return {
    isPending,
    getPullNotify,
  };
}

export default UsePullNotify