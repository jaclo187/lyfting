<template>
  <Panel :title="workout.name != null ? workout.name : workout.date" class="mb-2">
    <v-card v-if="workout">
      <SetPanel v-for="set in workout.sets" :key="set.id" :set='set'/>
    </v-card>
  </Panel>
</template>

<script>
import SetPanel from '@/components/SetPanel'
import Panel from '@/components/Panel'
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
     Panel
   },
   mounted(){
   }
}
</script>

<style scoped>

</style>