<template>
  <section class="section-1">
    <a-row>
      <div class="section-1__title-box">
        <h2 class="section-1__title-box--title">
          Feature Products
        </h2>
        <span class="section-1__title-box--description">
          Here are some outstanding products for you
        </span>
      </div>
    </a-row>

    <div v-if="featuredProducts.length > 0" class="product-list">
      <a-row class="product-row d-flex justify-content-center align-items-center">
        <a-col 
          v-for="product in featuredProducts" 
          :key="product.id" 
          class="product-list__item d-flex justify-content-center align-items-center"
          :xxl="6" :xl="6"
        >
          <div class="box-wrap">
            <img :src="product.thumbnail">
            <div class="box-wrap__content">
              <router-link 
                :to="`/products/detail/${product.slug}`"
                style="text-decoration: none; color: #585858"
              >
                <h4>{{ product.title }}</h4>
              </router-link>
              <a-row style="width: 100%">
                <a-col :span="12" class="d-flex flex-column">
                  <span class="box-wrap__content--default-price">
                    ${{ product.price }}
                  </span>
                  <span class="box-wrap__content--new-price">
                    ${{ product.newPrice }}
                  </span>
                </a-col>
                <a-col :span="12" class="d-flex align-items-center flex-column">
                  <span class="box-wrap__content--stock">
                    Stock: {{ product.stock }}
                  </span>
                  <shopping-cart-outlined class="cart"/>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import ProductServiceClient from '@/services/client/products.service';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    'shopping-cart-outlined': ShoppingCartOutlined,
	},
  data() {
    return {
      // products: [],
      featuredProducts: [],
    };
  },
  methods: {
    async getProducts() {
      try {
        const response = await ProductServiceClient.getProductsAndFeatured();
        if (response) {
          this.featuredProducts = response.featuredProducts;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
});
</script>


<style lang="scss">
$box-width: 25rem;

.section-1 {
  padding: 5rem var(--content-padding);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .product-row {
    width: 100%;
  }

  &__title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &--title {
      margin: 0;
      font-family: var(--font-2);
      font-size: 3rem;
      font-weight: 700;
      line-height: normal;
    }

    &--description {
      font-family: var(--font-2);
      color: var(--color-text-light);
      font-size: 1.8rem;
      font-weight: 400;
      line-height: normal;
    }
  }

  .product-list {
    width: 100%;
    margin: 5rem 0;
    display: flex;
    align-items: center;
    justify-self: center;

    &__item {
      margin-bottom: 5rem;

      .box-wrap {
        width: $box-width;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;

        img {
          width: $box-width;
          height: 17rem;
          object-fit: cover;
        }

        &__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;

          h4{
            font-family: var(--font-2);
            font-size: 1.8rem;
            margin: 0;
            margin: .5rem 0 1.5rem 0;
          }

          &--default-price {
            color: var(--color-text-light);
            text-decoration: line-through;
            font-size: 1.4rem;
          }

          &--new-price {
            color: #e5b227;
            font-size: 2rem;
            font-weight: 600;
          }

          &--stock {
            color: #8f8f8fd0;
            // font-size: 2rem;
            // font-weight: 600;
          }

          .cart {
            font-size: 2.5rem;
            color: #797979;
          }

        }
      }
    }
  }

}
</style>