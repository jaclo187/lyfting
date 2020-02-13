<template>
  <div>
    <h1>Register</h1>
    <input v-model="email" type="email" name="email" id="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" id="password">
    <input @click="register" type="submit" value="Register">
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

