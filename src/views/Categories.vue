<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <v-preloader v-if="isLoading" />

      <div class="row" v-else>
        <div class="col s12 m6">
          <categories-add-form />
        </div>

        <div class="col s12 m6">
          <categories-edit-form :categories="categories" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesAddForm from '@/components/CategoriesAddForm'
import CategoriesEditForm from '@/components/CategoriesEditForm'

export default {
  name: 'Categories',
  data: () => ({
    isLoading: false,
  }),
  components: {
    CategoriesAddForm,
    CategoriesEditForm,
  },
  async mounted() {
    this.isLoading = true

    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories', {
        id: this.$store.state.auth.userId,
      })
    }
    
    this.isLoading = false
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
  },
}
</script>
