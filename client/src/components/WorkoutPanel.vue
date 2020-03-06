<template>
  <ViewPanel :title="workout.name != null ? workout.name : workout.date" :id="workout.id" class="mb-2">
    <v-card v-if="workout">
      <SetPanel v-for="set in workout.sets" :key="set.id" :set='set'/>
    </v-card>
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

</style>