<template> 
  <div class="card" :loading="loading" > 
    <h2 class="card-header"> Create Account</h2> 
    <div class="card-body"> 
      <form
        method="POST"
        enctype="multipart/form-data"
        accept="image/*" 
        @submit="submitForm($event)"
        >
        <div class="row"> 
          <div class="form-group col-6"> 
            <label for="title">Full Name</label> 
            <input 
              type="text" 
              class="form-control input-custom" 
              v-model="account.fullName"
              style="width: 100%;" 
              required
              placeholder="Type your full name"
            > 
          </div> 
          <div class="form-group col-6">
            <label for="parentId">Email</label>
            <input
              class="form-control input-custom"    
              v-model="account.email"
              placeholder="Type your email"
              type="email"
              required
            >
          </div>
          <div class="form-group col-6 mt-20">
            <label for="password">Password</label>
            <input
              class="form-control input-custom"    
              type="password"
              name="password"
              v-model="account.password"
              required
              placeholder="Type your password"
            >
          </div>
          <div class="form-group col-6 mt-20">
            <label for="role_id">Permission</label>
            <select 
              v-model="account.role_id"
              class="form-control input-custom"
              name="role_id"
              id="role_id"
              placeholder="Select account role"
            >
              <option value="" disabled selected>Select role for account</option>
              <option 
                v-for="role in roles" 
                :key="role.id" 
                :value="role._id"
              >
              {{ role.title }}
              </option>
            </select>
          </div>
          <div class="form-group col-6 mt-20"> 
            <label for="title">Phone number</label> 
            <input 
              type="tel"
              class="form-control input-custom" 
              v-model="account.phone"
              style="width: 100%;" 
              required
              placeholder="Type your phone number"
            > 
          </div>
          <div class="form-group d-flex flex-end mt-20 col-6" style="margin-top: 50px;"> 
            <div class="form-check mr-20 ml-20 "> 
              <input 
                v-model="account.status"
                class="form-check-input" 
                type="radio" 
                name="status" 
                id="activeStatus" 
                value="active"
                checked
              > 
              <label class="form-check-label" for="activeStatus">
                Active 
              </label> 
            </div> 
            <div class="form-check"> 
              <input 
                v-model="account.status"
                class="form-check-input" 
                type="radio" 
                id="inactiveStatus" 
                name="status" 
                value="inactive"
              > 
              <label class="form-check-label" for="inactiveStatus"> 
                Inactive 
              </label> 
            </div> 
          </div>
          <div class="form-group col-md-6 mt-20"> 
            <label for="avatar">Avatar</label> 
            <div class="d-flex justify-center align-items-center flex-column">
              <input 
                class="form-control"
                style="font-size: 1.6rem; padding: .75rem"
                size="80"  
                type="file" 
                name="avatar"
                upload-image
                @change="handleImageUpload($event)"
              > 
              <div class='image-preview-wrap'>
                <img  
                  :src="imagePreview ? imagePreview : account.avatar"
                  class="image-preview"
                  upload-image-preview
                >
              </div>
            </div>
          </div>
          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-primary submit-button"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>    
    </div> 
  </div> 
  
</template>


<script>
import { defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import RolesServiceAdmin from '@/services/admin/roles.service';
import AccountsServiceAdmin from '@/services/admin/accounts.service'


export default defineComponent({
  name: 'create-account-admin',
  components: {
  },
  data() {
    return {
      account: {
        status: 'active'
      },
      roles: {},
      imagePreview: null,
      avatar: null,
      loading: false,
      adminPrefix: "/admin", // temp fixed 
    };
  },
  methods: { 
    async getRoles() {
      try {
        const response = await RolesServiceAdmin.getRoles();
        if (!response) {
          message.error('Error occurred, can not get roles data', 3);
        } else {
          this.roles = response;
        }

        console.log('roles', this.roles)

      } catch (error) {
        console.log(error);
        message.error('Error occurred, can not get roles data', 3);
      }
    },

    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.avatar = file;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagePreview = reader.result; 
        }
        reader.readAsDataURL(file);
      }
    },

    async submitForm($event) {
      $event.preventDefault();

      try {
        const response = await AccountsServiceAdmin.createAccount( 
          {
            account: this.account,
            avatar: this.avatar, 
          }
        );
        if (response.success) {
          message.success('Account has been created successfully!', 3);
        } else if (response.error){
          message.error(response.message, 3);
        }

      } catch (error) {
        console.log('Error occurred:', error);
        message.error('Error occurred, can not create account', 3);
      }
    },
  },

  mounted() {
    this.getRoles();
  },
});
</script>


<style lang="scss">
.card {
  .card-header {
    padding: 15px
  }

  .card-body {
    padding: 30px;

    .input-wrapper {
      display: flex;
      flex-direction: column;
    }

    .image-preview {
      padding: 30px;
      width: 25rem;
      height: auto;
      object-fit: cover;
    }
    .image-preview[src=""] {
      display: none;
    }

    .submit-button {
      font-size: 1.5rem;
      padding: .75rem 1.5rem;
    }
  }  
}

.input-custom {
  font-size: 1.6rem;
  height: 4rem;
}

// tiny-mce
.tox-menubar {
  width: 38rem !important ;
  display: flex ;
  justify-content: space-around ;
}


//split scr
</style>