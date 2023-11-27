<template>
  <template v-for="record in records" :key="record._doc._id">
    <option 
      class="custom-option"
      :value="record._doc._id"  
      :selected="record._doc._id === currentId"
    >
      {{ Array(level + 1).join('-- ') }} {{ record._doc.title }}
    </option>
    <template v-if="record.children && record.children.length > 0">
      <SelectTree 
        :records="record.children"
        :level="level + 1" 
        :currentId="currentId" 
        :key="record._doc._id"
      />
    </template>
  </template>
</template>


<script>
export default {
  name: 'SelectTree',  
  props: {
    records: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 1
    },
    currentId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      selectedId: this.currentId
    };
  },
};
</script>

<style lang="scss">
.custom-option {
  padding: 1rem;
  font-size: 1.5rem;
}
</style>