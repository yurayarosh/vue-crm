<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ bill | currency }}</h4>
    </div>

    <v-preloader v-if="isLoading" />

    <p v-else-if="!categories.length">Пока нет ни одной категории</p>

    <p v-else-if="!records.length">Пока нет ни одной записи</p>

    <section v-else>
      <div v-for="(category, i) in categories" :key="i" v-tooltip="category.tooltip">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency }} из {{ category.limit | currency }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[category.color]"
            :style="{ width: category.progress + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  data: () => ({
    isLoading: true,
    categories: [],
    records: [],
  }),
  computed: {
    bill() {
      return this.$store.getters.userInfo.bill
    },
  },
  async mounted() {
    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories')
    }

    const categories = this.$store.getters.categories
    this.records = await this.$store.dispatch('fetchRecords') || []

    if (categories && categories.length > 0) {
      this.categories = categories.map(cat => {
        if (!this.records.length) return

        const spend = this.records
          .filter(record => record.categorie === cat.id)
          .filter(record => record.type === 'outcome')
          .reduce((total, currRecord) => {
            return (total += +currRecord.amount)
          }, 0)

        const percent = (100 * spend) / cat.limit
        const progress = percent > 100 ? 100 : percent
        const restValue = +spend - +cat.limit
        const tooltip = `${restValue < 0 ? 'Осталось' : 'Лимит превышен на'} ${currencyFilter(
          Math.abs(restValue)
        )}`

        let color
        if (percent < 60) color = 'green'
        else if (percent >= 100) color = 'red'
        else color = 'yellow'

        return {
          ...cat,
          progress,
          color,
          spend,
          tooltip,
        }
      })
    }

    this.isLoading = false
  },
}
</script>
