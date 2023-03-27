import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import Card from "../../shared/components/UIElements/Card";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import { useForm } from "../../shared/hook/form-hook";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hook/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { authContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElement/ImageUpload";

const UpdatePlace = () => {
  const { isLoading, clearError, error, sendReq } = useHttpClient();
  const { user } = useContext(authContext);
  const { pId } = useParams();

  const [formState, changeInputHandler, setFormData] = useForm(
    {
      image: {
        value: "",
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [loadedPlace, setLoadedPlace] = useState();
  useEffect(() => {
    const fetchPlaceForUpdate = async () => {
      try {
        const responseData = await sendReq(
          `http://localhost:5000/api/places/${pId}`
        );

        setLoadedPlace(responseData.place);
        setFormData(
          {
            image: {
              value: responseData.place.image,
              isValid: true,
            },
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlaceForUpdate();
  }, [sendReq, setFormData, pId]);
  const navigate = useNavigate();
  async function updatePlaceHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("creatorId", user.id);
    formData.append("description", formState.inputs.description.value);
    formData.append("title", formState.inputs.title.value);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendReq(
        `http://localhost:5000/api/places/${pId}`,
        "PATCH",
        {},
        formData
      );
      navigate(`/${user.id}/places`);
    } catch (error) {}
  }

  if (isLoading) {
    return <LoadingSpinner overlay />;
  }
  if (!isLoading && !loadedPlace) {
    return <Card>Could not find place</Card>;
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={updatePlaceHandler}>
          <ImageUpload
            initialValue={loadedPlace.image}
            onInput={changeInputHandler}
            errorText="select correct photo"
            id="image"
          />
          <Input
            id="title"
            errorMessage="Enter valid Title"
            validators={[VALIDATOR_REQUIRE()]}
            label="Title"
            onChange={changeInputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            elementType="textarea"
            label="Description"
            id="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="Enter valid Value(at least 5 characters)"
            onChange={changeInputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button disabled={!formState.isValid}>UPDATE</Button>
        </form>
      )}
    </>
  );
};
export default UpdatePlace;
