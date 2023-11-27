<template>
  <a-row v-if="viewAllowed">
    <div class="card custom-card">
      <div class="card-header custom-card__header">
        <h2>Roles</h2>
      </div> 
      <div class="card-body custom-card__body">
        <div class="products-filters-wrapper d-flex justify-content-around">
          <router-link
            v-if="permissions.createAllowed"
            :to="`${adminPrefix}/roles/create`" 
            class="add-button"
          >
            <i class="fa-solid fa-plus"></i> 
            <span>Add new</span>
          </router-link>
        </div>
        <table class="custom-table" multi-checkbox>
          <thead class="custom-table__head">
            <th>Index</th>
            <th>Group roles</th>
            <th>Short description</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr 
              v-for="(role, index) in roles" 
              :key="role.id"
              class="custom-wrapper"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ role.title }}
              </td>
              <td>
                {{ role.description }}
              </td>
              <td>
                <div class="actions-wrapper">
                  <a-tooltip title="View detail">
                    <a-button class="detail-btn">
                      <solution-outlined />
                    </a-button>
                  </a-tooltip>
                  <a-tooltip 
                    title="Edit role"
                    v-if="permissions.editAllowed"
                  >
                    <a-button class="edit-btn">
                      <router-link :to="`${adminPrefix}/roles/edit/${role._id}`">
                        <edit-outlined />
                      </router-link>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip
                    v-if="permissions.deleteAllowed" 
                    title="Delete role"
                  >
                    <a-popconfirm
                      title="Are you sure to delete this role ?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="deleteConfirm(role._id)"
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
import RolesServiceAdmin from '@/services/admin/roles.service'
import { DeleteOutlined, EditOutlined, SolutionOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue';


export default defineComponent({
  name: 'roles-admin',
  components: {
    DeleteOutlined,
    EditOutlined,
    SolutionOutlined,
  },
  setup() {
    const viewAllowed = ref(false);
    return {
      viewAllowed
    }
  },
	data() {
    return {
      roles: [],
      adminPrefix: "/admin",
      permissions: {}
    };
  },
	
	methods: {
    async getRoles() {
      try {
        const response = await RolesServiceAdmin.getRoles();
        if (!response) {
          message.error('Error occurred, can not get roles data', 3);
        } else {
          this.roles = response.roles;
          this.viewAllowed = true;
          this.permissions = response.permissions;
        }
      } catch (error) {
        console.log(error);
        message.error('Error occurred, can not get roles data', 3);
      }
    },

    async deleteConfirm(roleId) {
      try {
        const response = await RolesServiceAdmin.deleteRole(roleId);
        if (response) {
          this.role = await RolesServiceAdmin.getRoles();
          this.roles = this.roles.filter(role => role._id !== roleId);

          message.success('Role deleted successfully', 3);
        }
        
      } catch (error) {
        message.error('Error occurred, can not delete role', 3);
      }
    },    
  },

  checkAll() {
    this.$refs.checkboxes.forEach(checkbox => {
      checkbox.checked = this.$refs.checkAllBox.checked;
    });
  },

	mounted() {
    this.getRoles()
  },
})
</script>

<style lang="scss">

</style>