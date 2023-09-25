<template>
  <div :class="{'font-weight-bold': selected}" v-on="$listeners">
    {{filterItem.title}}
  </div>
</template>

<script>
export default {
  props: {
    filterItem: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
</style>