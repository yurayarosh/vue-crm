<template>
  <div class="input-field">
    <select
      ref="select"
      :id="_uid"
      :class="inputClasses"
      :value="value"
      v-bind="$attrs"
      @change="$emit('change', $event.target.value)"
    >
      <slot></slot>
    </select>
    <label :for="_uid">{{ label }}</label>
    <small v-show="hasError" class="helper-text invalid">{{ errorMessage }}</small>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'v-select',
  data: () => ({
    hasFocus: false,
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {})
  },
  beforeDestroy() {
    if(this.select.destroy) this.select.destroy()
  },
  props: {
    value: {
      type: [String, Number],
    },
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    errorMessage: {
      type: String,
      default: 'Поле обязательно',
    },
    hasError: {
      type: Boolean,
    },
    inputClasses: {
      type: Object,
    },
  },
  methods: {},  
}
</script>
