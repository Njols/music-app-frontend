import { ClickAwayListener, Button, TextField } from "@mui/material";
import { useState } from "react";
import { register } from "../../apiRequests";
import "./Register.css";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [match, setMatch] = useState(false);

  async function tryRegister() {
    if (match && passwordsCorrect()) {
      register(username, email, password).then((resp) => {
        if (resp.status === 200) {
          props.switchToLogin();
        }
      });
    }
  }

  function onPasswordChanged(value) {
    setPassword(value);
    if (repeat !== value && repeat !== "" && value !== "") {
      setError("Passwords don't match!");
      setMatch(false);
    } else {
      setError("");
      setMatch(true);
    }
  }

  function onRepeatChanged(value) {
    setRepeat(value);
    if (password !== value && password !== "" && value !== "") {
      setError("Passwords don't match!");
      setMatch(false);
    } else {
      setError("");
      setMatch(true);
    }
  }

  function passwordsCorrect() {
    return password !== "" && repeat !== "";
  }

  return (
    <div className="register-container">
      <ClickAwayListener onClickAway={props.close}>
        <div className="register-form">
          <div className="register-form-header">
            <h1>Register</h1>
          </div>
          <div className="register-form-textbox">
            <TextField
              label="username"
              variant="standard"
              fullWidth="true"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="register-form-textbox">
            <TextField
              label="email"
              variant="standard"
              fullWidth="true"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-form-textbox">
            <TextField
              label="password"
              type="password"
              variant="standard"
              fullWidth="true"
              value={password}
              onInput={(e) => onPasswordChanged(e.target.value)}
            />
          </div>
          <div className="register-form-textbox">
            <TextField
              label="repeat password"
              type="password"
              variant="standard"
              fullWidth="true"
              value={repeat}
              onInput={(e) => onRepeatChanged(e.target.value)}
            />
          </div>
          <div className="register-error-box">
            {error !== "" && <small>{error}</small>}
          </div>
          <div className="register-form-button">
            <Button onClick={tryRegister}>register</Button>
          </div>
          <div className="register-form-footer">
            <small>Already have an account? </small>
            <Button size="small" onClick={props.switchToLogin}>
              <small>Log In</small>
            </Button>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default Register;
