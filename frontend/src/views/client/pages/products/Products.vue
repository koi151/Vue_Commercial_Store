<template>
  <div class="section-1">
		<h1>Products</h1>
    <div class="filters d-flex">
      <SearchBarClient @products-updated="handleProductsUpdated" />
      <SortingProducts @products-updated="handleProductsUpdated" />
      <a-button 
        type="primary"
        danger
        @click="clearFilters"
        class="ml-20"
      >
        Clear filters
      </a-button>
    </div>
    <div v-if="products.length > 0" class="product-list">
      <a-row class="product-row d-flex justify-content-center align-items-center">
        <a-col 
          v-for="product in products" 
          :key="product.id" 
          class="product-list__item d-flex justify-content-center align-items-center"
          :xxl="6" :xl="6"
        >
          <div class="box-wrap">
            <img :src="product.thumbnail">
            <div class="box-wrap__content"> 
              <router-link 
                :to="`/products/detail/${product.slug}`"
                style="text-decoration: none"
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
    <a-pagination 
      showQuickJumper 
      :total="pagination.productsCount" 
      :pageSize="pagination.limitItems"
      @change="handleChangePagination" 
      class="pagination-element"
    />
  </div>
</template>

<script>
import ProductServiceClient from '@/services/client/products.service'
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';
import SearchBarClient from '@/components/client/SearchBarClient.vue'
import SortingProducts from '@/components/client/SortingProducts.vue'

export default defineComponent({
  name: 'products-page-client',
  components: {
    'shopping-cart-outlined': ShoppingCartOutlined,
    SearchBarClient,
    SortingProducts
	},
	data() {
    return {
      products: [],
      pagination: {}
    };
  },
	
	methods: {
    async getProducts(pageNum = null) {
      try {
        const currentRoute = this.$router.currentRoute.value;
        const page = pageNum !== null ? pageNum : currentRoute.query.page || null;

        // Extracting sortKey and sortValue from the current route
        const { sortKey, sortValue } = currentRoute.query

        // Rest of your code...

        if (pageNum !== null) {
          this.$router.push({
            path: currentRoute.path,
            query: { ...currentRoute.query, page },
          });
        }

        const response = await ProductServiceClient.getProducts({
          params: {
            page: page,
            sortKey: sortKey, // Include sortKey in the params
            sortValue: sortValue, // Include sortValue in the params
          },
        });

        if (response.success) {
          this.products = response.products;
          this.pagination = response.pagination;
        }

      } catch (error) {
        message.error('Error occurred, can not get data')
      }
    },

    
    handleProductsUpdated(data) {
      this.products = data.products;
      this.pagination = data.pagination;
    },

    handleChangePagination(pageNum) {
      this.getProducts(pageNum);  
    },

    clearFilters() {
      this.$router.push({ path: '/products' });
      this.getProducts();
    },
	},

	mounted() {
    this.getProducts();
  },
})
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
      // font-family: var(--font-2);
      font-size: 2rem;
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
          aspect-ratio: 4/3;
          height: auto;
          object-fit: cover;
        }

        &__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;

          h4{
            color: #585858;
            font-size: 1.6rem;
            margin: 0;
            margin: .5rem 0 1.5rem 0;
            &:hover {
              color: #666565;
            }
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
          }

          .cart {
            color: #e5b227;
            font-size: 2.5rem;
            color: #797979;
            cursor: pointer;
            transition: all .3s;

            &:hover {
              transform: scale(1.2);
            }
          }

        }
      }
    }
  }
}
</style>