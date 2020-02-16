<template>
  <ul class="sidenav app-sidenav" :class="{ open: asideIsOpen }">
    <router-link v-for="(item, i) in list" tag="li" :key="i" :to="item.to" active-class="active">
      <a class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'v-aside',
  data: () => ({
    list: [
      { title: 'Счет', to: 'detail-record' },
      { title: 'История', to: 'history' },
      { title: 'Планирование', to: 'planning' },
      { title: 'Новая запись', to: 'record' },
      { title: 'Категории', to: 'categories' },
    ],
  }),
  computed: {
    ...mapState({
      asideIsOpen: state => state.aside.isOpen,
    }),
  },
}
</script>
