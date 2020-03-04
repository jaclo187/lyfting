import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isLoggedIn: false,
    workout: null
  },
  mutations: {
    setToken(state, token){
      state.token = token
      if(token && token !== ""){
        state.isLoggedIn = true
      } else state.isLoggedIn = false
    },
    setUser(state, user){
      state.user = user
    },
    logoutUser(state){
      state.user = null
      state.token = null
      state.isLoggedIn = false
    },
    setWorkout(state, workout){
      state.workout = workout
    }
  },
  actions: {
    setToken({commit}, token){
      commit('setToken', token)
    },
    setUser({commit}, user){
      commit('setUser', user)
    },
    logoutUser({commit}){
      commit('logoutUser')
    },
    setWorkout({commit}, workout){
      commit('setWorkout', workout)
    }
  },
  modules: {}
})
