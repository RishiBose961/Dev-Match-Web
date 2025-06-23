import { useQuery } from "@tanstack/react-query";

const GetOnline = () => {
  const {
    isPending,
    error,
    isError,
    data: getOnline,
  } = useQuery({
    queryKey: ["getOnlineInfos"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/getOnline`, {
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

  return { isPending, getOnline };
}

export default GetOnline