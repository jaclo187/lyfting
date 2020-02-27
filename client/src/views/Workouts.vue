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
          <!-- <template v-for="w in workouts">
            <v-col :key="w.date"> -->
              <WorkoutPanel v-for="w in workouts" :key="w.date" :workout="w"/>
           <!--  </v-col>
          </template> -->
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
export default {
    data(){
        return{
            workouts : [
                {
                  name: "Back",
                  date: new Date().toISOString(),
                  sets: [
                    {
                      name: "Rowing",
                      id: 1,
                      data : {
                          reps: [10,10,10],
                          weight: [40,50,60],
                          time: null
                      }
                    },
                    {
                      name: "Deadlifts",
                      id: 2,
                      data : {
                          reps: [5,5,5],
                          weight: [80,90,100],
                          time: null
                      }
                    },
                    {
                      name: "Face Pulls",
                      id: 3,
                      data : {
                          reps: [5,5,5],
                          weight: [80,90,100],
                          time: null
                      }
                    }
                  ]
                },
                {
                  name: "",
                  date: "Yesterday",
                  sets: [
                    {
                      name: "Rowing",
                      id: 4,
                      data : {
                          reps: [10,10,10],
                          weight: [40,50,60],
                          time: null
                      }
                    },
                    {
                      name: "Deadlifts",
                      id: 5,
                      data : {
                          reps: [5,5,5],
                          weight: [80,90,100],
                          time: null
                      }
                    },
                    {
                      name: "Face Pulls",
                      id: 6,
                      data : {
                          reps: [5,5,5],
                          weight: [80,90,100],
                          time: null
                      }
                    }
                  ]
                }
            ]
        }
    },
    components :{
        WorkoutPanel
    }
}
</script>

<style></style>
