<template>
	<main id="main" class="content">
    <img
      src="../../../../assets/images/core/home-section-1-bg.jpg" 
        class="client-layout__content--img"
      >
      <div class="section-hero">
        <div class="text-box">
          <span class="text-box__mini-title">New Arrival</span>
          <h2 class="text-box__title">
            Discover Our Feature Products
          </h2>
          <p class="text-box__description">
            Brand new products with exellent quality waiting 
            for you to discover, try it now with discounted price
          </p>
          <router-link to="/products" class="text-box__btn">
            <button>
              Buy now
            </button>
          </router-link>
        </div>
      </div>
    <FeatureProduct />
	</main>
</template>

<script>
// import ProductServiceClient from '@/services/client/products.service'
import FeatureProduct from '@/components/client/FeatureProducts.vue'

export default {
  name: 'home-page',
  components: {
    FeatureProduct
  },
	data() {
    return {
      products: [],
    };
  },
	
	methods: {
    // async getProducts() {
    //   try {
    //     this.products = await ProductServiceClient.getProducts();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
	},

	mounted() {
    // this.getProducts();
  },
}
</script>

<style lang="scss">
.client-layout { 
  
  &__content {
    background-color: #fff;
    // padding: 0 50px;
    &--img {
      left: 0;
      width: 100%;
      height: 55rem;
      object-fit: cover;
    }
  }

  .section-hero {
    position: relative;
    
    .text-box {
      background: #FFF3E3;
      padding: 4rem 5rem;
      width: 45rem;
      position: absolute;
      top: -48rem;
      right: 15rem;
      border-radius: 10px;
      z-index: 2;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);

      &__mini-title {
        color: var(--color-text-light);
        font-family: var(--font-2);
        font-size: 1.5rem;
        font-weight: 600;
        line-height: normal;
        letter-spacing: .3rem;
      }

      &__title {
        margin: 0;
        padding: 1.5rem 0;
        font-family: var(--font-2);
        color: var(--color-hightlight-client);
        font-size: 3.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 135%;
        letter-spacing: .1rem;
      }

      &__description {
        color: #333;
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
      }

      &__btn {
        button {
          margin-top: 2rem;
          font-size: 1.8rem;
          text-transform: uppercase;
          text-decoration: none;
          padding: .75rem 3rem;
          color: var(--color-hightlight-client);
          border: 3px solid #cdb464;
          transition: ease-in-out .2s;
          font-weight: 600;
          letter-spacing: .2rem;

          &:hover {
            background-color: var(--color-hightlight-client);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>