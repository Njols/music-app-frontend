import { TextField, Button, ClickAwayListener } from "@mui/material";
import { runInAction } from "mobx";
import { useState } from "react";
import authService from "../../authService";
import userStore from "../../userStore";
import "./Login.css";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function logIn() {
    let resp = await authService.login(username, password);
    if (resp !== null) {
      runInAction(() => {
        let auth = authService.getCurrentUser();
        userStore.token = auth.token;
        userStore.userId = auth.user_id;
      });
      props.close();
    } else {
      setError("Log in failed");
    }
  }

  return (
    <div className="login-container">
      <ClickAwayListener onClickAway={props.close}>
        <div className="login-form">
          <div className="login-form-header">
            <h1>Log In</h1>
          </div>
          <div className="login-form-textbox">
            <TextField
              label="username"
              variant="standard"
              fullWidth="true"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form-textbox">
            <TextField
              label="password"
              type="password"
              variant="standard"
              fullWidth="true"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-form-button">
            <Button onClick={logIn}>LOGIN</Button>
          </div>
          <div className="login-error-box">{error !== "" && error}</div>
          <div className="login-form-footer">
            <small>Don't have an account? </small>
            <Button size="small" onClick={props.switchToRegister}>
              <small>Register</small>
            </Button>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default Login;
