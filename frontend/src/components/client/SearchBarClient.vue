<template>
  <a-input-search
    class="search-bar-ad ml-20"
    placeholder="Type to search product title..."
    enter-button
    @search="onSearch"
  />
</template>

<script>
import ProductServiceClient from '@/services/client/products.service';

export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    async onSearch(keyword) {
      const currentRoute = this.$router.currentRoute.value;

      this.$router.push({ 
        path: currentRoute.path,
        query: { ...currentRoute.query, keyword },
      });

      const newProducts = await ProductServiceClient.getProducts({
        params: {
          keyword
        },
      });

      if (newProducts) 
        this.$emit('products-updated', newProducts);
    },
  },
}
</script>

<style>
.search-bar-ad {
  width: 45rem;
  display: flex;
    justify-content: center;
    align-items: center;
}

.ant-input-search-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
