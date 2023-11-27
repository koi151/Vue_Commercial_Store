<template>
  <div class="status-filter">
    <span class="mr-20">Filter by status:</span>
    <a-button
      class="status-filter__item"
      :class="{ 'active': activeStatus === '' }"
      @click="setActiveStatus('')"
    >
      All
    </a-button>
    <a-button
      class="status-filter__item"
      :class="{ 'active': activeStatus === 'active' }"
      @click="setActiveStatus('active')"
    >
      Active
    </a-button>
    <a-button
      class="status-filter__item"
      :class="{ 'active': activeStatus === 'inactive' }"
      @click="setActiveStatus('inactive')"
    >
      Inactive
    </a-button>
  </div>
</template>

<script>
import ProductServiceAdmin from '@/services/admin/products.service';

export default {
  data() {
    return {
      activeStatus: '',
    };
  },
  methods: {
    async setActiveStatus(status) {
      this.activeStatus = status;

      try {
        const query = status ? { status } : {};

        this.$router.push({
          path: this.$route.path,
          query,
        });

        const newProducts = await ProductServiceAdmin.getProducts({ params: query });
        if (newProducts) this.$emit('products-updated', newProducts);
      } catch (error) {
        console.log('Error occurred:', error);
      }
    },
  },
};
</script>

<style lang="scss">
.status-filter {
  &__item {
    margin-right: 1rem;
    transition: all .2s;
    &:hover {
      color: #28a745 !important;
      border-color: #28a745 !important;
    }
  }

  &__item.active {
    background-color: #28a745;
    color: #fff;
    &:hover {
      color: #fff !important;
      border-color: #28a745 !important;
    }
  }
}
</style>
