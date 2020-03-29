<template>
    <v-layout v-if="set.exercise" row>
        <v-card class="set_card">
            Exercise: 
            <span class="bold">{{transformString(set.exercise)}}</span> 
            for 
            <span class="bold">{{transformString(set.musclegroup)}}</span>
        </v-card>
        <br>
        <span v-if="set.data.length >= 1">
            <v-card v-for="data in dataWithValues" :key='data.id' class="set_card">
                <span >
                    <div v-for="(item, key) in data" :key="key">
                        <span v-if="key == 'weight' && item !== null">{{item}}kg</span>
                        <span v-if="key == 'reps' && item !== null">{{item}}x</span>
                        <span v-if="key == 'time' && item !== null">{{item}}min</span>
                    </div>
                </span>
            </v-card>
        </span>
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
        transformString(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        hasValues(data) {
            if(data.time !== null || data.reps !== null || data.weight !== null) return true
            else return false
        }
    }, 
    computed : {
        dataWithValues() {
            return this.set.data.filter(i => this.hasValues(i))
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