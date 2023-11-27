import createApiClient from "../api.service";

class ProductServiceClient {

  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getProductsAndFeatured(option = {}) {
    return (await this.api.get("/", option)).data;
  }

  async getProducts(option = {}) {
    return (await this.api.get("/products", option)).data;
  }

  async getProductDetail(productSlug, options = {}) {
    return (await this.api.get(`/products/detail/${productSlug}`, options)).data;
  }

  // async create(data) {
  //   return (await this.api.post('/', data)).data;
  // }

  // async deleteAll() {
  //   return (await this.api.delete("/")).data;
  // }

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

export default new ProductServiceClient();