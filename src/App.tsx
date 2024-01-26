import "reactflow/dist/style.css";
import Flow from "@/components/flow/Flow";
import Navbar from "@/components/navbar/Navbar";
import useDarkModeStore from "@/store/darkModeStore";

function App() {
  const { isDarkMode } = useDarkModeStore();

  return (
    <div className="app-container" data-theme={isDarkMode ? "dark" : "light"}>
      <Navbar />
      <div style={{ height: "90%" }}>
        <Flow />
      </div>
    </div>
  );
}

export default App;
