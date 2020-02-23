<template>
  <v-preloader v-if="isLoading" />

  <p v-else-if="!categories.length">Пока нет ни одной категории</p>

  <v-form
    title="Новая запись"
    titleClass="page-title"
    btnTitle="Создать"
    formClass="form"
    v-else
    @submit.prevent="onSubmit"
  >
    <v-select label="Выберите категорию" v-model="categorie" :options="categories" />

    <p>
      <v-radio v-model="type" value="income">
        Доход
      </v-radio>
    </p>

    <p>
      <v-radio v-model="type" value="outcome">
        Расход
      </v-radio>
    </p>

    <v-input
      type="number"
      label="Сумма"
      :inputClasses="{ invalid: $v.amount.$error }"
      :hasError="$v.amount.$error"
      v-model.trim="amount"
    />

    <v-input
      type="text"
      label="Описание"
      :inputClasses="{ invalid: $v.description.$error }"
      :hasError="$v.description.$error"
      v-model.trim="description"
    />
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators'
import VForm from '@/components/form/VForm'
import VInput from '@/components/form/VInput'
import VSelect from '@/components/form/VSelect'
import VRadio from '@/components/form/VRadio'

export default {
  name: 'record',
  components: {
    VForm,
    VInput,
    VSelect,
    VRadio,
  },
  mixins: [validationMixin],
  data: () => ({
    description: '',
    amount: 10,
    categorie: null,
    type: 'income',
    isLoading: true,
  }),
  validations: {
    description: {
      required,
    },
    amount: {
      required,
      minValue: minValue(10),
    },
  },
  async mounted() {
    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories')
    }

    if(!this.categories.length) {
      this.isLoading = false
      return
    }    

    const { id } = this.categories[0]
    this.categorie = id

    this.isLoading = false
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      await this.$store.dispatch('postRecord', {
        categorie: this.categorie,
        type: this.type,
        amount: this.amount,
        description: this.description,
        date: new Date().toJSON(),
      })

      const updBill =
        this.type === 'income'
          ? this.$store.getters.userInfo.bill + this.amount
          : this.$store.getters.userInfo.bill - this.amount

      this.$store.commit('setUser', {
        bill: updBill,
      })

      this.$store.dispatch('updateUserInfo', {
        bill: updBill,
      })

      this.type = 'income'
      this.description = ''
      this.amount = 10
      this.$v.$reset()
      this.$toastMessage('Запись добавлена')
    },
  },
}
</script>
