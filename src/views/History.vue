<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <v-preloader v-if="isLoading" />

    <p v-else-if="!records.length">Записей пока нет</p>

    <section v-else>
      <div class="history-chart">
        <v-chart />
      </div>

      <history-table :records="items" />

      <v-pagination
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="paginateHandler"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'pagination'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginateMixin from '@/mixins/paginate.mixin'
import VChart from '@/components/VChart'

export default {
  name: 'history',
  components: {
    HistoryTable,
    VChart,
  },
  mixins: [paginateMixin],
  data() {
    return {
      isLoading: true,
      records: [],
    }
  },
  async mounted() {
    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories')
    }
    if (!this.$store.getters.records.length) {
      await this.$store.dispatch('fetchRecords')
    }

    const categories = this.$store.getters.categories
    const records = this.$store.getters.records

    if (records && records.length > 0) {
      this.records = records.map(record => {
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categorie).title,
          typeColor: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      })

      this.setupPagination(this.records)
    }

    this.isLoading = false
  },
}
</script>
