import styles from "./MainHeader.module.css";
const MainHeader = ({ children }) => {
  return <header className={styles["main-header"]}>{children}</header>;
};
export default MainHeader;
