<template>
  <v-preloader v-if="isLoading" />
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
    isLoading: false,
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
    this.isLoading = true

    if (!this.$store.getters.categories.length) {
      await this.$store.dispatch('fetchCategories', {
        id: this.$store.state.auth.userId,
      })
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
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return      
      
    },
  },
}
</script>
