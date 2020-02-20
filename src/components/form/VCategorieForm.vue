<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ title }}</h4>
    </div>

    <form v-on="$listeners">
      <slot></slot>
      <v-btn icon="send">{{ btnTitle }}</v-btn>
    </form>
  </div>
</template>

<script>
import VBtn from '@/components/VBtn'

export default {
  name: 'v-categorie-form',
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
  }
}
</script>
