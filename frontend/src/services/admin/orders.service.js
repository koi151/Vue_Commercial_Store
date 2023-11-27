import createApiAdmin from "../api.service";

class OrdersServiceAdmin {

  constructor(baseUrl = "/api/admin/orders") {
    this.api = createApiAdmin(baseUrl);
  }

  async getOrders(options = {}) {
    return (await this.api.get("/", options)).data;
  }
}

export default new OrdersServiceAdmin();