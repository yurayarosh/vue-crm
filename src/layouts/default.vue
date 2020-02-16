<template>
  <div class="app-main-layout">
    <v-navbar />

    <v-aside />    

    <main class="app-content" :class="{ full: !asideIsOpen }">
      <div class="app-page">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VNavbar from '@/components/VNavbar'
import VAside from '@/components/VAside'

export default {
  name: 'default-layout',
  components: {
    VNavbar,
    VAside
  },
  computed: {
    ...mapState({
      asideIsOpen: state => state.aside.isOpen,
    }),
  },
}
</script>
