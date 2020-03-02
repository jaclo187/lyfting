<template>
  <div>
    <h5>{{set.name}}</h5>
    <v-layout row>

        <v-card v-for="data in set.data" :key='data.id'>
            <v-card v-for="(item, key) in data" :key="key">
                <span v-if="key == 'weight' && item !== null">{{item}}kg</span>
                <span v-if="key == 'reps' && item !== null">{{item}}x</span>
                <span v-if="key == 'time' && item !== null">{{item}}m</span>
            </v-card>
        </v-card>

        <!-- <v-flex v-if="set.data.reps" class="md3 mt-1">
            <v-card v-for="(rep, index) in set.data.reps" :key="`rep-${index}-${set.id}`">
                {{rep}} x
            </v-card>
        </v-flex>
        <v-flex v-if="set.data.weight" class="md3 mt-1">
            <v-card 
                v-for="(weight, index) in set.data.weight" 
                :key="`weight-${index}-${set.id}`">
                {{`${weight}
                   ${$store.state.user.preferenceWeight == 'kilogramm' ? "kg" : "lbs"}`}}
            </v-card>
        </v-flex>
        <v-flex v-if="set.data.time" class="md3 mt-1">
            <v-card 
                v-for="(time, index) in set.data.time" 
                :key="`time-${index}-${set.id}`">
                {{time}} minutes
            </v-card>
        </v-flex> -->
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