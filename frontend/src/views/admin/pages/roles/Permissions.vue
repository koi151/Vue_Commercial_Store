<template>
  <div class="mr-20" v-if="viewAllowed">
    <h1 class="mb-4">Permissions</h1>
    <div 
      v-if="roles"
      class="d-flex justify-content-center align-items-center flex-column" 
      style="width: 100%">
      <div>
        <button 
          type="submit" class="btn btn-primary mb-3" 
          @click="updatePermissions"
          v-if="permissions.editAllowed"
        >
          Update
        </button>
      </div>

      <table 
        class="table-hover" 
        table-permissions
        width="100%"
      >
        <thead>
          <tr class="table-row-custom">
            <th>Features</th>
            <template v-for="role in roles" :key="role.id">
              <th 
                class="text-center"
                :value="role.title"
              >
                {{ role.title }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr data-name="id" class="d-none">
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input 
                type="text" 
                :value="role._id"
              >
            </td>
          </tr>

          <tr>
            <th colspan="4">
              Products
            </th>
          </tr>
          <tr data-name="products_view">
            <td>
              View
            </td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="products_create">
            <td>Add new</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="products_edit">
            <td>Edit</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="products_delete">
            <td>Delete</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>

          <!-- Product category -->
          <tr>
            <th colspan="4">
              Product Categories
            </th>
          </tr>
          <tr data-name="product-categories_view">
            <td>
              View
            </td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="product-categories_create">
            <td>Add new</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="product-categories_edit">
            <td>Edit</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="product-categories_delete">
            <td>Delete</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>

          <!-- Group roles -->
          <tr>
            <th colspan="4">
              Group roles
            </th>
          </tr>
          <tr data-name="roles_view">
            <td>
              View
            </td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="roles_create">
            <td>Add new</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="roles_edit">
            <td>Edit</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="roles_delete">
            <td>Delete</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>

          <!-- Account -->
          <tr>
            <th colspan="4">
              Accounts
            </th>
          </tr>
          <tr data-name="accounts_view">
            <td>
              View
            </td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="accounts_create">
            <td>Add new</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="accounts_edit">
            <td>Edit</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
          <tr data-name="accounts_delete">
            <td>Delete</td>
            <td 
              v-for="role in roles" 
              :key="role.id"
              class="text-center"
            >
              <input type="checkbox">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form
      id="form-change-permissions"
      method="POST"
      :action="`${adminPrefix}/roles/permissions?_method=PATCH`"
      class="d-none"
      @submit="submitForm($event)"
    >
      <div class="form-group">
        <input type="text" class="form-control" name="permissions" />
      </div>
    </form>
  </div>
</template>

<script>
import RolesServiceAdmin from '@/services/admin/roles.service'
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue';


export default defineComponent({
  name: 'roles-permissions-admin',
  components: {

  },
	data() {
    return {
      permissions: [],
      roles: [],
      adminPrefix: "/admin",
    };
  },
  setup() {
    const viewAllowed = ref(false);
    return {
      viewAllowed
    }
  },
	
	methods: {
    async updatePermissions($event) {
      try {
        $event.preventDefault();

        let result = [];
        const tablePermissions = document.querySelector('[table-permissions]');
        const rows = tablePermissions.querySelectorAll('[data-name]');

        rows.forEach(row => {
          const name = row.getAttribute("data-name");
          const inputs = row.querySelectorAll("input");

          if (name == 'id') {
            inputs.forEach(input => {
              const value = input.value;
              console.log('input, value:',input, value)
              result.push({
                id: value,
                permissions: []
              });
            })
          } else {
            inputs.forEach((input, index) => {
              const checked = input.checked;
              if (checked) {
                result[index].permissions.push(name);
              }
            })
          }
        })
        const response = await RolesServiceAdmin.updatePermissions(result);
        if (response) {
          message.success('Permissions updated successfully!', 3);
        }

      } catch (error) {
        console.log('Error occurred:', error);
        message.error('Error occurred, can not update permissions', 3);
      }
    },
    
    async getRoles() {
      try {
        const response = await RolesServiceAdmin.getRoles();
        if (!response.success) {
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

    setPermissions() {
      setTimeout(() => {
        const tablePermissions = document.querySelector('[table-permissions]');

        if (this.roles) {
          const records = JSON.parse(JSON.stringify(this.roles));
          console.log("records:", records)

          records.forEach((record, index) => {
            const permissions = record.permissions;

            permissions.forEach(permission => {
              const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
              const input = row.querySelectorAll("input")[index];
              input.checked = true;
            })
          })
        }
      }, 1000)
    },

    checkAll() {
      this.$refs.checkboxes.forEach(checkbox => {
        checkbox.checked = this.$refs.checkAllBox.checked;
      });
    },
  },

	mounted() {
    this.getRoles(),
    this.setPermissions()
  },
})
</script>

<style lang="scss" scoped>
table {
  border: 2px solid #30135208;
  td, th {
    padding: .5rem 2rem;
  }

  tr:nth-child(even){
    background-color: #e9e9e9d4;
  }

  tr:hover {
    background-color: #d2d1d491;
  }
}

</style>