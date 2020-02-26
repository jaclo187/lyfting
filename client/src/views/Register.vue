<template>
  <div>
    <h1 class="pl5">Register</h1>
    <v-form autocomplete="off">
      <v-container>
        <v-row>
          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="username" label="Username"></v-text-field>
          </v-col>

          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="email" label="E-mail"></v-text-field>
          </v-col>

          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="password" type="password" label="Password">
            </v-text-field>
          </v-col>

          <v-col>
            <v-btn @click="register">Register</v-btn>
          </v-col>
        </v-row>

        <br />
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" timeout="3000" color="error">
      <span>{{ error }}</span>
      <v-btn text color="#ff5252" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      error: null,
      snackbar: false
    }
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        username: this.username,
        password: this.password
      }).catch(error => {
        this.error = error.response.data.error
        this.snackbar = true
      })
      if(response){
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
