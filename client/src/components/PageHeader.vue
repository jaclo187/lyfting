<template>
  <v-app-bar app color="primary" dark>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title>
      <router-link to="/">
        <span class="home">
          Lyfting 🏋️‍♂️
        </span>
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-hover>
        <v-btn v-if="$store.state.isLoggedIn" text dark to="/workouts">
          Workouts
        </v-btn>
      </v-hover>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-hover>
        <v-btn v-if="!$store.state.isLoggedIn" text dark to="/register">
          Register
        </v-btn>
      </v-hover>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-hover>
        <v-btn v-if="!$store.state.isLoggedIn" text dark to="/login">
          Login
        </v-btn>
      </v-hover>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-hover>
        <v-btn v-if="$store.state.isLoggedIn" text dark @click='logout'>
          Logout
        </v-btn>
      </v-hover>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {
  name: 'PageHeader',
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
      this.$router.push({name: 'root'})
    }
  }
}
</script>
<style scoped>
.home {
  cursor: pointer;
  color: white;
}
</style>
