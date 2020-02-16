<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/default'
import FormLayout from '@/layouts/form'

export default {
  name: 'App',
  computed: {
    layout() {
      return this.$route.meta.layout === 'form' ? FormLayout : DefaultLayout
    },
  },
}
</script>

<style lang="sass"></style>
