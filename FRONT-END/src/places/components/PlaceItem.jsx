import { useContext, useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import Card from "../../shared/components/UIElements/Card";
import ConfirmDelete from "../../shared/components/UIElements/ConfirmDelete";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import { authContext } from "../../shared/context/auth-context";

import "./PlaceItem.css";
const PlaceItem = ({ item }) => {
  const { title, address, description, placeId, location, image } =
    item;
  const auth = useContext(authContext);
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function handleShowMap() {
    setShowMap(true);
  }
  function handleCloseMap() {
    setShowMap(false);
  }
  function showDeleteModal() {
    setShowDelete(true);
  }
  function closeConfirmDeleteHandler() {
    setShowDelete(false);
  }
  function deletePlaceItemHandler() {
    console.log("deleted ", placeId);
    closeConfirmDeleteHandler();
  }
  return (
    <li className="place-item">
      <ConfirmDelete
        message={`Are you share to Delete ${title}`}
        onCancel={closeConfirmDeleteHandler}
        onConfirm={deletePlaceItemHandler}
        show={showDelete}
      />
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
        <Map location={location} />
      </Modal>
      <Card>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <address>{address}</address>
        <div className="place-item__actions">
          <Button onClick={handleShowMap}>Show on The Map</Button>
          {auth.isLoggedIn && (
            <>
              {" "}
              <Button to={`/places/${placeId}`}>Edit</Button>
              <Button onClick={showDeleteModal} danger>
                Delete
              </Button>
            </>
          )}
        </div>
      </Card>
    </li>
  );
};
export default PlaceItem;
