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
    <!-- <v-toolbar-item>
      <v-hover>
        <v-btn flat dark to="/">
          Home
        </v-btn>
      </v-hover>
    </v-toolbar-item> -->
    <v-spacer></v-spacer>
    <v-toolbar-item>
      <v-hover>
        <v-btn flat dark to="/register">
          Register
        </v-btn>
      </v-hover>

      <v-hover>
        <v-btn flat dark to="/login">
          Login
        </v-btn>
      </v-hover>
    </v-toolbar-item>
  </v-app-bar>
</template>
<script>
export default {
  name: 'PageHeader'
}
</script>
<style scoped>
.home {
  cursor: pointer;
  color: white;
}
</style>
