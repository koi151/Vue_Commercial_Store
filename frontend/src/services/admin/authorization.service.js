import createApiAdmin from "../api.service";

class AuthorizationServiceAdmin {

  constructor(baseUrl = "/api/admin/auth") {
    this.api = createApiAdmin(baseUrl);
  }

  async submitLogin(data) {
    return (await this.api.post("/login", data)).data;
  }

  async logOut(data) {
    return (await this.api.get("/logout", data)).data;
  }
}

export default new AuthorizationServiceAdmin();