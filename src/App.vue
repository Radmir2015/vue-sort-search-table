<template>
  <div id="app">
    <v-table
      :headers="headers"
      :data="TABLE_DATA"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from './components/vTable'

export default {
  name: 'App',
  components: {
    vTable
  },
  data: () => ({
    headers: [
      { name: 'name', path: 'fullname'},
      { name: 'username', path: 'uname'},
      { name: 'company', path: 'company'},
      { name: 'email', path: 'email'},
      { name: 'state', path: 'address.state'},
    ]
  }),
  computed: {
    ...mapGetters(['TABLE_DATA']),
  },
  methods: {
    ...mapActions(['GET_TABLE_DATA']),
  },
  mounted() {
    this.GET_TABLE_DATA()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap');
#app {
  font-family: 'M PLUS Rounded 1c', sans-serif, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
