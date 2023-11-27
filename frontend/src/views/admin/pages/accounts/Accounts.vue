<template>
  <a-row v-if="viewAllowed">
    <div class="card categories-card">
      <div class="card-header categories-card__header">
        <h2>Accounts</h2>
      </div> 
      <div class="card-body categories-card__body">
        <div class="products-filters-wrapper d-flex justify-content-around">
          <router-link
            v-if="permissions.createAllowed"
            :to="`${adminPrefix}/accounts/create`" 
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
            <th>Index</th>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr 
              v-for="(account, index) in accounts" 
              :key="account.id"
              class="account-wrapper"
            >
              <td>
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  :value="account._id"
                  name="id"
                  ref="checkboxes" 
                >
              </td>
              <td>
                {{ index + 1 }}
              </td>
              <td>
                <img :src="account.avatar" class="account-image" />
              </td>
              <td>
                {{ account.fullName }}
              </td>
              <td>
                {{ account.role.title }}
              </td>
              <td>
                {{ account.email }}
              </td>
              <td>
                <StatusButton
                  v-if="permissions.editAllowed"
                  :status="account.status"
                  :product-id="account._id"
                  @update-status="changeStatusHandleClick(account._id, account.status)"
                />
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
                    title="Edit account"
                  >
                    <a-button class="edit-btn">
                      <router-link :to="`${adminPrefix}/accounts/edit/${account._id}`">
                        <edit-outlined />
                      </router-link>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip
                    v-if="permissions.deleteAllowed" 
                    title="Delete account"
                  >
                    <a-popconfirm
                      title="Are you sure to delete this account ?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="deleteConfirm(account._id)"
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
import AccountsServiceAdmin from '@/services/admin/accounts.service'
import { defineComponent, ref } from 'vue'
import { DeleteOutlined, EditOutlined, SolutionOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';


export default defineComponent({
  name: 'accounts-page-admin',
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
      accounts: [],
      adminPrefix: "/admin",
      permissions: []
    };
  },
	
	methods: {
    async getAccounts() {
      try {
        const response = await AccountsServiceAdmin.getAccounts();
        if (!response.success) {
          message.error('Error occurred, can not get data', 3);
        } else {
          this.accounts = response.accounts;
          this.viewAllowed = true;
          this.permissions = response.permissions;
        }

      } catch (error) {
        console.log(error);
        message.error('Error occurred, can not get data', 3);
      }
    },

    async changeStatusHandleClick(accountId, currentStatus) {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await AccountsServiceAdmin.changeAccountStatus(newStatus, accountId);
      if (response) {
        const account = this.accounts.find(account => account._id === accountId);
        
        if (account) {
          account.status = newStatus;
          message.success('Update account status successful !', 3);
        } else message.error('Error occurred, can not update account', 3);
        
      } else {
        message.error('Error occurred, can not update account', 3);
      }
    },

    async deleteConfirm(productId) {
      try {
        const response = await AccountsServiceAdmin.deleteAccount(productId);
        if (response) {
          this.accounts = await AccountsServiceAdmin.getAccounts();
          message.success('Account deleted successfully', 3);
        }
        
      } catch (error) {
        console.log('Error occurred:', error)
        message.error('Error occurred, can not delete account', 3);
      }
    },

    checkAll() {
      this.$refs.checkboxes.forEach(checkbox => {
        checkbox.checked = this.$refs.checkAllBox.checked;
      });
    },
	},

	mounted() {
    this.getAccounts();
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

    .account-image {
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