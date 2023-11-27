import createApiAdmin from "../api.service";

class ProductServiceAdmin {

  constructor(baseUrl = "/api/admin/products") {
    this.api = createApiAdmin(baseUrl);
  }

  async getProductList(data) {
    return (await this.api.get("/product-list", data)).data;
  }

  async getProducts(options = {}) {
    return (await this.api.get("/", options)).data;
  }

  async getEditProduct(id) {
    return (await this.api.get(`/edit/${id}`)).data;
  }

  async updateSingleProduct(id, product) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.patch(`/edit/${id}`, product, config)).data;
  }

  async changeStatus(status, id) {
    return (await this.api.patch(`/change-status/${status}/${id}`)).data;
  }

  async createProduct(product) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await this.api.post('/create', product, config)).data;
  }

  async deleteProduct(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }

  async multiChangeProduct(data) {
    return (await this.api.patch(`/multi-change`, data)).data;
  }

  // async get(id) {
  //   return (await this.api.get(`/${id}`)).data;
  // }

  // async update(id, data) {
  //   return (await this.api.put(`/${id}`, data)).data;
  // }

  // async delete(id) {
  //   return (await this.api.delete(`/${id}`)).data;
  // }
}

export default new ProductServiceAdmin();