<template>
  <component
    class="btn waves-effect waves-light"
    :is="tagName"
    :href="href"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <i class="material-icons right">{{ icon }}</i>
  </component>
</template>

<script>
export default {
  name: 'v-btn',
  props: {
    icon: {
      type: String,
    },
    href: {
      type: String,
    },
  },
  computed: {
    tagName() {
      return this.href ? 'a' : 'button'
    },
  },
}
</script>
