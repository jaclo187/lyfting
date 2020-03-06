<template>
  <div>
    <h5>{{set.name}}</h5>
    <v-layout row>
        <v-card>Exercise: {{set.exercise}} using {{set.type}}</v-card><br>
        <v-card>Musclegroup: {{set.musclegroup}}</v-card><br>
        <v-card v-for="data in set.data" :key='data.id'>
            <v-card v-for="(item, key) in data" :key="key">
                <span v-if="key == 'weight' && item !== null">{{item}}kg</span>
                <span v-if="key == 'reps' && item !== null">{{item}}x</span>
                <span v-if="key == 'time' && item !== null">{{item}}m</span>
            </v-card>
        </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props : [ "set" ],
    methods : {
        
    },
    mounted(){
        console.log(this.set)
    }
}
</script>

<style>

</style>