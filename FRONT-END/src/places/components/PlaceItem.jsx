import { useContext, useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import Card from "../../shared/components/UIElements/Card";
import ConfirmDelete from "../../shared/components/UIElements/ConfirmDelete";
import { authContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hook/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./PlaceItem.css";
import { useNavigate } from "react-router-dom";
const PlaceItem = ({ item, onDelete }) => {
  const { sendReq, isLoading, clearError, error } = useHttpClient();
  const { title, address, description, id, image } = item;
  const auth = useContext(authContext);
  const [showDelete, setShowDelete] = useState(false);

  function showDeleteModal() {
    setShowDelete(true);
  }
  function closeConfirmDeleteHandler() {
    setShowDelete(false);
  }
  const navigate = useNavigate();
  async function deletePlaceItemHandler() {
    closeConfirmDeleteHandler();
    try {
      await sendReq(`http://localhost:5000/api/places/${id}`, "DELETE");
      onDelete(id);
      navigate(`/${auth.user.id}/places`);
    } catch (error) {}
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <li className="place-item">
        {isLoading && <LoadingSpinner overlay />}
        <ConfirmDelete
          message={`Are you share to Delete ${title}`}
          onCancel={closeConfirmDeleteHandler}
          onConfirm={deletePlaceItemHandler}
          show={showDelete}
        />
        <Card>
          <img src={`http://localhost:5000/${image}`} alt={title} />
          <h2>{title}</h2>
          <p>{description}</p>
          <address>{address}</address>
          <div className="place-item__actions">
            {auth.user.id === item.creatorId && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button onClick={showDeleteModal} danger>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
export default PlaceItem;
