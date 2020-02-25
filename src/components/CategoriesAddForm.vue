<template>
  <v-form title="Создать" btnTitle="Создать" @submit.prevent="onSubmit">
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
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators/'
import VForm from '@/components/form/VForm'
import VInput from '@/components/form/VInput'

export default {
  name: 'categories-add-form',
  components: {
    VForm,
    VInput,
  },
  mixins: [validationMixin],
  data: () => ({
    title: '',
    limit: 1,
  }),
  methods: {
    async onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) return

      const catId = performance.now().toString()

      await this.$store.dispatch('postNewCategorie', {
        title: this.title,
        limit: this.limit,
        id: catId,
      })

      this.$store.commit('addCategorie', {
        title: this.title,
        limit: this.limit,
        id: catId,
      })

      this.title = ''
      this.limit = 1
      this.$v.$reset()
      this.$toastMessage('Новая категория создана')
    },
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
