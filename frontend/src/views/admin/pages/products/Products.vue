<template>
  <a-row v-if="viewAllowed">
    <div class="card products-card">
      <div class="card-header products-card__header">
        <h2>Products</h2>
      </div> 
      <div class="card-body products-card__body">
        <div class="products-filters-wrapper d-flex justify-content-around">
          <SearchBar @products-updated="handleProductsUpdated" />
          <StatusFilter @products-updated="handleProductsUpdated"/>
        </div>
        <div class="products-filters-wrapper d-flex justify-content-around">
          <MultiChange 
            :products="products"
            @products-updated="getProducts"
          />
          <SortingOptions @products-updated="handleProductsUpdated" />
          <a-button 
            type="primary"
            danger
            @click="clearFilters"
          >
            Clear filters
          </a-button>
          <router-link 
            v-if="permissions.createAllowed"
            class="add-button"
            :to="`${adminPrefix}/products/create`"
          >
            <i class="fa-solid fa-plus"></i> 
            <span>Add new</span>
          </router-link>
        </div>
        <table class="product-table" multi-checkbox>
          <thead class="product-table__head">
            <th>
              <input 
                type="checkbox" 
                name='checkall'
                @change="checkAll($event)"
                ref="checkAllBox"
              />
            </th>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Lastest update</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr 
              v-for="(product, index) in products" 
              :key="product.id"
              class="product-wrapper"
            >
              <td>
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  :value="product._id"
                  name="id"
                  ref="checkboxes" 
                >
              </td>
              <td style="width: 4rem;">
                {{ calculateProductIndex(index) }} 
              </td>
              <td>
                <img :src="product.thumbnail" class="product-image" />
              </td>
              <td> {{ product.title }} </td>
              <td> ${{ product.price }} </td>
              <td>
                <input 
                  class='input-position'
                  type='number'
                  :value="product.position" 
                  min='1'
                  name="position"
                /> 
              </td>
              <td>
                <StatusButton
                  v-if="permissions.editAllowed"
                  :status="product.status"
                  :product-id="product._id"
                  @update-status="changeStatusHandleClick(product._id, product.status)"
                />
              </td>
              <td>
                No info
              </td>
              <td>
                No info
              </td>
              <td>
                <div class="actions-wrapper">
                  <a-tooltip title="View detail">
                    <a-button class="detail-btn">
                      <solution-outlined />
                    </a-button>
                  </a-tooltip>
                  <a-tooltip
                    v-if="permissions.editAllowed" 
                    title="Edit product"
                  >
                    <a-button class="edit-btn" style="position: relative;">
                      <router-link
                        :to="`${adminPrefix}/products/edit/${product._id}`"
                      >
                        <edit-outlined />
                      </router-link>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip 
                    v-if="permissions.deleteAllowed"
                    title="Delete product"
                  >
                    <a-popconfirm
                      title="Are you sure to delete this product ?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="deleteConfirm(product._id)"
                      @cancel="cancel"
                    >
                      <a-button type="danger" class="delete-btn">
                        <delete-outlined />
                      </a-button>
                    </a-popconfirm>
                  </a-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <a-pagination 
          showQuickJumper 
          :total="pagination.productsCount" 
          :pageSize="pagination.limitItems"
          @change="handleChangePagination" 
          class="pagination-element"
        />
      </div>
    </div>
  </a-row>
  <h1 v-else>No Permission Allowed</h1>
  <form
    id="form-change-status"
    method="POST"
  >
  </form>
</template>


<script>
import ProductServiceAdmin from '@/services/admin/products.service'
import MultiChange from '@/components/admin/MultiChange.vue';
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, SolutionOutlined } from '@ant-design/icons-vue';
import SortingOptions from '@/components/admin/SortingOptions.vue';
import SearchBar from '@/components/admin/SearchBar.vue';
import StatusFilter from '@/components/admin/StatusFilter.vue';


export default defineComponent({
  name: 'products-page-admin',
  components: {
    MultiChange,
    SortingOptions,
    DeleteOutlined,
    EditOutlined,
    SolutionOutlined,
    SearchBar,
    StatusFilter
},
  setup() {
    const viewAllowed = ref(false);
    return {
      viewAllowed
    }
  },
	data() {
    return {
      products: [],
      pagination: {},
      permissions: {},
      adminPrefix: "/admin", // temp fixed 
    };
  },
	
	methods: {

    async deleteConfirm(productId) {
      try {
        const response = await ProductServiceAdmin.deleteProduct(productId);
        if (response) {
          message.success('Product deleted successful', 3);
        }
        this.products = await ProductServiceAdmin.getProducts();
        
      } catch (error) {
        message.error('Error occurred, can not delete product', 3);
      }
    },

    cancel: () => {
      // console.log(e);
      // message.error('Click on No');
    },

    async getProducts(pageNum = null) {
      try {
        const currentRoute = this.$router.currentRoute.value;
        const page = pageNum !== null ? pageNum : currentRoute.query.page || null;

        if (pageNum !== null) {
          this.$router.push({
            path: currentRoute.path,
            query: { ...currentRoute.query, page },
          });
        }

        const response = await ProductServiceAdmin.getProducts({
          params: {
            page: page,
          },
        });

        if (response) {
          this.products = response.products;
          this.pagination = response.pagination;
          this.permissions = response.permissions;
          this.viewAllowed = true;
        }

      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.error('No permission allowed', 3);
          this.viewAllowed = false;
        } else {
          message.error('Error occurred, can not get products data', 3);
        }
      }
    },

    async changeStatusHandleClick(productId, currentStatus) {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await ProductServiceAdmin.changeStatus(newStatus, productId);
      if (response) {
        const product = this.products.find(product => product._id === productId);
        if (product) {
            product.status = newStatus;
        }

        message.success('Update product status successful !', 3);

      } else {
        message.error('Error occurred, can not update product', 3);
      }
    },

    calculateProductIndex(index) {
      return this.pagination.limitItems * (this.pagination.currentPage - 1) + index + 1;
    },

    handleProductsUpdated(data) {
      this.products = data.products;
      this.pagination = data.pagination;
    },

    checkAll() {
      this.$refs.checkboxes.forEach(checkbox => {
        checkbox.checked = this.$refs.checkAllBox.checked;
      });
    },
    
    clearFilters() {
      this.$router.push({ path: '/admin/products' });
      this.getProducts();
    },

    handleChangePagination(pageNum) {
      this.getProducts(pageNum);  
    },

    setActivePage(pageNum) {
      const antPagination = document.querySelector('.ant-pagination');
      const currentPaginationElement = antPagination.querySelector(`.ant-pagination-item-${pageNum}`);

      if (!currentPaginationElement.contains('active')) {
        currentPaginationElement.classList.add('active')
      }
    }
	},
  async mounted() {
    await this.getProducts();
  },
})
</script>


<style lang="scss">

.products-card {
  position: relative;

  &__header {
    padding: 15px;
    h2 {
      margin: 0;
      padding: 0;
    }
  }

  &__body {
    width: 100%;
    
    .products-filters-wrapper {
      display: flex;
      align-items: center;
      padding: 15px 0
    }

    .product-table {
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

      .product-image {
        width: 12rem;
        height: 12rem;
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
  }
  .pagination-element {
    padding-top: 2.5rem;
  }
}
</style>
