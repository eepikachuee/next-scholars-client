import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 dark:bg-[#0f0f0f] dark:text-white transition-colors duration-300">
      <ClipLoader color="#22c55e" size={60} />
      <p className="mt-4 text-lg font-medium animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
