<template>
  <div>
    <h5>{{set.name}}</h5>
    <v-flex class=".flex-row">
        <v-container v-if="set.data.reps">
            <v-card v-for="(rep, index) in set.data.reps" :key="`rep-${index}`">
                {{rep}}
            </v-card>
        </v-container>
        <v-container v-if="set.data.weight">
            <v-card 
                v-for="(weight, index) in set.data.weight" 
                :key="`weight-${index}`">
                {{`${weight}
                   ${$store.state.user.preferenceWeight == 'kilogramm' ? "kg" : "lbs"}`}}
            </v-card>
        </v-container>
        <v-container v-if="set.data.time">
            <v-card 
                v-for="(time, index) in set.data.time" 
                :key="`time-${index}`">
                {{weight}}
            </v-card>
        </v-container>
    </v-flex>
  </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props : [ "set" ],
    methods : {

    }
}
</script>

<style>

</style>