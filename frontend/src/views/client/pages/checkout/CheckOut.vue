<template>
  <a-row v-if="cartItems.length > 0">
    <div class="card categories-card">
      <div class="card-header categories-card__header">
        <h2>Product payments</h2>
      </div> 
      <div class="card-body categories-card__body">
        <table class="categories-table" multi-checkbox>
          <thead class="categories-table__head">
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>View detail</th>
            <th style="width: 15rem;">Total</th>
          </thead>
          <tbody>
            <tr 
              v-for="(cartItem, index) in cartItems" 
              :key="cartItem.id"
              class="cartItem.product-wrapper"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                <img :src="cartItem.product.thumbnail" class="category-image" />
              </td>
              <td style="font-size: 1.8rem;">
                {{ cartItem.product.title }}
              </td>
              <td class="product-quantity">
                {{ cartItem.quantity }}
              </td>
              <td>
                <div class="actions-wrapper">
                  <a-tooltip title="View detail">
                    <a-button class="detail-btn">
                      <router-link :to="`/products/detail/${cartItem.product.slug}`">
                        <solution-outlined />
                      </router-link>
                    </a-button>
                  </a-tooltip>
                </div>
              </td>
              <td class="product-total-price">
                ${{ cartItem.quantity * cartItem.product.newPrice}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="customer-card card"> 
      <h2 class="card-header"> Customer Infomation:</h2> 
      <div class="card-body"> 
        <form
          method="POST"
          @submit="submitForm($event)"
          >
          <div class="customer-info row"> 
            <div class="form-group col-5"> 
              <label for="fullName">Full Name</label> 
              <input 
                v-model="customerInfo.fullName" 
                placeholder="Input your full name..."
                type="text" 
                class="form-control input-custom" 
                id="fullName" 
                name="fullName" 
                style="width: 100%;" 
                required
              > 
            </div>
            <div class="form-group col-7"> 
              <label for="address">Address</label> 
              <input 
                v-model="customerInfo.address"
                placeholder="Input your address..."
                type="text" 
                class="form-control input-custom" 
                id="address" 
                name="address" 
                style="width: 100%;" 
                required
              > 
            </div>  
            <div class="form-group col-12 mt-20"> 
              <label for="desc" class="form-label"> 
                Notes:
              </label> 
              <editor 
                v-model="customerInfo.notes"
                api-key="zabqr76pjlluyvwebi3mqiv72r4vyshj6g0u07spd34wk1t2" 
                :init="{ 
                  toolbar_mode: 'sliding', 
                  plugins: ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount', 
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat', 
                  tinycomments_mode: 'embedded', tinycomments_author: 'Author name', mergetags_list: [ { value: 'First.Name', title: 'First Name' }, { value: 'Email', title: 'Email' }, ], 
                }"
                /> 
            </div>
            <div class="form-group col-6 mt-20"> 
              <label for="phone">Phone number</label> 
              <input 
                v-model="customerInfo.phone"
                type="tel"
                class="form-control input-custom" 
                name="phone"
                id="phone"
                style="width: 100%;" 
                required
                placeholder="Type your phone number"
              > 
            </div>
            <div class="form-group col-6 mt-20">
              <span>Payment method:</span>
              <a-select
                v-model:value="customerInfo.payment" 
                style="width: 100%"
              >
                <a-select-option value="cash">Cash</a-select-option>
                <a-select-option value="banking">Online Banking</a-select-option>
                <a-select-option value="debit">Debit Card</a-select-option>
              </a-select>
            </div> 

            <div class="form-group d-flex justify-content-end align-items-center">
              <button 
                @click="handleSubmitPayment"
                type="submit" 
                class="btn btn-primary order-button"
              >
                Order
              </button>
            </div>
          </div>
        </form>    
      </div> 
    </div>

  </a-row>
  <h1 v-else>Loading ...</h1>
</template>

<script>
import { useCartStore } from '@/stores/cart';
import { defineComponent } from 'vue'
import { SolutionOutlined } from '@ant-design/icons-vue';
import Editor from '@tinymce/tinymce-vue'
import OrderServiceClient from '@/services/client/order.service'
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'categories-page-admin',
  components: {
    SolutionOutlined,
    Editor
  },

	data() {
    return {
      cartItems: [],
      customerInfo: {
        payment: 'cash'
      },
    };
  },
	
	methods: {
    async handleSubmitPayment($event) {
      $event.preventDefault();

      try {
        const orderItems = this.cartItems.map(cartItem => ({
          productId: cartItem.product._id,
          quantity: cartItem.quantity,
          title: cartItem.product.title,
          thumbnail: cartItem.product.thumbnail,
          price: cartItem.product.newPrice
        }));

        const response = await OrderServiceClient.createOrder({
          cartItems: orderItems,
          customerInfo: this.customerInfo,
        });

        if (response.success) {
          message.success('Order successful, your order is being processed!')
        } else {
          message.error('Error occurred, can not process your order')
        }

      } catch (error) {
        console.log(error)
        message.error('Error occurred, can not get data')
      }
    }
  },

  mounted() {
    const cartStore = useCartStore();
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartStore.setCartItems(storedCartItems);
    this.cartItems = storedCartItems;
  },
})
</script>

<style lang="scss">
.categories-card {
  margin: 5rem;
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
  margin: 0 5rem 5rem 5rem;
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

.ant-select-selector {
  height: 4rem !important;
  font-size: 1.6rem !important;
  display: flex;
  align-items: center;
}
</style>