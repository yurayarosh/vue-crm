<template>
  <div class="">
    <label :for="_uid">{{ label }}</label>
    <select
      ref="select"
      :id="_uid"
      class="browser-default"
      :class="inputClasses"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners"
    >
      <option v-for="(option, i) in options" :key="i" :value="option.id">{{
        option.title
      }}</option>
    </select>

    <small v-show="hasError" class="helper-text invalid">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'v-select',
  data: () => ({
    hasFocus: false,
    select: null,
  }),
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value)
        },
      }
    },
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
    options: {
      type: Array,
      required: true
    }
  },
}
</script>
