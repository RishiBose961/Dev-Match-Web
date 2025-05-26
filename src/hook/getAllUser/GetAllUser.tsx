import { useQuery } from "@tanstack/react-query";

const GetAllUser = () => {
  const {
    isPending,
    error,
    isError,
    data: getuser,
  } = useQuery({
    queryKey: ["getuserInfos"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/getuser/information`).then(
        (res) => res.json()
      );
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>Pending...</span>;
  }

  return { isPending, getuser };
};

export default GetAllUser;
