<template>
  <button
    :class="status === 'active' ? 'active-button' : 'inactive-button'"
    @click="changeStatus"
  >
    {{ status }}
  </button>
</template>

<script>
export default {
  props: {
    status: String,
    itemId: String
  },
  methods: {
    changeStatus() {
      const newStatus = this.status === 'active' ? 'inactive' : 'active';
      this.$emit('update-status', this.itemId, newStatus);
    }
  }
}
</script>

<style scoped>
</style>
