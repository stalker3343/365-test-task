<template>
  <div>
    <div v-for="filterItem in filters" :key="filterItem.id">
      <div class="text-h5 mb-2">
        {{ filterItem.title }}
      </div>
      <FilterItems
        :value="FILTERS[filterItem.type]"
        :filter-type="filterItem.type"
        :items="filterItem.value"
        @select-filter="onSelectFilter"
      ></FilterItems>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterItems from '~/components/Filters/FilterItems.vue'

export default {
  components: {
    FilterItems,
  },
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['FILTERS']),
  },
  created() {
    const filters = this.$route.query
    this.SET_FILTERS(filters)
  },
  methods: {
    ...mapMutations(['SET_FILTERS']),
    setToUrl() {
      const filedFilters = {}
      for (const [key, value] of Object.entries(this.FILTERS)) {
        if (value) filedFilters[key] = value
      }

      this.$router.push({ ...this.$route.query, query: filedFilters })
    },
    onSelectFilter({ type, value }) {
      if (this.FILTERS[type] === value) this.SET_FILTERS({ [type]: '' })
      else this.SET_FILTERS({ [type]: value })
      this.setToUrl()
    },
  },
}
</script>

<style></style>
