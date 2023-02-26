import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/hook/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validator";
import "./PlaceForm.css";

const PlaceForm = () => {
  const [formState, changeInputHandler] = useForm(
    {
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
  function placeSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs); //send this to the backend
  }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};
export default PlaceForm;
