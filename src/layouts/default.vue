<template>
  <v-preloader v-if="isLoading" />

  <div class="app-main-layout" v-else>
    <v-navbar />

    <v-aside />

    <main class="app-content" :class="{ full: !asideIsOpen }">
      <div class="app-page">
        <router-view></router-view>
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
  data: () => ({
    isLoading: true,
  }),
  components: {
    VNavbar,
    VAside,
  },
  async mounted() {
    if (localStorage.userId) {
      if (!this.$store.getters.userInfo.id) {
        this.$store.commit('setUser', {
          id: localStorage.userId,
        })
        const userInfo = await this.$store.dispatch('getUserInfo')

        this.$store.commit('setUser', {
          name: userInfo.name,
          bill: userInfo.bill,
        })

        this.isLoading = false
      } else {
        this.isLoading = false
      }
    } else {
      this.$router.push('login?message=sould-login')
    }
  },
  computed: {
    ...mapState({
      asideIsOpen: state => state.aside.isOpen,
    }),
  },
}
</script>
