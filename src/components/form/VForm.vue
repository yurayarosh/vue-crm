<template>
  <div>
    <div v-if="title" :class="classes">
      <h4>{{ title }}</h4>
    </div>

    <form v-on="$listeners" :class="formClass">
      <slot></slot>
      <v-btn icon="send">{{ btnTitle }}</v-btn>
    </form>
  </div>
</template>

<script>
import VBtn from '@/components/VBtn'

export default {
  name: 'v-form',
  components: {
    VBtn,
  },
  props: {
    title: {
      type: String
    },
    btnTitle: {
      type: String
    },
    titleClass: {
      type: [String, Object]
    },
    formClass: {
      type: String
    }
  },
  computed: {
    classes() {
      return this.titleClass || 'page-subtitle'
    }
  },
}
</script>
