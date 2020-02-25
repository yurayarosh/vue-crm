<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <v-input
        type="text"
        label="Имя"
        :inputClasses="{ invalid: $v.name.$error }"
        :hasError="$v.name.$error"
        v-model.trim="name"
      />

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators/'
import VInput from '@/components/form/VInput'

export default {
  name: 'profile',
  components: {
    VInput,
  },
  mixins: [validationMixin],
  data: () => ({
    name: '',
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.userInfo.name
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const url = `https://vue-crm-e390f.firebaseio.com/users/${this.userInfo.id}/info.json`

      await fetch(url, {
        method: 'DELETE',
      })
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: this.name,
          bill: this.userInfo.bill,
        }),
      })

      this.$store.commit('setUser', {
        name: this.name,
      })
    },
  },
}
</script>
