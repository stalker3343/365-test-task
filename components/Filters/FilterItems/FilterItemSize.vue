<template>
  <div
    :class="{ 'size-item-selected': selected, 'size-item': true }"
    v-on="$listeners"
  >
    {{ filterItem.title }}
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

<style lang="scss" scoped>
.size-item {
  width: 30px;
  height: 30px;
  &:not(:last-child) {
    margin-right: 10px;
  }
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  &-selected {
    border: 5px solid yellow;
  }
}
</style>
