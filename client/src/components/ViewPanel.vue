<template>
  <div class="white elevation-2">
      <v-toolbar text dense color="accent">
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-btn icon :to="`/workouts/edit/${this.id}`">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteWorkout(id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
      </v-toolbar>

      <div class="pl-4 pr-4 pt-2 pb-2">
          <slot>
              Nothing here.
          </slot>
      </div>
  </div>
</template>

<script>
import WorkoutService from '@/services/WorkoutService'
export default {
  props: [
    'title',
    'id'
  ],
  methods: {
    deleteWorkout(id){
      WorkoutService.delete(this.$store.state.token, id)
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style scoped>
</style>