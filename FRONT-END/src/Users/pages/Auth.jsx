import { useContext, useState } from "react";

import { useForm } from "../../shared/hook/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hook/http-hook";
import Input from "../../shared/components/FormElement/Input";
import { authContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElement/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validator";

import "./Auth.css";
import ImageUpload from "../../shared/components/FormElement/ImageUpload";

const Auth = () => {
  const { isLoading, clearError, error, sendReq } = useHttpClient();
  const auth = useContext(authContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [stateForm, inputChangeHandler, setForm] = useForm(
    {
      email: {
        value: "ddd",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  async function userLoginHandler(event) {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendReq(
          "http://localhost:5000/api/users/login",
          "POST",
          { "Content-Type": "application/json" },
          JSON.stringify({
            email: stateForm.inputs.email.value,
            password: stateForm.inputs.password.value,
          })
        );
        auth.login(responseData.user, responseData.expiresToken);
      } catch (error) {}
    } else {
      const signupFormData = new FormData();
      signupFormData.set("email", stateForm.inputs.email.value);
      signupFormData.append("name", stateForm.inputs.name.value);
      signupFormData.append("password", stateForm.inputs.password.value);
      signupFormData.append("image", stateForm.inputs.image.value);
      try {
        const responseData = await sendReq(
          "http://localhost:5000/api/users/signup",
          "POST",
          {},
          signupFormData
        );
        auth.login(responseData.user, responseData.expiresToken);
      } catch (error) {}
    }
  }
  function toggleLoginMode() {
    if (!isLoginMode) {
      setForm(
        {
          ...stateForm.inputs,
          name: undefined,
          image: undefined,
        },
        stateForm.inputs.email.isValid && stateForm.inputs.password.isValid
      );
    } else {
      setForm(
        {
          ...stateForm.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <div className="auth-form">
        {isLoading && <LoadingSpinner overlay />}
        <Card>
          <h1 className="auth-form__title">Login</h1>
          <span className="auth-form__hr" />
          <form className="auth-form__form" onSubmit={userLoginHandler}>
            {!isLoginMode && (
              <>
                <ImageUpload
                  id="image"
                  onInput={inputChangeHandler}
                  errorText="please Select a correct image for your Avatar"
                />
                <Input
                  id="name"
                  onChange={inputChangeHandler}
                  label="Name"
                  placeholder="Enter your name"
                  errorMessage="Enter a valid Name(at least 3 chracters)"
                  validators={[VALIDATOR_MINLENGTH(3)]}
                />
                )
              </>
            )}
            <Input
              id="email"
              type="email"
              placeholder={"enter you Email Address"}
              errorMessage="pleade Enter a valid Email"
              validators={[VALIDATOR_EMAIL()]}
              onChange={inputChangeHandler}
              label="E-Mail"
            />
            <Input
              id="password"
              type="password"
              placeholder={"enter you Password"}
              errorMessage="pleade Enter a valid Password(at least 6 charchters)"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onChange={inputChangeHandler}
              label="Password"
            />
            <Button disabled={!stateForm.isValid} type="submit">
              {isLoginMode ? "LogIn" : "SignUp"}
            </Button>
            <Button danger onClick={toggleLoginMode} type="button">
              Swich To
              {isLoginMode ? "SignUp" : "LogIn"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Auth;
