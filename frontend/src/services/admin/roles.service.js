import createApiAdmin from "../api.service";

class RolesServiceAdmin {

  constructor(baseUrl = "/api/admin/roles") {
    this.api = createApiAdmin(baseUrl);
  }

  async getRoles(options = {}) {
    return (await this.api.get("/", options)).data;
  }

  async getSingleRole(id) {
    return (await this.api.get(`/edit/${id}`)).data;
  }

  async updateSingleRole(id, data) {
    return (await this.api.patch(`/edit/${id}`, data)).data;
  }

  async updatePermissions(data) {
    return (await this.api.patch("/permissions", data)).data;
  }

  async createRole(data) {
    return (await this.api.post(`/create`, data)).data;
  }

  async deleteRole(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
}

export default new RolesServiceAdmin();