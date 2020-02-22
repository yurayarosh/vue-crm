<template>
  <p v-if="!categories.length">Пока нет ни одной категории</p>

  <v-categorie-form v-else title="Редактировать" btnTitle="Обновить" @submit.prevent="onSubmit">
    <v-select label="Выберите категорию" v-model="categorie" :options="categories" />

    <v-input
      type="text"
      label="Название"
      errorMessage="Введите название"
      :inputClasses="{ invalid: $v.title.$error }"
      :hasError="$v.title.$error"
      v-model.trim="title"
    />

    <v-input
      type="number"
      label="Лимит"
      errorMessage="Минимальная величина"
      :inputClasses="{ invalid: $v.limit.$error }"
      :hasError="$v.limit.$error"
      v-model.trim="limit"
    />
  </v-categorie-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators'
import VCategorieForm from '@/components/form/VCategorieForm'
import VInput from '@/components/form/VInput'
import VSelect from '@/components/form/VSelect'

export default {
  name: 'categories-edit-form',
  components: {
    VCategorieForm,
    VInput,
    VSelect,
  },
  props: {
    categories: {
      type: Array,
    },
  },
  mixins: [validationMixin],
  data: () => ({
    title: '',
    limit: '',
    categorie: null,
  }),
  mounted() {
    if (this.categories.length > 0) {
      const { id, title, limit } = this.categories[0]

      this.categorie = id
      this.setInputsValues({ title, limit })
    }
  },
  watch: {
    categories(cats) {
      if(cats.length > 1) return
      const { title, limit, id } = this.categories[0]

      this.categorie = id
      this.setInputsValues({ title, limit })
    },
    categorie(value) {      
      const { title, limit } = this.categories.find(cat => value === cat.id)
      this.setInputsValues({ title, limit })
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      console.log(this.categorie)

      if (this.$v.$invalid) return

      console.log('success')
    },
    setInputsValues({ title, limit }) {
      this.title = title
      this.limit = limit
    }
  },
  validations: {
    title: {
      required,
    },
    limit: {
      required,
      minValue: minValue(10),
    },
  },
}
</script>
