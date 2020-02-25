<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <v-input
        type="text"
        label="Email"
        :inputClasses="{ invalid: $v.email.$error }"
        :hasError="$v.email.$error"
        v-model.trim="email"
      />
      <v-input
        type="password"
        label="Пароль"
        :inputClasses="{ invalid: $v.password.$error }"
        :hasError="$v.password.$error"
        v-model.trim="password"
      />
    </div>
    <div class="card-action">
      <div>
        <v-btn class="auth-submit" icon="send">Войти</v-btn>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators/'
import VInput from '@/components/form/VInput'
import VBtn from '@/components/VBtn'
import messages from '@/utils/messages'

export default {
  name: 'login',
  mixins: [validationMixin],
  components: {
    VInput,
    VBtn,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  mounted() {
    const { message } = this.$route.query
    if (messages[message]) this.$toastMessage(messages[message])
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        const response = await this.$store.dispatch('login', formData)

        if (response.ok) {
          const data = await response.json()

          this.$store.commit('setUser', {
            id: data.localId,
          })

          const userInfo = await this.$store.dispatch('getUserInfo')
          localStorage.setItem('userId', data.localId)

          this.$store.commit('setUser', {
            name: userInfo.name,
            bill: userInfo.bill,
          })

          this.$router.push('/')
        } else {
          this.$toastError('Проверьте правильность данных')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
