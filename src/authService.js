import { login } from "./apiRequests";
import Cookies from "js-cookie";
import { runInAction } from "mobx";
import userStore from "./userStore";
import jwt_decode from "jwt-decode";

class AuthService {
  async login(username, password) {
    const resp = await login(username, password);
    if (resp.status === 200) {
      Cookies.set("Authorization", resp.data.access);
      runInAction(() => {
        userStore.refresh = resp.data.refresh;
      });
      return resp.data;
    } else {
      return null;
    }
  }
  logout() {
    Cookies.remove("Authorization");
  }
  getCurrentUser() {
    let token = Cookies.get("Authorization");
    if (token !== undefined) {
      let decoded = jwt_decode(token);
      return {
        token: token,
        user_id: decoded.user_id,
      };
    } else {
      return { token: "", user_id: 0 };
    }
  }
}
export default new AuthService();
