<template>
  <v-container v-if="workout" cols=12>
    <v-toolbar pt2 pb2 class="sm-6">
      <v-text-field placeholder="Enter name here..." single-line clearable counter=50 @blur="updateName" v-model="workout.name"></v-text-field>
    </v-toolbar>
    <v-expansion-panels multiple focusable class="sm-6">
      <v-expansion-panel v-for="set in workout.sets" v-bind:key="set.id" >
        <v-expansion-panel-header v-if="set.exercise" class="uppercase">{{set.exercise}}</v-expansion-panel-header>
        <v-expansion-panel-header v-else>&lt;Empty Exercise&gt;</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container cols=12>
            <v-row
            class="mb-6"
            justify="center"
            no-gutters>
              <v-col pt2 pb2>
                <v-autocomplete
                class="uppercase pa-2"
                tile
                :items="exercises"
                item-text="name"
                v-model="set.exercise"
                label="Select an exercise"
                @change="updateSetLogExercise(set, $event)">
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-btn
                class="mx-2 mt-2 pa-2"
                tile
                dark
                large
                color="primary"
                :value="set.id"
                @click="addSetLog(set, $event)">
                  Add Set
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="grey lighten-5">
            <v-row
            class="mb-6"
            no-gutters
            v-for="(d, key) in set.data" :key="d.id">
              <v-col pt2 pb2>
                {{d.id}}
                <h4 class="text-left">Set {{key + 1}}</h4>
                <v-card
                class="pa-2"
                tile
                outlined
                v-for="type in types"
                :key="type"
                >
                  <v-text-field v-model="d[`${type}`]" :type="type == 'reps' ? 'number' : 'text'" :label="type" @change="updateSetLog(d, $event)"></v-text-field>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn class="mx-2 mt-2" fab dark large color="indigo" @click="addSet">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import WorkoutService from '@/services/WorkoutService'
import ExerciseService from '@/services/ExerciseService'
export default {
  data () {
    return {
      workout : null,
      exercises : null,
      error : null,
      types : [
        "weight",
        "time",
        "reps"
      ]
    }
  },
  methods : {
    async updateName(){
      await WorkoutService.update(this.$store.state.token, this.workout.id, this.workout.name)
    },
    async addSet(){
      let set = await WorkoutService.newSet(this.$store.state.token, this.workout.id)
      set = set.data
      // NOTE : Vue does not track object changes like below, use reactive format instead
      // this.workout.sets[set.id] = set
      this.$set(this.workout.sets, set.id, set)
    },
    async addSetLog(set){
      if(set.exercise){
        let setLog = await WorkoutService.newSetLog(this.$store.state.token, set.id, set.exercise)
        setLog = setLog.data
        this.workout.sets[set.id].data.push(setLog)
      } else {
        this.error = "Please select an exercise first"
      }
    },
    async updateSetLog(setLog){
      await WorkoutService.updateSetLog(this.$store.state.token, setLog)
    },
    async updateSetLogExercise(set){
      await WorkoutService.updateSetLogExercise(this.$store.state.token, set.id, set.exercise)
    },
    
  },
  props : [

  ],
  async beforeMount(){
    if(this.workout === null){
      let result = await WorkoutService.index(
        {
          token: this.$store.state.token, 
          id: this.$route.params.id
        }
      )
      let workoutID = Object.keys(result.data.workouts)[0]
      this.workout = result.data.workouts[workoutID]
    }
  },
  async mounted(){
    if(this.$store.state.isLoggedIn){
      let result = await ExerciseService.index()
      result = result.data
      this.exercises = result
    }
  }
}
</script>

<style scoped>
  
</style>