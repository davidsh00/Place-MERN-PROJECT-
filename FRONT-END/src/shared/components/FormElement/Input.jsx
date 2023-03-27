import { useEffect, useReducer } from "react";
import { validate } from "../../util/validator";
import "./Input.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, state.validators),
      };
    case "INPUT_TOUCHED": {
      return {
        ...state,
        isTouch: true,
      };
    }
    default:
      return state;
  }
}

const Input = ({
  initialValue,
  initialValid,
  elementType,
  errorMessage,
  rows,
  type,
  id,
  label,
  placeholder,
  onChange,
  validators,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    isValid: initialValid || false,
    value: initialValue || "",
    validators,
    isTouch: false,
  });

  const element =
    elementType === "textarea" ? (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder}
        onChange={changeInputHandler}
        onFocus={touchInputHandler}
        value={inputState.value}
      />
    ) : (
      <input
        type={type || "text"}
        id={id}
        placeholder={placeholder}
        onChange={changeInputHandler}
        value={inputState.value}
        onFocus={touchInputHandler}
      />
    );
  function touchInputHandler() {
    dispatch({ type: "INPUT_TOUCHED" });
  }
  function changeInputHandler(event) {
    dispatch({ type: "CHANGE_VALUE", value: event.target.value });
  }
  const { value, isValid } = inputState;
  useEffect(() => {
    onChange(id, value, isValid);
  }, [id, onChange, isValid, value]);
  return (
    <div
      className={`form-control ${
        inputState.isTouch && !inputState.isValid ? "form-control--invalid" : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {inputState.isTouch && !inputState.isValid && (
        <p className="form-control__error">{errorMessage}</p>
      )}
    </div>
  );
};
export default Input;
