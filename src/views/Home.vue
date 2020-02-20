<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refreshData">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <v-preloader v-if="isLoading" />

    <div class="row" v-else>
      <v-bill :rates="currency.rates" />

      <v-currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import VBill from '@/components/bills/VBill'
import VCurrency from '@/components/bills/VCurrency'

export default {
  name: 'Home',
  components: {
    VBill,
    VCurrency,
  },
  data: () => ({
    currency: {},
    isLoading: true,
  }),
  async mounted() {
    this.getCurrency()
  },
  methods: {
    async getCurrency() {
      this.currency = await this.$store.dispatch('getCurrency')      
      this.isLoading = false
    },
    refreshData() {
      this.isLoading = true
      this.getCurrency()
    },
  },
}
</script>
