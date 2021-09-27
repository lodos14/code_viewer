import { authService } from "../Fbase";
import { useState } from "react";
import { dbService } from "../Fbase";
import "./LoginPage.css";

function LoginPage() {
  const [user_id, setuser_id] = useState("");
  const [password, setpassword] = useState("");
  const [user_name, setuser_name] = useState("");
  const [user_job, setuser_job] = useState("S");
  const [create_account_mode, setcreate_account_mode] = useState(false);
  const [error_message, seterror_message] = useState("");
  
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setuser_id(value);
    } else if (name === "password") {
      setpassword(value);
    } else {
      setuser_name(value);
    }
  };

  const SendUserDataToDb =  () => {
    const user_data = {
        "job": user_job,
        "name": user_name,
    };
    dbService.ref("user/"+ user_id).update(user_data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (create_account_mode) {
        await authService.createUserWithEmailAndPassword(user_id + "@gmail.com", password); 
        SendUserDataToDb();
      } else {
        await authService.signInWithEmailAndPassword(user_id+"@gmail.com", password);
      }
    } catch (error) {
      seterror_message(error.message);
      console.log(error)
    }
  };
  const onChangeRadio = (event) => {
    const { value } = event.target;
    setuser_job(value);
  };
  const onClickCreateButton = () => {
    setcreate_account_mode(!create_account_mode);
    setuser_id("")
    setpassword("")
    setuser_name("")
    seterror_message("");
  };
  
  return (
    <div className="login-page">
      <header className="main-title">
        <h1>Code Viewer</h1>
      </header>
      <form onSubmit={onSubmit} aria-label="login form" className="login">
        <div className="auth-input">
          <input
            name="email"
            value={user_id}
            placeholder="ID"
            type="text"
            required
            onChange={onChange}
          />
          <input
            name="password"
            value={password}
            placeholder="Passward"
            type="password"
            required
            onChange={onChange}
          />
          {create_account_mode === true && (
            <input
              name="user_name"
              value={user_name}
              placeholder="Name"
              type="text"
              required
              onChange={onChange}
            />
          )}
          {create_account_mode === true && (
            <div className="radio-job">
              <label htmlFor="radio-s" className="radio-label" >
                Student
              </label>
              <input
                id="radio-s"
                type="radio"
                name="job"
                value="S"
                onChange={onChangeRadio}
              />
              <label htmlFor="radio-i" className="radio-label">
                Instructor
              </label>
              <input
                id="radio-i"
                type="radio"
                name="job"
                value="I"
                onChange={onChangeRadio}
              />
            </div>
          )}
          {create_account_mode === true && (
            <input type="submit" value="Create" className="create-button" />
          )}
        </div>
        {create_account_mode === false && (
          <input type="submit" value="Login" className="login-button" />
        )}
      </form>
      <strong aria-label="error message">{error_message}</strong>
      <button
        type="button"
        className="create-account-button"
        onClick={onClickCreateButton}
      >
        {create_account_mode ? "Login page" : "Create account"}
      </button>
    </div>
  );
}

export default LoginPage;
