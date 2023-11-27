<template>
  <a-row 
    v-for="(order, index) in orders" 
    :key="index"
  >
    <div class="customer-card card"> 
      <h2 class="card-header"> Customer Information:</h2> 
      <div class="card-body"> 
        <form
          >
          <div class="customer-info row"> 
            <div class="form-group col-5"> 
              <label for="fullName">Full Name</label> 
              <input 
                :value="order.customerInfo.fullName"
                disabled 
                type="text" 
                class="form-control input-custom" 
                id="fullName" 
                name="fullName" 
                style="width: 100%;" 
              > 
            </div>
            <div class="form-group col-7"> 
              <label for="address">Address</label> 
              <input 
                :value="order.customerInfo.address"
                type="text" 
                disabled
                class="form-control input-custom" 
                id="address" 
                name="address" 
                style="width: 100%;" 
              > 
            </div>  
            <div class="form-group col-12 mt-20"> 
              <label for="desc" class="form-label"> 
                Notes:
              </label> 
              <p v-html="order.customerInfo.notes"></p>
            </div>
            <div class="form-group col-6 mt-20"> 
              <label for="phone">Phone number</label> 
              <input 
                :value="order.customerInfo.phone"
                type="tel"
                class="form-control input-custom" 
                name="phone"
                id="phone"
                style="width: 100%;" 
                disabled
              > 
            </div>
            <div class="form-group col-6 mt-20">
              <span>Payment method:</span>
              <a-select
                :value="order.customerInfo.payment" 
                :disabled="true"
                style="width: 100%"
              >
                <a-select-option value="cash">Cash</a-select-option>
                <a-select-option value="banking">Online Banking</a-select-option>
                <a-select-option value="debit">Debit Card</a-select-option>
              </a-select>
            </div> 
          </div>
        </form>    
      </div> 
    </div>

    <div class="card categories-card">
      <div class="card-header categories-card__header">
        <h2>Customer Order</h2>
      </div> 
      <div class="card-body categories-card__body">
        <table class="categories-table" multi-checkbox>
          <thead class="categories-table__head">
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th style="width: 10rem;">Price</th>
            <th style="width: 15rem;">Total</th>
          </thead>
          <tbody>
            <tr 
              v-for="(cartItem, index) in order.cart" 
              :key="index"
              class="cartItem.product-wrapper"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                <img :src="cartItem.thumbnail" class="category-image" />
              </td>
              <td style="font-size: 1.8rem;">
                {{ cartItem.title }}
              </td>
              <td class="product-quantity">
                {{ cartItem.quantity }}
              </td>
              <td>
                ${{ cartItem.price }}
              </td>
              <td class="product-total-price">
                ${{ cartItem.quantity * cartItem.price }}
              </td>
            </tr>
          </tbody>
          <tfoot style="width: 100%;">
            <h2>Total payment:</h2>
          </tfoot>
        </table>
      </div>
    </div>
    <hr>
  </a-row>
</template>

<script>
import { defineComponent } from 'vue'
import OrdersServiceAdmin from '@/services/admin/orders.service';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'dashboard-page',
  components: {
  },

	data() {
    return {
      orders: {},
      // productList: {}
    };
  },
	
	methods: {
    async getOrders() {
      try {
        const response = await OrdersServiceAdmin.getOrders();
        if (response.success) {
          this.orders = response.orders;
            console.log('check:', this.orders[0].cart[0].thumbnail)
          
        } else {
          message.error('Error occured, can not get orders data', 3);
        }

      } catch (error) {
        console.log(error);
        message.error('Error occured, can not get orders data', 3);
      }
    },
  },

  mounted() {
    this.getOrders()
  },
})
</script>

<style lang="scss" scoped>
.categories-card {
  margin: 5rem;
  margin-top: 2rem;
  margin-bottom: 7rem;
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 0 8px 24px 0 rgba(0,0,0,.12);

  &__header {
    padding: 15px;
    h2 {
      margin: 0;
      padding: 0;
    }
  }

  &__body {
    width: 100%;
    padding: 2rem;
    
    .categories-filters-wrapper {
      display: flex;
      align-items: center;
      padding: 15px 0
    }

    .categories-table {
      width: 100%;
      
      &__head {
        vertical-align: middle;
        height: 4rem;
        border-bottom: 1px solid #ddd;
      }

      th {
        font-size: 1.6rem;
        text-align: center !important;
      }

      tr {
        font-size: 1.6rem;
        td {
          vertical-align: middle;
          text-align: center;
        }
      }

      .category-image {
        width: 20rem;
        aspect-ratio: 4/3;
        object-fit: cover;
        vertical-align: middle;
      }

      .input-position {
        width: 4rem; 
        border: 1px solid #ddd; 
        text-align: center;
      }

      td {
        .actions-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
            margin-right: 1rem;
          }
        }
      }
    }
    .product-total-price, .product-quantity {
      font-weight: 600; 
      font-size: 2rem;
      color: var(--color-lighter-client);
    }
  }
}

.customer-card {
  margin: 3rem 5rem 0rem 5rem;
  box-shadow: 0 8px 24px 0 rgba(0,0,0,.12);

  .card-header {
    padding: 15px;
  }

  .customer-info {
    padding: 2rem;
  }

  .order-button {
    margin-top: 3rem;
    padding: .75rem 5rem;
    background-color: var(--color-lighter-client);
    font-size: 1.8rem;
    font-weight: 600;
    border: none;
    transition: all .3s;

    &:hover {
      transform: scale(1.2);
    }
  }
}

td {
  padding: 2rem 0;
}

.ant-select-selector {
  height: 4rem !important;
  font-size: 1.6rem !important;
  display: flex;
  align-items: center;
}
</style>