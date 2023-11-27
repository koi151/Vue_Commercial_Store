import createApiAdmin from "../api.service";

class AccountsServiceAdmin {

  constructor(baseUrl = "/api/admin/accounts") {
    this.api = createApiAdmin(baseUrl);
  }

  async getAccounts(options = {}) {
    return (await this.api.get("/", options)).data;
  }

  async getSingleAccount(id) {
    return (await this.api.get(`/edit/${id}`)).data;
  }

  async changeAccountStatus(status, id) {
    return (await this.api.patch(`/change-status/${status}/${id}`)).data;
  }

  async deleteAccount(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }

  async createAccount(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.post(`/create`, data, config)).data;
  }

  async updateAccount(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.patch(`/edit/${id}`, data, config)).data;
  }

  // async getCategoryRecords() {
  //   return (await this.api.get(`/create`)).data;
  // }

  // async createCategory(category) {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };
  //   return (await this.api.post('/create', category, config)).data;
  // }

  // async updateSingleCategory(id, category) {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };
  //   return (await this.api.patch(`/edit/${id}`, category, config)).data;
  // }
}

export default new AccountsServiceAdmin();