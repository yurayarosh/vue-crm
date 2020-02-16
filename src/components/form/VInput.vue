<template>
  <div class="input-field">
    <input
      class="validate"
      :id="_uid"
      :class="inputClasses"
      :value="value"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"      
    />
    <label :for="_uid">{{ label }}</label>
    <small v-show="hasError" class="helper-text invalid">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'v-input',
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
      type: Object
    }
  },
}
</script>
