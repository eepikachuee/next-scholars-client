import "./App.css";
import ThemeToggle from "./components/button/ThemeToggle";

function App() {
  return (
    <>
      <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col items-center justify-center">
        <ThemeToggle />
        <h1 className="text-3xl mt-4">Toggle Black & White Theme</h1>
      </div>
    </>
  );
}

export default App;
