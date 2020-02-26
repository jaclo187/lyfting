import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isLoggedIn: false
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
    }
  },
  modules: {}
})
