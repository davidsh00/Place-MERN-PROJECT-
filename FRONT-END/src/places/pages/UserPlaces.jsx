import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hook/http-hook";
import PlacesList from "../components/PlacesList";

const UserPlaces = () => {
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const [loadedUserPlaces, setLoadedUserPlaces] = useState([]);
  const { uId } = useParams();
  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendReq(
          `http://localhost:5000/api/places/users/${uId}`
        );
        setLoadedUserPlaces(responseData.places);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendReq, uId]);
  const deletePlaceHandler = (placeId) => {
    setLoadedUserPlaces((prev) => prev.filter((item) => item.id !== placeId));
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      {loadedUserPlaces && (
        <PlacesList
          items={loadedUserPlaces}
          onDeletePlace={deletePlaceHandler}
        />
      )}
      
    </>
  );
};
export default UserPlaces;
