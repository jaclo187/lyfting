<template>
    <div></div>
</template>

<script>
import WorkoutService from '@/services/WorkoutService'
export default {
    
    data(){
        return {
            workout : null,
            name: ""
        }
    },
    props : [
    ],
    methods : {
        async updateName(){
            console.log("testtest", this.name)
            await WorkoutService.update(this.$store.state.token, this.workout.id, this.name)
        }
    },
    async mounted(){
        if(this.$store.state.isLoggedIn){
            if(!this.workout){
                //if no workout data is given, create a new one
                this.workout = (await WorkoutService.post({token: this.$store.state.token})).data
            }
            //saving current workout in vuex
            
            this.$router.push({ path: `edit/${this.workout.id}` })

        } else this.$router.push({name: 'Home'});
    }
}
</script>

<style>

</style>