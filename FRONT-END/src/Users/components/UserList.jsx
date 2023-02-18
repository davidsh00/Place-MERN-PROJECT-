import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
import styles from "./UserLIst.module.css";
const UserList = ({ items }) => {
  if (!items.length) {
    return (
      <Card>
        <p>there is no Item!</p>
      </Card>
    );
  }
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        return <UserItem key={item.id} item={item} />;
      })}
    </ul>
  );
};
export default UserList;
