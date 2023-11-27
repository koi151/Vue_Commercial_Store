<template>
  <div class="detail-wrap row">
    <div v-if="cartItems.length > 0" class="cart-wrap col-md-7">
      <div 
        v-for="cartItem in cartItems" 
        :key="cartItem.product.id"
        class="cart-item d-flex"
      >
        <div class="cart-item__img col-md-5">
          <img :src="cartItem.product.thumbnail">
        </div>
        <div class="cart-item__content col-md-7">
          <div class="d-flex justify-content-between" style="width: 100%;">
            <h2 class="cart-item__content--title">
              {{ cartItem.product.title }}
            </h2>
            <a-button 
              type="danger" 
              class="delete-btn d-flex justify-content-center align-items-center"
              @click="handleDeleteProduct(cartItem.product._id)"
            >
              <delete-outlined />
            </a-button>
          </div>
          <div class="d-flex flex-column">
            <span class="cart-item__content--default-price">
              Default price: ${{ cartItem.product.price }}
            </span>
            <span class="cart-item__content--new-price">
              Promo: ${{ cartItem.product.newPrice }}
            </span>
          </div>
          <span class="cart-item__content--quantity d-flex align-items-center">
            Quantity:
            <a-input-number
              v-model:value="cartItem.quantity"
              :max="cartItem.product.stock"
              :step="1"
              :min="1"
              class="custom-input-quantity"
            />
          </span>
          <div class="line"></div>
          <span class="cart-item__content--total">
            Total: ${{ cartItem.quantity * cartItem.product.newPrice}}
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
    <div class="payment col-md-5">
      <div class="d-flex justify-space-between">
        <div class="payment__title">
          Summary:
        </div>
        
      </div>
      <div class="line-2"></div>
      <span class="payment__promo-title">
        Promo code
      </span>
      <div class="d-flex" style="margin-top: 1.5rem; width: 100%;">
        <input 
          class="payment__promo-input"
          placeholder="Input promo code..."
        >
        <button class="payment__promo-apply-btn">
          Apply
        </button>
      </div>
      <div class="line-2" style="margin-top: 3.5rem;"></div>
      <div class="payment__sub-total d-flex justify-content-between">
        <span>
          Sub total
        </span>
        <span>
          ${{ subtotal }}
        </span>
      </div>
      <div class="payment__shipping-fee d-flex justify-content-between">
        <span>Shipping fee</span>
        <span>${{ shippingFee }}</span>
      </div>
      <div class="payment__order-total d-flex justify-content-between">
        <span>Order total</span>
        <span>${{ orderTotal }}</span>
      </div>
      <button class="payment__checkout" @click="handlePaymentClick()">
        Process to checkout
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';
import { defineComponent } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'product-cart-client',
  components: {
    DeleteOutlined
  },

  data() {
    return {
      cartItems: [],
    };
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.product.newPrice,
        0
      );
    },

    shippingFee() {
      return 15 * this.cartItems.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0);
    },

    orderTotal() {
      return this.subtotal + this.shippingFee;
    },
  },

  methods: {
    handlePaymentClick() {
      this.$router.push('/checkout');
    },

    handleDeleteProduct(productId) {
      const cartStore = useCartStore();
      cartStore.removeFromCart(productId);
    },
    
  },

  mounted() {
    // Access the cart store
    const cartStore = useCartStore();

    // Lấy thông tin giỏ hàng từ localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Set giỏ hàng trong store với dữ liệu từ localStorage
    cartStore.setCartItems(storedCartItems);

    // Set giỏ hàng trong component với dữ liệu từ localStorage
    this.cartItems = storedCartItems;
  },

});
</script>

<style lang="scss" scoped>
.detail-wrap {
  padding: 5rem;
  width: 100%;
  position: relative;
  .cart-wrap {
    overflow-y: scroll;
    height: 45rem;

    .cart-item {
      background-color: #fff;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 10px 0 rgba(209, 209, 209, 0.12);

      &__img {
        img {
          width: 22rem;
          aspect-ratio: 4/3;
          object-fit: cover;
        }
      }

      &__content {
        position: relative;
        
        &--title {
        
        }

        &--default-price {
          color: #a3a3a3;
          text-decoration: line-through;
        }

        &--new-price {
          margin: .5rem 0;
        }

        &--quantity {
          
        }

        &--total {
          color: var(--color-hightlight-client);
          font-size: 2rem;
        }
      }
    }
  }

  .payment {
    margin-left: 3rem;
    padding: 3rem;
    width: 35%;
    background-color: #fff;
    box-shadow: 0 8px 24px 0 rgba(0,0,0,.12);
    position: relative;

    &__title {
      color: var(--color-hightlight-client);
      font-size: 2.5rem;
      font-weight: 600;
    }

    &__promo-title {
      text-transform: uppercase;
      font-size: 1.8rem;
      font-weight: 600;

    }

    &__promo-input {
      padding: .75rem 1rem;
      width: 70%;
    }

    &__promo-apply-btn {
      width: 30%;
      background-color: #000;
      color: #fff;
      transition: all .3s;

      &:hover {
        background-color: #3d3d3d;
      }
    }

    &__sub-total, &__shipping-fee {
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    &__order-total {
      color: var(--color-hightlight-client);
      font-size: 2.2rem;
      margin-top: 1rem;
    }

    &__checkout {
      background-color: var(--color-hightlight-client);
      color: #fff;
      font-size: 1.6rem;
      text-transform: uppercase;
      padding: .65rem;
      position: absolute;
      bottom: 3rem;
      left: 3rem;
      right: 3rem;
      transition: all .3s;

      &:hover {
        background-color: var(--color-lighter-client);
      }
    }
  }
  .line {
    margin: 1.5rem 0rem;
    height: 1.5px;
    background-color: #ddd;
    width: 80%;
  }

  .line-2 {
    margin: 2rem 0rem;
    height: 1.5px;
    background-color: #ddd;
    width: 100%;
  }

  .custom-input-quantity {
    margin-left: 1rem;
    width: 5rem;
  }
}
</style>
