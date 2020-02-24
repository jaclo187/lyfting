<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Lyfting 🏋️‍♂️</v-toolbar-title>
    <v-toolbar-item>
      <v-btn flat dark>
        Home
      </v-btn>
    </v-toolbar-item>
    <v-spacer></v-spacer>
    <v-toolbar-item>
      <v-btn flat dark>
        Sign Up
      </v-btn>
    </v-toolbar-item>
  </v-app-bar>
</template>
<script>
export default {
  name: 'PageHeader'
}
</script>
<style scoped></style>
