import { Toggle } from "@/components/toggleDarkMode/ToggleDarkMode";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <h1 className={styles.navbarTitle}>flow_map</h1>
      <Toggle />
    </div>
  );
};

export default Navbar;
