import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";
const PlacesList = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card>
        <h2>There is No Places</h2>
        <div className="text-center">
          <button>Add Place</button>
        </div>
      </Card>
    );
  }
  return (
    <ul className="places-list">
      {items.map((item) => (
        <PlaceItem key={item.placeId} item={item} />
      ))}
    </ul>
  );
};
export default PlacesList;
