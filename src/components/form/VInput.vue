<template>
  <div class="input-field">
    <input
      class="validate"
      :id="_uid"
      :class="inputClasses"
      :value="value"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
    />
    <label :for="_uid" :class="{ 'active': !!value || hasFocus }">{{ label }}</label>
    <small v-show="hasError" class="helper-text invalid">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'v-input',
  data: () => ({
    hasFocus: false,
  }),
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
  methods: {
    onFocus(e) {
      this.$emit('focus', e)
      this.hasFocus = true
    },
    onBlur(e) {
      this.$emit('blur', e)
      this.hasFocus = false
    },
  },
}
</script>
