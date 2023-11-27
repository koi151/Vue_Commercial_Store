<template> 
  <div class="card" :loading="loading" > 
    <h2 class="card-header"> Edit category</h2> 
    <div class="card-body"> 
      <form
        method="POST"
        enctype="multipart/form-data"
        accept="image/*" 
        @submit="submitForm($event)"
        >
        <div class="row"> 
          <div class="form-group col-6"> 
            <label for="title">Title</label> 
            <input 
              type="text" 
              class="form-control input-custom" 
              v-model="category.title"
              id="title" 
              name="title" 
              style="width: 100%;" 
              required
            > 
          </div> 
          <div class="form-group col-6">
            <label for="parentId">Parent category</label>
            <select
              name='parentId'
              id='parentId'
              class="form-select custom-select"    
              v-model="category.parentId"
            >
              <SelectTree v-if="this.categoryRecords.length > 0" :records="this.categoryRecords" />
            </select>
          </div>
          <div class="form-group col-12 mt-20"> 
            <label for="desc" class="form-label"> 
              Description 
            </label> 
            <editor 
              v-model="category.description"
              api-key="zabqr76pjlluyvwebi3mqiv72r4vyshj6g0u07spd34wk1t2" 
              :init="{ 
                toolbar_mode: 'sliding', 
                plugins: ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount', 
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat', 
                tinycomments_mode: 'embedded', tinycomments_author: 'Author name', mergetags_list: [ { value: 'First.Name', title: 'First Name' }, { value: 'Email', title: 'Email' }, ], 
              }" 
              /> 
          </div> 
          <div class="form-group col-md-6 mb-20"> 
            <label for="thumbnail">Image</label> 
            <div class="d-flex justify-center align-items-center flex-column">
              <input 
                class="form-control"
                style="font-size: 1.6rem; padding: .75rem"
                size="80"  
                type="file" 
                id="fileInput" 
                name='thumbnail' 
                upload-image
                @change="handleImageUpload($event)"
              > 
              <div class='image-preview-wrap'>
                <img  
                  :src="imagePreview ? imagePreview : category.thumbnail"
                  class="image-preview"
                  upload-image-preview
                >
              </div>
            </div>
          </div>
          <div class="form-group col-md-6 mb-20"> 
            <label for="position">Position</label> 
            <input 
              v-model="category.position"
              class="form-control input-custom" 
              type="number" 
              id="position" 
              name="position" 
              min="0"
              placeholder="Auto increase"
            > 
          </div>
          <div class="form-group d-flex flex-end mt-20 mb-20 col-6"> 
            <div class="form-check mr-20"> 
              <input 
                v-model="category.status"
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
                v-model="category.status"
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
              Update category information
            </button>
          </div>
        </div>
      </form>    
    </div> 
  </div> 
  
</template>


<script>
import Editor from '@tinymce/tinymce-vue'
import { defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import ProductCategoriesServiceAdmin from '@/services/admin/product-categories.service';
import SelectTree from '../../../../components/admin/SelectTree.vue'


export default defineComponent({
  name: 'edit-category-admin',
  components: {
    Editor,
    SelectTree
  },
  data() {
    return {
      categoryRecords: "",
      imagePreview: null,
      thumbnail: null,
      loading: false,
      adminPrefix: "/admin", // temp fixed 
      category: {},
    };
  },
  methods: {
    async getSingleCategory() {
      try {
        const response = await ProductCategoriesServiceAdmin.getSingleCategory(this.$route.params.id);
        if (response) {
          this.category = response.category;
          this.categoryRecords = response.records;
        } else {
          message.error('Error occurred, can not get category information', 3);
        }

      } catch (error) {
        console.log('Error occurred:', error);
        this.displayErrorMessage('Error occurred, can not get category information');
      }
    },
    
    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.thumbnail = file;
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
        const response = await ProductCategoriesServiceAdmin.updateSingleCategory( 
          this.$route.params.id,
          {
            category: this.category,
            thumbnail: this.thumbnail, 
          }
        );
        if (response) {
          this.displaySuccessMessage('Category has been updated successfully!');
        }

      } catch (error) {
        console.log('Error occurred:', error);
        this.displayErrorMessage('Error occurred, can not update category');
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
    this.getSingleCategory()
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


///////CAtegory edit up anh dc, check voi create Product