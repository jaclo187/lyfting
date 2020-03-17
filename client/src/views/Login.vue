<template>
  <div>
    <h1 class="pl5">Login</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="email" label="E-mail"></v-text-field>
          </v-col>
          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="password" type="password" label="Password"></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="login">Login</v-btn>
          </v-col>
        </v-row>
        <br />
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" timeout=3000 color="error">
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
      password: '',
      error: null,
      snackbar: false
    }
  },
  methods: {
    async login() {
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      }).catch(error => {
        this.error = error.response.data.error
        this.snackbar = true
      })
      if (response) {
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'Workouts'})
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
