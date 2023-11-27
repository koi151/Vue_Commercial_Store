<template> 
  <div class="card" :loading="loading" > 
    <h2 class="card-header"> Create Role </h2> 
    <div class="card-body"> 
      <form
        method="POST"
        enctype="multipart/form-data"
        accept="image/*" 
        @submit="submitForm($event)"
        >
        <div class="row"> 
          <div class="form-group col-12"> 
            <label for="title">Title</label> 
            <input 
              v-model="role.title"
              type="text" 
              class="form-control input-custom" 
              id="title" 
              name="title" 
              style="width: 100%;" 
              required
            > 
          </div> 
          <div class="form-group col-12 mt-20"> 
            <label for="desc" class="form-label"> 
              Description 
            </label> 
            <a-textarea 
              v-model:value="role.description"
              show-count 
              :maxlength="200" 
              style="font-size: 1.6rem;"
            />
          </div> 
          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-primary submit-button mt-20"
            >
              Create role
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

export default defineComponent({
  name: 'create-role-admin',
  data() {
    return {
      loading: false,
      adminPrefix: "/admin", // temp fixed 
      role: {},
    };
  },
  methods: {
    async submitForm($event) {
      $event.preventDefault();

      try {
        const response = await RolesServiceAdmin.createRole(this.role);

        if (response.sucess) {
          message.success('Role has been created successfully!', 3);
        } else if (response.error) {
          message.error(response.message, 3)
        }

      } catch (error) {
        console.log('Error occurred:', error);
        message.error('Error occurred, can not create role', 3);
      }
    },
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

