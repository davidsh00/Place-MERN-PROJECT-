import { useContext, useState } from "react";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import Card from "../../shared/components/UIElements/Card";
import { authContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hook/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validator";
import "./Auth.css";
const Auth = () => {
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
  function userLoginHandler(event) {
    event.preventDefault();
    auth.login();
  }
  function toggleLoginMode() {
    if (!isLoginMode) {
      setForm(
        {
          ...stateForm.inputs,
          name: undefined,
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
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  }
  return (
    <div className="auth-form">
      <Card>
        <h1 className="auth-form__title">Login</h1>
        <span className="auth-form__hr" />
        <form className="auth-form__form" onSubmit={userLoginHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              onChange={inputChangeHandler}
              label="Name"
              placeholder="Enter your name"
              errorMessage="Enter a valid Name(at least 3 chracters)"
              validators={[VALIDATOR_MINLENGTH(3)]}
            />
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
            errorMessage="pleade Enter a valid Password(at least 5 charchters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
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
  );
};
export default Auth;
