<template> 
  <div class="card" :loading="loading" > 
    <h2 class="card-header"> Edit Account</h2> 
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
            > 
          </div> 
          <div class="form-group col-6">
            <label for="parentId">Email</label>
            <input
              class="form-control input-custom"    
              v-model="account.email"
            >
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
          <div class="form-group col-6 mt-20">
            <label for="password">Password</label>
            <input
              class="form-control input-custom"    
              type="password"
              name="password"
              required
            >
          </div>
          <div class="form-group d-flex flex-end mt-20 mb-20 col-6"> 
            <div class="form-check mr-20"> 
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
          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-primary submit-button"
            >
              Update account information
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
import AccountsServiceAdmin from '@/services/admin/accounts.service'

export default defineComponent({
  name: 'edit-account-admin',
  components: {
  },
  data() {
    return {
      account: {},
      imagePreview: null,
      avatar: null,
      loading: false,
      adminPrefix: "/admin", // temp fixed 
    };
  },
  methods: {
    async getSingleAccount() {
      try {
        const response = await AccountsServiceAdmin.getSingleAccount(this.$route.params.id);
          
        if (response.success) {
          this.account = response.data;
          message.success(response.message, 3) 
        }
        
      } catch (error) {
        console.log('Error occurred:', error);
        this.displayErrorMessage('Error occurred, can not get account information');
      }
    },
    
    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.avatar = file;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagePreview = reader.result; //
        }
        reader.readAsDataURL(file);
      }
    },

    async submitForm($event) {
      $event.preventDefault();

      try {
        const response = await AccountsServiceAdmin.updateAccount( 
          this.$route.params.id,
          {
            account: this.account,
            avatar: this.avatar, 
          }
        );
        if (response) {
          this.displaySuccessMessage('Account has been updated successfully!');
        }

      } catch (error) {
        console.log('Error occurred:', error);
        this.displayErrorMessage('Error occurred, can not update account');
      }
    },

    displaySuccessMessage(messageContent) {
      message.success(messageContent, 3);
    },

    displayErrorMessage(errorMessage) {
      message.error(errorMessage, 3);
    },

  },

  mounted() {
    this.getSingleAccount()
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