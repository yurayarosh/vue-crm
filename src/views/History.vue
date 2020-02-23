<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <v-preloader v-if="isLoading" />

    <p v-else-if="!records.length">Записей пока нет</p>

    <section v-else>
      <history-table :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  components: {
    HistoryTable,
  },
  data: () => ({
    isLoading: true,
    records: [],
  }),
  async mounted() {
    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories')
    }

    const categories = this.$store.getters.categories
    const records = await this.$store.dispatch('fetchRecords')

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: categories.find(cat => cat.id === record.categorie).title,
        typeColor: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
    })

    this.isLoading = false
  },
}
</script>
