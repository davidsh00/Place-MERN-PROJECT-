import { useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import BackDrop from "../../shared/components/UIElements/BackDrop";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./PlaceItem.css";
const PlaceItem = ({ item }) => {
  const { title, address, description, creatorId, placeId, location, image } =
    item;
  console.log(placeId);

  const [showMap, setShowMap] = useState(false);

  function handleShowMap() {
    setShowMap(true);
  }
  function handleCloseMap() {
    setShowMap(false);
  }
  return (
    <li className="place-item">
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        headerTitle={address}
        footerContent={
          <Button danger onClick={handleCloseMap}>
            Close
          </Button>
        }
      >
        this is a map
      </Modal>
      <Card>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <address>{address}</address>
        <div className="place-item__actions">
          <Button onClick={handleShowMap}>Show on The Map</Button>
          <Button to={`/places/${placeId}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};
export default PlaceItem;
