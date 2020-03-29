<template>
  <ViewPanel :title="workout.name != null ? workout.name : workout.date" :id="workout.id" class="workout-panel ml-2 mr-2">
    <div v-if="workout">
      <SetPanel v-for="set in workout.sets" :key="set.id" :set='set'/>
    </div>
  </ViewPanel>
</template>

<script>
import SetPanel from '@/components/SetPanel'
import ViewPanel from '@/components/ViewPanel'
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
     SetPanel,
     ViewPanel
   }
}
</script>

<style scoped>
 .workout-panel {
   margin: 0.2vw;
 }
</style>