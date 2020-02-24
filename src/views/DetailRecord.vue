<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          Расход
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <v-preloader v-if="isLoading" />

          <div class="card" :class="[record.color]" v-else>
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount }}</p>
              <p>Категория: {{ record.categorie }}</p>

              <small>{{ new Date(record.date) | date('date-time') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'datail-record',
  data: () => ({
    isLoading: true,
    record: null
  }),
  async mounted() {
    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories')
    }
    
    const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id)
    const [category] = this.$store.getters.categories.filter(cat => cat.id === record.categorie)

    this.record = {
      ...record,
      categorie: category.title,
      color: record.type === 'outcome' ? 'red' : 'green',
    }    

    this.isLoading = false
  },
}
</script>
