<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggleAside">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownTrigger"
          >
            {{ $store.state.auth.userName || 'user name ' }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link class="black-text" to="profile">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'
import { mapMutations } from 'vuex'

export default {
  name: 'v-navbar',
  data: () => ({
    asideOpen: true,
    date: null,
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdownTrigger)
    this.updateDate = setInterval(() => {
      this.date = new Intl.DateTimeFormat('uk-UA', {
        hour12: false,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date())
    }, 1000)
  },
  beforeDestroy() {
    if (this.dropdown.destroy) this.dropdown.destroy()
    clearInterval(this.updateDate)
  },
  methods: {
    ...mapMutations({
      toggleAside: 'toggleAside',
    }),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('login?message=logout')
    },
  },
}
</script>
