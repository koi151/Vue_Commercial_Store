<template>
  <a-space class="ml-20">
    <div class="d-flex align-items-center">
      <span style="margin-right: 15px">Sorting: </span>
      <a-select
        class="sort-select"
        name="sort"
        v-model:value="value1"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option class="sort-option" value="position-desc">Default</a-select-option>
        <a-select-option class="sort-option" value="price-desc">Descending price</a-select-option>
        <a-select-option class="sort-option" value="price-asc">Ascending price</a-select-option>
        <a-select-option class="sort-option" value="title-asc">Title A to Z</a-select-option>
        <a-select-option class="sort-option" value="title-desc">Title Z to A</a-select-option>
      </a-select>
    </div>
  </a-space>    
</template>

<script>
import ProductServiceClient from '@/services/client/products.service';

export default {
  data() {
    return {
      value1: 'Default',
    };
  },
  methods: {
    async handleChange($event) {
      try {
        const [sortKey, sortValue] = $event.split('-');
        const currentRoute = this.$router.currentRoute.value;

        this.$router.push({ 
          path: currentRoute.path, 
          query: { ...currentRoute.query, sortKey, sortValue } 
        });

        const newProducts = await ProductServiceClient.getProducts({
          params: {
            sortKey,
            sortValue,
          },
        });

        if (newProducts)
          this.$emit('products-updated', newProducts);

      } catch (error) {
        console.error('Error making HTTP request:', error);
      }
    }
  },
};
</script>
