<template>
  <label>
    <input
      class="with-gap"
      type="radio"
      :checked="checked"
      :value="value"
      v-on="inputListeners"
      v-bind="$attrs"
    />
    <span><slot></slot></span>
  </label>
</template>

<script>
export default {
  name: 'v-radio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number],
    },
    modelValue: {
      default: '',
    },
  },
  computed: {
    checked() {
      return this.modelValue === this.value
    },
    inputListeners() {
      return {
        ...this.$listeners,
        change: () => {
          this.$emit('change', this.value)
        },
      }
    },
  },
}
</script>
