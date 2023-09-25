<template>
  <div
    :style="{ 'background-color': filterItem.value }"
    :class="{ 'size-item': true, 'size-item-selected': selected }"
    v-on="$listeners"
  ></div>
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
  &-selected {
    border: 5px solid yellow;
  }
}
</style>
