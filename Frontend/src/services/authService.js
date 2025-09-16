import axios from "axios";

class AuthService {
    API_URL;
  constructor() {
    this.API_URL = `${import.meta.env.VITE_API_URL}/auth`;
  }

  async login(userData) {
    const res = await axios.post(`${this.API_URL}/login`, userData, { withCredentials: true });
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
  }

  async logout() {
      await axios.post(`${this.API_URL}/logout`, {}, { withCredentials: true });

      localStorage.removeItem("user");
    }
}

export default new AuthService();
