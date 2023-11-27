import createApiClient from "../api.service";

class OrderServiceClient {

  constructor(baseUrl = "/api/order") {
    this.api = createApiClient(baseUrl);
  }

  async createOrder(data) {
    return (await this.api.post("/create-order", data)).data;
  }
}

export default new OrderServiceClient();