<template>
  <v-preloader v-if="isLoading" />

  <canvas v-else ref="canvas"></canvas>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  data: () => ({
    isLoading: true,
  }),
  name: 'v-chart',
  props: {},
  async mounted() {
    // if (!this.$store.getters.categories.length) {
    //   await this.$store.dispatch('fetchCategories')
    // }

    // const records = await this.$store.dispatch('fetchRecords')

    // if (!this.categories.length) return
    console.log(this.categories);
    


    const data = this.categories.map(c => {
      return this.records.reduce((total, record) => {
        if (record.categorie === c.id && record.type === 'outcome') {
          total += +record.amount
        }

        return total
      }, 0)
    })

    console.log(data);
    

    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [
        {
          label: 'Расходы',
          backgroundColor: '#f87979',
          data,
        },
      ],
    })
  },
  computed: {
    ...mapGetters(['categories', 'records']),
  },
}
</script>
