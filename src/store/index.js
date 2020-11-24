import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: []
  },
  mutations: {
    SET_TABLE_DATA: (state, data) => state.tableData = data
  },
  actions: {
    GET_TABLE_DATA: async ({ commit }) => {
      try {
        const response = await fetch('http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}')
        return commit('SET_TABLE_DATA', await response.json())
      } catch {
        alert('Retrieving data failed')
      }
    }
  },
  getters: {
    TABLE_DATA: (state) => state.tableData
  },
  modules: {
  }
})
