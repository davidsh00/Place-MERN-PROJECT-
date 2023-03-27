import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElement/Button";
import ImageUpload from "../../shared/components/FormElement/ImageUpload";
import Input from "../../shared/components/FormElement/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { authContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hook/form-hook";
import { useHttpClient } from "../../shared/hook/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validator";
import "./PlaceForm.css";

const PlaceForm = () => {
  const [formState, changeInputHandler] = useForm(
    {
      image: {
        value: null,
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
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { user } = useContext(authContext);
  const { isLoading, error, clearError, sendReq } = useHttpClient();

  const navigate = useNavigate();
  async function placeSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("creatorId", user.id);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("title", formState.inputs.title.value);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendReq("http://localhost:5000/api/places", "POST", {}, formData);
      navigate("/");
    } catch (error) {}
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner overlay />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <ImageUpload
          onInput={changeInputHandler}
          id="image"
          errorText="please select a correct photo"
        />
        <Input
          id="title"
          label={"Title"}
          errorMessage="Title must not be Empty!"
          placeholder={"Enter the Place Title"}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={changeInputHandler}
        />
        <Input
          elementType={"textarea"}
          id="description"
          label={"Description"}
          errorMessage="Enter valid Description(at least 5 chracters)!"
          placeholder={"Enter the Place Description"}
          validators={[VALIDATOR_MINLENGTH(5)]}
          onChange={changeInputHandler}
        />
        <Input
          id="address"
          label={"Address"}
          errorMessage="Enter valid Address"
          placeholder={"Enter the Place Address"}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={changeInputHandler}
        />
        <Button disabled={!formState.isValid}>Submit</Button>
      </form>
    </>
  );
};
export default PlaceForm;
