<template>
  <div class="row">
    <div class="product-wrapper">
      <div class="product-wrapper__left col-md-5">
        <img :src="product.thumbnail">
      </div>
      <div class="product-wrapper__right col-md-7">
        <div class="d-flex flex-column">
          <h1 class="product-wrapper__right--title">
            {{ product.title }}
          </h1>
          <span class="product-wrapper__right--stock">
            Stock: {{ product.stock }}
          </span>
        </div>
        <div class="line"></div>
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 class="product-wrapper__right--default-price">
              ${{ product.price }}
            </h3>
            <h3 class="product-wrapper__right--new-price">
              ${{ product.newPrice }}
            </h3>
          </div>
          <p v-html="product.description"></p>
        </div>
        <div class="line"></div>
        <div class="d-flex mt-20">
          <!-- <input type="number" min="1"> -->
          <a-input-number
            v-model:value="quantity"
            :min="1"
            :max="product.stock"
            :step="1"
            defaultValue="1"
          />
          <button 
            class="add-to-cart-btn"
            @click="addToCart()"  
          >
            Add to cart
          </button>
        </div>
      </div>        
    </div>
  </div>
</template>

<script>
import ProductServiceClient from '@/services/client/products.service';
import { useCartStore } from '@/stores/cart';
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'product-detail-client',
  components: {
	},
	data() {
    return {
      product: [],
      quantity: 1,
    };
  },
	
	methods: {
    async getProductDetail() {
      try {
        const productSlug = this.$route.params.productSlug;
        const response = await ProductServiceClient.getProductDetail(
          productSlug, 
          {
            params: {
              productSlug,
            },
          }
        );
        
        if (response.success) {
          this.product = response.product;
          console.log('this products:', this.product)
        }

      } catch (error) {
        message.error('Error occurred, can not get product information')
      }
    },

    addToCart() {
      console.log('product, quantity:', this.product, this.quantity)
      // Access the cart store
      const cartStore = useCartStore();

      // Add the current product to the cart
      cartStore.addToCart(this.product, this.quantity);

      message.success('Product added to cart', 3);
    },
	},

	mounted() {
    this.getProductDetail();
  },
})
</script>

<style lang="scss">

.product-wrapper {
  padding: 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &__left {
    display: flex;
    align-items: center;
    img {
      max-width: 40rem;
      height: auto;
      object-fit: cover;
    }
  }

  &__right {
    display: flex;
    justify-content: center;
    flex-direction: column;

    &--title {
      font-size: 3rem;

    }

    &--stock {
      color: #6f6f6f;
      font-size: 1.4rem;
      letter-spacing: .1rem;
      margin-bottom: 1rem;
    }

    &--default-price {
      margin-top: 2rem;
      text-decoration: line-through;
      font-size: 2.2rem;
      color: #b9b9b9;
      font-weight: 400;
    }
    
    &--new-price {
      margin-top: 2rem;
      margin-left: 1rem;
      font-size: 2.2rem;
    }
  }

  .line {
    height: 1.5px;
    width: 90%;
    background-color: #ddd;
  }

  .ant-input-number-focused {
    border-color: #ffc30d;
    box-shadow: 0 0 0 2px #f4e7c5;
  }

  .add-to-cart-btn {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: .8rem 3.5rem;
    margin-left: 2rem;
    font-size: 1.3rem;
    color: #fff;
    background-color: #000;
    border: 1px solid #000;
    transition: all .3s;

    &:hover {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
    }
  }

  .ant-input-number-input {
    padding-left: 3rem;
    font-size: 1.6rem;
  }
}
</style>