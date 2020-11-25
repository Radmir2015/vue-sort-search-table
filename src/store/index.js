import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseURLQuery = 'http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}'

export default new Vuex.Store({
  state: {
    tableData: [],
    fetchingError: '',
  },
  mutations: {
    SET_TABLE_DATA: (state, data) => state.tableData = data,
    SET_FETCHING_ERROR: (state, data) => state.fetchingError = data
  },
  actions: {
    GET_TABLE_DATA: async ({ commit }) => {
      try {
        const response = await fetch(baseURLQuery)
        return commit('SET_TABLE_DATA', await response.json())
      } catch (error) {
        return commit('SET_FETCHING_ERROR', error)
      }
    },
    CLEAN_FETCH_ERROR: async ({ commit }) => {
      commit('SET_FETCHING_ERROR', '')
    }
  },
  getters: {
    TABLE_DATA: (state) => state.tableData,
    FETCHING_ERROR: (state) => state.fetchingError
  },
  modules: {
  }
})
