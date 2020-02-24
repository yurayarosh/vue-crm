<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="(currency, i) in currencies" :key="i">
          <span>{{ getCurrency(currency) | currency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-bill',
  data: () => ({
    currencies: ['UAH', 'EUR', 'USD'],
  }),
  props: {
    rates: {
      type: Object,
    },
  },
  methods: {
    getCurrency(currency) {
      // if (currency === 'EUR') return Math.floor(1 * this.$store.getters.userInfo.bill)
      return Math.floor(this.rates[currency] * this.$store.getters.userInfo.bill)
    },
  },
}
</script>
