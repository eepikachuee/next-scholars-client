import { AuthContext } from "@/providers/AuthContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let requestInterceptor;

const useAxiosSecure = () => {
  const { user, handleSignOutUser, loading } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loading && token) {
      // Add request interceptor
      requestInterceptor = axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            handleSignOutUser()
              .then(() => {
                console.log("Logged out due to token issue.");
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      if (!user && requestInterceptor) {
        return axiosInstance.interceptors.request.eject(requestInterceptor);
      }

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxiosSecure;
