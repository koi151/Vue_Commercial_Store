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
        <a-select-option class="sort-option" value="position-desc">Descending position</a-select-option>
        <a-select-option class="sort-option" value="position-asc">Ascending position</a-select-option>
        <a-select-option class="sort-option" value="price-desc">Descending price</a-select-option>
        <a-select-option class="sort-option" value="price-asc">Ascending price</a-select-option>
        <a-select-option class="sort-option" value="title-asc">Title A to Z</a-select-option>
        <a-select-option class="sort-option" value="title-desc">Title Z to A</a-select-option>
      </a-select>
    </div>
  </a-space>    
</template>

<script>
import ProductServiceAdmin from '@/services/admin/products.service';

export default {
  data() {
    return {
      value1: 'Descending position',
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

        const newProducts = await ProductServiceAdmin.getProducts({
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
