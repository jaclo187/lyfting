<template>
  <div>{{workout}}</div>
</template>

<script>
import WorkoutService from '@/services/WorkoutService'
export default {
  data () {
    return {
      workout : null
    }
  },
  props : [

  ],
  async mounted(){
    if(this.workout === null){
      this.workout = (
        await WorkoutService.index(
          {
            token: this.$store.state.token, 
            id: this.$route.params.id
          }
        )
      ).data
    }
  }
}
</script>

<style>

</style>