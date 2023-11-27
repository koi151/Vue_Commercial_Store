<template>
  <a-row v-if="viewAllowed">
    <div class="card categories-card">
      <div class="card-header categories-card__header">
        <h2>Categories</h2>
      </div> 
      <div class="card-body categories-card__body">
        <div class="products-filters-wrapper d-flex justify-content-around">
          <router-link
            v-if="permissions.createAllowed"
            :to="`${adminPrefix}/product-categories/create`" 
            class="add-button"
          >
            <i class="fa-solid fa-plus"></i> 
            <span>Add new</span>
          </router-link>
        </div>
        <table class="categories-table" multi-checkbox>
          <thead class="categories-table__head">
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
            <th>Position</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr 
              v-for="(category, index) in categories" 
              :key="category.id"
              class="category-wrapper"
            >
              <td>
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  :value="category._id"
                  name="id"
                  ref="checkboxes" 
                >
              </td>
              <td>
                {{ index + 1 }}
              </td>
              <td>
                <img :src="category.thumbnail" class="category-image" />
              </td>
              <td>
                {{ category.title }}
              </td>
              <td>
                <input 
                  class='input-position'
                  type='number'
                  :value="category.position" 
                  min='1'
                  name="position"
                /> 
              </td>
              <td>
                <StatusButton
                  v-if="permissions.editAllowed"
                  :status="category.status"
                  :product-id="category._id"
                  @update-status="changeStatusHandleClick(category._id, category.status)"
                />
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
                  <a-tooltip  v-if="permissions.editAllowed" title="Edit category">
                    <a-button class="edit-btn">
                      <router-link :to="`${adminPrefix}/product-categories/edit/${category._id}`">
                        <edit-outlined />
                      </router-link>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip 
                    v-if="permissions.deleteAllowed"
                    title="Delete category"
                  >
                    <a-popconfirm
                      title="Are you sure to delete this category ?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="deleteConfirm(category._id)"
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
import ProductCategoriesServiceAdmin from '@/services/admin/product-categories.service'
import { defineComponent, ref } from 'vue'
import { DeleteOutlined, EditOutlined, SolutionOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';


export default defineComponent({
  name: 'categories-page-admin',
  components: {
    DeleteOutlined,
    EditOutlined,
    SolutionOutlined,
    // StatusFilter
  },
  setup() {
    const viewAllowed = ref(false);
    return {
      viewAllowed
    }
  },
	data() {
    return {
      categories: {
        status: 'active',
      },
      userRole: {},
      permissions: {},
      adminPrefix: "/admin",
    };
  },
	
	methods: {
    async getCategories() {
      try {
        const response = await ProductCategoriesServiceAdmin.getCategories();
        if (!response) {
          message.error('Error occurred, can not get categories data', 3);
        } else {
          this.categories = response.categories;
          this.userRole = response.userRole;
          this.permissions = response.permissions;
          this.viewAllowed = true;
        }

      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.error('No view permission allowed', 3);
          this.viewAllowed = false;
        } else {
          message.error('Error occurred, can not get categories data', 3);
        }
      }
    },

    async changeStatusHandleClick(categoryId, currentStatus) {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await ProductCategoriesServiceAdmin.changeStatus(newStatus, categoryId);
      if (response) {
        const category = this.categories.find(category => category._id === categoryId);
        
        if (category) {
          category.status = newStatus;
          message.success('Update category status successful !', 3);
        } else message.error('Error occurred, can not update category', 3);
        
      } else {
        message.error('Error occurred, can not update category', 3);
      }
    },

    async deleteConfirm(productId) {
      try {
        const response = await ProductCategoriesServiceAdmin.deleteCategory(productId);
        if (response) {
          this.categories = await ProductCategoriesServiceAdmin.getCategories();
          message.success('Product deleted successfully', 3);
        }
        
      } catch (error) {
        message.error('Error occurred, can not delete category', 3);
      }
    },

    checkAll() {
      this.$refs.checkboxes.forEach(checkbox => {
        checkbox.checked = this.$refs.checkAllBox.checked;
      });
    },
	},

	async mounted() {
    await this.getCategories();
  },
})
</script>

<style lang="scss">

.categories-card {
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
}
</style>