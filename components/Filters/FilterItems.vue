<template>
  <div class="d-flex" :class="{ 'flex-column': filterType === 'brands' }">
    <component
      :is="itemComponent"
      v-for="filterItemValue in items"
      :key="filterItemValue.id"
      :selected="value === filterItemValue.id"
      class="mb-4 filter-item"
      :filter-item="filterItemValue"
      @click="
        $emit('select-filter', {
          type: filterType,
          value: filterItemValue.id,
        })
      "
    >
    </component>
  </div>
</template>

<script>
import FilterItemColor from './FilterItems/FilterItemColor.vue'
import FilterItemSize from './FilterItems/FilterItemSize.vue'
import FilterItemBrand from './FilterItems/FilterItemBrand.vue'

export default {
  components: {
    FilterItemColor,
    FilterItemSize,
    FilterItemBrand,
  },
  props: {
    filterType: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    itemComponent() {
      const FILTER_TYPE_TO_COMPONENT = {
        color: 'FilterItemColor',
        sizes: 'FilterItemSize',
        brands: 'FilterItemBrand',
      }

      return FILTER_TYPE_TO_COMPONENT[this.filterType]
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-item {
  cursor: pointer;
}
</style>
