import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    // {email,password}表示要發送到伺服器的請求主體（request body）
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }

  // 註冊帳號
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    // 使用 JSON.parse 將這個 JSON 字符串解析為 JavaScript 對象
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
