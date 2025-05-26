import { useQuery } from "@tanstack/react-query";

const GetAvaliableById = (user: string | undefined) => {

    const {
        isPending,
        error,
        isError,
        data: getbyidavaliable,
      } = useQuery({
        queryKey: ["getbyidavaliableInfos",user],
        queryFn: async () => {
          return await fetch(`http://localhost:5000/api/getavaliable/${user}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
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
    
      return { isPending, getbyidavaliable };
}

export default GetAvaliableById