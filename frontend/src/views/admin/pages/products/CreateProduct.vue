<template> 
  <div class="card" :loading="loading" > 
    <h2 class="card-header"> Create product </h2> 
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
              type="text" 
              class="form-control input-custom" 
              v-model="product.title"
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
            <editor 
              v-model="product.description"
              api-key="zabqr76pjlluyvwebi3mqiv72r4vyshj6g0u07spd34wk1t2" 
              :init="{ 
                toolbar_mode: 'sliding', 
                plugins: ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount', 
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat', 
                tinycomments_mode: 'embedded', tinycomments_author: 'Author name', mergetags_list: [ { value: 'First.Name', title: 'First Name' }, { value: 'Email', title: 'Email' }, ], 
              }"
              /> 
          </div> 
          <div class="d-flex mb-20 col-12" style="margin-top: 25px"> 
            <div class="form-group form-check mr-20"> 
              <input 
                v-model="product.featured"
                class="form-check-input" 
                type="radio" 
                name="featured" 
                id="featured1" 
                value="0"
                checked
              > 
              <label class="form-check-label" for="featured1">
                Default 
              </label> 
            </div> 
            <div class="form-group form-check"> 
              <input 
                v-model="product.featured"
                class="form-check-input" 
                type="radio" 
                name="featured" 
                id="feature0" 
                value="1"
              > 
              <label class="form-check-label" for="feature0"> 
                Feature 
              </label> 
            </div> 
          </div> 
          <div class="form-group col-md-6 mb-20"> 
            <label for="price">Price</label> 
            <input 
              v-model="product.price"
              class="form-control input-custom" 
              type="number" 
              id="price" 
              name="price" 
              min="0" 
            > 
          </div> 
          <div class="form-group col-md-6 mb-20"> 
            <label for="stock">Stock</label> 
            <input 
              v-model="product.stock"
              class="form-control input-custom" 
              type="number" 
              id="stock" 
              name="stock" 
              min="0"
            > 
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
                  :src="imagePreview"
                  class='image-preview'
                  upload-image-preview
                >
              </div>
            </div>
          </div>
          <div class="form-group col-md-6 mb-20"> 
            <label for="position">Position</label> 
            <input 
              v-model="product.position"
              class="form-control input-custom" 
              type="number" 
              id="position" 
              name="position" 
              min="0"
              placeholder="Auto increase"
            > 
          </div>
          <div class="form-group col-md-6 mb-20"> 
            <label for="discount">Discount percentage (%)</label> 
            <input 
              v-model="product.discountPercentage"
              class="form-control input-custom" 
              type="number" 
              id="discount" 
              name="discountPercentage" 
              min="0" 
            > 
          </div> 
          <div class="form-group d-flex flex-end mt-20 mb-20 col-6"> 
            <div class="form-check mr-20"> 
              <input 
                v-model="product.status"
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
                v-model="product.status"
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
              class="btn btn-primary"
            >
              Create product
            </button>
          </div>
        </div>
      </form>    
    </div> 
  </div> 
  
</template>


<script>
import Editor from '@tinymce/tinymce-vue'
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import ProductServiceAdmin from '@/services/admin/products.service';

export default defineComponent({
  name: 'products-create-admin',
  components: {
    Editor,
  },
  data() {
    return {
      loading: false,
      imagePreview: '', 
      adminPrefix: "/admin", // temp fixed 
      thumbnail: null,
      product: { // just default value
        status: "active",
        featured: "0"
      },
    };
  },
  methods: {
    
    handleImageUpload($event) {
      const file = $event.target.files[0];
      if (file) {
        this.thumbnail = file;
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
        const response = await ProductServiceAdmin.createProduct({
          product: this.product,
          thumbnail: this.thumbnail, 
        });

        if (response.success) {
          this.displaySuccessMessage('Product has been created successfully!');
        } else if (response.error) {
          message.error(response.message, 3)
        }

      } catch (error) {
        console.log('Error occurred:', error);
        this.displayErrorMessage('Error occurred, can not create product');
      }
    },

    displaySuccessMessage(messageContent) {
      message.success(messageContent, 3);
    },

    displayErrorMessage(errorMessage) {
      message.error(errorMessage, 3);
    },

  },
  setup() {
    const value = ref(1);

    return {
      Editor,
      value,
    };
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
  }  
}
//split scr
</style>

