import { useQuery } from "react-query";

export function useGetLoginUrl() {
  return useQuery("get-login", async () => {
    
  });
}
