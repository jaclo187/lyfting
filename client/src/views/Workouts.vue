<template>
  <v-container v-if="!$store.state.isLoggedIn">
    <v-col md="12">
      <v-card text>Please login or register to use this app</v-card>
    </v-col>
  </v-container>
  <v-container v-else>
    <v-layout row>
      <v-flex md6>
        <v-card outlined tile>
          <h3>Recent Workouts</h3>
          <WorkoutPanel v-for="w in workouts" :key="w.date" :workout="w" mt-2/>
        </v-card>
      </v-flex>
      <v-flex md6>
        <v-card outlined tile>
          Create a new Workout
          <v-card>
            Here you can create a new Workout
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import WorkoutPanel from '@/components/WorkoutPanel'
import WorkoutService from '@/services/WorkoutService'
export default {
    data(){
        return{
            workouts : null
        }
    },
    components :{
        WorkoutPanel
    },
    async mounted(){
      if(this.$store.state.isLoggedIn){
        this.workouts = (await WorkoutService.index({token: this.$store.state.token})).data.workouts
      } 
      else this.$router.push({name: 'home'})
    }
}
</script>

<style></style>
