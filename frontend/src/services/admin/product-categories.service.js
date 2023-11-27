import createApiAdmin from "../api.service";

class ProductCategoriesServiceAdmin {

  constructor(baseUrl = "/api/admin/product-categories") {
    this.api = createApiAdmin(baseUrl);
  }

  async getCategories(options = {}) {
    return (await this.api.get("/", options)).data;
  }

  async getSingleCategory(id) {
    return (await this.api.get(`/edit/${id}`)).data;
  }

  async getCategoryRecords() {
    return (await this.api.get(`/create`)).data;
  }

  async createCategory(category) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.post('/create', category, config)).data;
  }

  async updateSingleCategory(id, category) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.patch(`/edit/${id}`, category, config)).data;
  }

  async changeStatus(status, id) {
    return (await this.api.patch(`/change-status/${status}/${id}`)).data;
  }

  async deleteCategory(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
}

export default new ProductCategoriesServiceAdmin();