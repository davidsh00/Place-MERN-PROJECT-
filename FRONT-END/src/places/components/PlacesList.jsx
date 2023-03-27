import { useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElement/Button";
import Card from "../../shared/components/UIElements/Card";
import { authContext } from "../../shared/context/auth-context";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";
const PlacesList = ({ items, onDeletePlace }) => {
  const { user } = useContext(authContext);
  const userPlacesId = useParams().uId;
  if (items.length === 0) {
    return (
      <Card>
        <h2>There is No Places</h2>
        {user.id === userPlacesId && (
          <div className="text-center">
            <Button to="/places/new">Share Place</Button>
          </div>
        )}
      </Card>
    );
  }
  return (
    <ul className="places-list">
      {items.map((item) => (
        <PlaceItem key={item.id} item={item} onDelete={onDeletePlace} />
      ))}
    </ul>
  );
};
export default PlacesList;
