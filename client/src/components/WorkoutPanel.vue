<template>
  <div>
    <!-- <div>{{workout}}</div> -->
    <h4 v-if="workout.name !== '' && workout.name"> {{workout.name}} Kock</h4>
    <h4 v-else v-html="workout.date"></h4>
    <v-card v-if="workout">
      <SetPanel v-for="set in workout.sets" :key="set.id" :set='set'/>
    </v-card>
  </div>
</template>

<script>
import SetPanel from '@/components/SetPanel'
export default {
   data(){
    return{
      
    }
   },
   props: [
     "workout"
   ],
   methods:{

   },
   components: {
     SetPanel
   }
}
</script>

<style>

</style>