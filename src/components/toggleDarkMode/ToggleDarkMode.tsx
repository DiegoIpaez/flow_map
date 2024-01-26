import "./toggle.css";
import useDarkModeStore from "@/store/darkModeStore";

export const Toggle = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  const handleDarkMode = () => setIsDarkMode();

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={() => handleDarkMode()}
        checked={isDarkMode}
      />
      <label htmlFor="check">{ isDarkMode ? 'Dark' : 'Light' } Mode</label>
    </div>
  );
};
