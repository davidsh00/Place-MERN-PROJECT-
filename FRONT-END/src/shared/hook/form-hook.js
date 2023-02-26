import { useReducer, useCallback } from "react";
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      let isValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          isValid = isValid && action.isValid;
        } else {
          isValid = isValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid,
      };
    case "SET_FORM": {
      return { inputs: action.inputs, isValid: action.formIsValid };
    }
    default:
      return state;
  }
}

export const useForm = (initialInputs, initialFormValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValid,
  });
  const changeInputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "CHANGE_INPUT", inputId: id, value, isValid });
  }, []);
  const setFormData = useCallback((formInputs, formValidity) => {
    dispatch({
      type: "SET_FORM",
      inputs: formInputs,
      formIsValid: formValidity,
    });
  }, []);
  return [formState, changeInputHandler, setFormData];
};
