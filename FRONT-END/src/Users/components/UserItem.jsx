import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import styles from "./UserItem.module.css";
const UserItem = ({ item }) => {
  return (
    <li className={styles.item}>
      <Link to={`${item.id}/places`}>
        <Card>
          <div className={styles.userItem}>
            <div className={styles.avatar }>
              <Avatar image={item.image} alt={`${item.name} profile`} />
            </div>
            <div className={styles.right}>
              <header>{item.name}</header>
              <div className={styles.email}>{item.email}</div>
              <div className={styles.placeCount}>
                {item.placeCount} {item.placeCount === 1 ? "Place" : "Places"}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};
export default UserItem;
