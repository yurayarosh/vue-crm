<template>
  <v-categorie-form title="Редактировать" btnTitle="Обновить" @submit.prevent="onSubmit">
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
    }
  },
  mixins: [validationMixin],
  data: () => ({
    title: '',
    limit: '',
    categorie: 0,
  }),
  methods: {
    onSubmit() {
      this.$v.$touch()
      console.log(this.categorie)

      if (this.$v.$invalid) return

      console.log('success')
    },
  },
  validations: {
    title: {
      required,
    },
    limit: {
      required,
      minValue: minValue(10)
    },
  },
}
</script>
