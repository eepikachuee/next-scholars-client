import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, // optional if using cookies
});

const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
