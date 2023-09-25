<template>
  <div>
    <div class="d-flex mb-2">
      <div
        v-for="color of availabelColors" :key="color" class="color-box"  
        :class="{
          [`color-box-${color}`] : true, 
          'color-box-selected': selectedColor === color
        }"
       @click="onSelectColor(color)">
      </div>
    </div> 
    <div v-if="selectedColor" class="d-flex">
      <button
        v-for="size in normalizeColors[selectedColor]" :key="size.id" 
        :class="{
          'size-item-not-available': size.available < 1, 
          'size-item-selected': value && value.id === size.id
         }" 
        class="size-item"
        :disabled="size.available < 1"
        @click="onSelectSize(size)"
      >
        {{size.sizes}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null,
    },
    offers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedColor: 'default',
    }
  },
  computed: {
    normalizeColors() {
      const res = {
        default: [],
      }
      this.offers.forEach((el) => {
        if (el.color) {
          if (res[el.color]) res[el.color].push(el)
          else res[el.color] = [el]
        } else {
          res.default.push(el)
        }
      })
      return res
    },
    availabelColors() {
      return Object.keys(this.normalizeColors).filter((el) => el !== 'default')
    },
  },
  methods: {
    onSelectColor(color) {
      this.selectedColor = color
      this.$emit('input', null)
    },
    onSelectSize(size) {
      if (this.value?.id === size.id) {
        this.$emit('input', null)
        return
      }
      this.$emit('input', size)
    },
  },
}
</script>

<style lang="scss" scoped>
.color-box {
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &-red {
    background-color: red;
  }

  &-green {
    background-color: green;
  }

  &-blue {
    background-color: blue;
  }

  &-selected {
    border: 5px solid yellow;
  }
}

.size-item {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &-selected {
    border: 2px solid red;
  }

  &-not-available {
    &:after {
      position: absolute;
      content: '';
      width: 39px;
      transform: rotate(45deg);
      height: 2px;
      background-color: black;
    }
  }
}
</style>