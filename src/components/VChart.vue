<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  name: 'v-chart',
  props: {},
  methods: {
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
  },
  mounted() {
    
    const data = this.categories.map(c => {
      return this.records.reduce((total, record) => {
        if (record.categorie === c.id && record.type === 'outcome') {
          total += +record.amount
        }

        return total
      }, 0)
    })
    const labels = this.categories.map(c => c.title)
    const backgroundColor = labels.map(() => this.getRandomColor())    

    this.renderChart({
      labels,
      datasets: [
        {
          label: 'Расход',
          backgroundColor,
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
