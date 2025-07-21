import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
      <ClipLoader color="#b4530a" size={60} />
      <p className="mt-4 text-lg font-medium animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
