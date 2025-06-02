import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseDevlopHook = () => {
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
    data: getDevRecom,
  } = useQuery({
    queryKey: ["getDevRecoms", user?._id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/recommend/${user._id}?top=4`, {
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
    enabled: !!user && !isLoading, // Only run when user is available and not loading
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return {
    isPending,
    getDevRecom,
  };
};

export default UseDevlopHook;
