<template>
  <form method="POST" form-multi-change>
    <div class="d-flex align-items-center">
      <span style="margin-right: 15px;">Multi Change: </span>
      <div class="form-group">
        <a-space>
          <a-select
            v-model:value="selectedValue"
            style="width: 160px"
            @focus="focus"
            @change="handleChangeSelect"
          >
            <a-select-option :value="'active'">Active</a-select-option>
            <a-select-option :value="'inactive'">Inactive</a-select-option>
            <a-select-option :value="'change-position'">Change Position</a-select-option>
            <a-select-option :value="'delete-all'">Delete</a-select-option>
          </a-select>
        </a-space>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="ids"
          v-model="ids"
          class="form-control d-none"
        >
      </div>
      <a-button
        type="submit" 
        class="btn btn-primary"
        @click="handleSubmit"
      >
        Apply
      </a-button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue';
import ProductServiceAdmin from '@/services/admin/products.service'
import { message } from 'ant-design-vue';

export default defineComponent({
  props: {
    products: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data() {
    return {
      selectedValue: 'active',
      ids: '',
    };
  },

  methods: {
    focus() {
      console.log('focus');
    },

    handleChangeSelect(value) {
      this.selectedValue = value; 
    },

    async handleSubmit() {
      try {
        const MultiCheckBox = document.querySelector('[multi-checkbox]');
        const inputsChecked = MultiCheckBox.querySelectorAll('input[name="id"]:checked');

        const typeOfChange = this.selectedValue; // Access the selected value from data
        let checkedIds = [];
        inputsChecked.forEach(input => {
          checkedIds.push(input.value)
        })

        console.log('checkedIds:', checkedIds);

        if (typeOfChange === 'delete-all') {
          const deleteConfirm = confirm('Are you sure to delete those products ?');
          if (!deleteConfirm) return; 
        }

        if (inputsChecked.length > 0) {
          let checkedIds = [] 


          if (typeOfChange === 'change-position') {
            inputsChecked.forEach(input => {
              const position = input.closest('tr').querySelector("input[name='position']").value;
              checkedIds.push(`${input.value}-${position}`);
            })

          } else {
            inputsChecked.forEach(input => {
              checkedIds.push(input.value);
            })
          }

          // inputIds.value = checkedIds.join(", ");

          // console.log('checkedIds:', checkedIds)
          const response = await ProductServiceAdmin.multiChangeProduct({
            type: typeOfChange,
            checkedIds: checkedIds
          });

          if (response) {
            this.$emit('products-updated');
            message.success(`New change has applied for ${checkedIds.length} products`, 3);
          }

        }
      } catch (error) {
        console.log('Error occurred:', error);
        message.error(`Error occurred, can not make multiple change`, 3) 
      }
      
    }
  },

  mounted() {
    console.log('Component has been mounted.');
  },
});
</script>
