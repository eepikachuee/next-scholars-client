import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSaveUser = () => {
  const axiosPublic = useAxiosPublic();

  const { mutateAsync: saveUser } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosPublic.post("/users", userData);
      return res.data;
    },
  });

  return { saveUser };
};

export default useSaveUser;
