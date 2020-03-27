<template>
    <v-layout v-if="set.exercise" row>
        <v-card class="set_card">
            Exercise: 
            <span class="bold">{{transformString(set.exercise)}}</span> 
            for 
            <span class="bold">{{transformString(set.musclegroup)}}</span>
        </v-card>
        <br>
        <v-card v-for="data in set.data" :key='data.id' class="set_card">
            <v-card v-for="(item, key) in data" :key="key">
                <span v-if="key == 'weight' && item !== null">{{item}}kg</span>
                <span v-if="key == 'reps' && item !== null">{{item}}x</span>
                <span v-if="key == 'time' && item !== null">{{item}}min</span>
            </v-card>
        </v-card>
    </v-layout>
    <v-layout v-else row>
        <v-card class="set_card">&lt;Empty Exercise&gt;</v-card>
    </v-layout>
</template>

<script>
export default {
    data(){
        return{}
    },
    props : [ "set" ],
    methods : {
        transformString(string){
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
    }
}
</script>

<style scoped>
    .set_card {
        padding: 0.2vw;
        margin: 0.2vw;
    }
    .bold {
        font-weight: bold;
    }
</style>