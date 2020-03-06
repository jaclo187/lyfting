<template>
  <v-container>
    <v-row row>
      <v-col md5 >
        <v-card>
          <h3>Recent Workouts</h3>
          <WorkoutPanel v-for="w in workouts" :key="w.date" :workout="w" mt-2/>
        </v-card>
      </v-col>
      <v-col md5>
        <v-card>
          <h3>Create a new Workout</h3>
          <v-card>
            <div class="my-2">
              <v-btn class="mt-2 mb-2" x-large color="success" dark to='/workouts/create'><v-icon>mdi-plus</v-icon>Add a workout</v-btn>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
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
      else this.$router.push({name: 'Home'})
    }
}
</script>

<style></style>
