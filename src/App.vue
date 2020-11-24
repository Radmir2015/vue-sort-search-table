<template>
  <div id="app">
    <v-modal
      v-if="isModalShown"
      @close-modal="isModalShown = false"
    >
      <p>Name: {{ rowForModal.fullname }}</p>
      <p>Address:</p>
      <p
        v-for="[addressKey, addressValue] in Object.entries(rowForModal.address)"
        :key="addressKey"
        style="text-indent: 1rem"
      >
        <b>{{ `${capitalize(addressKey)}: ` }}</b>{{ `${addressValue}` }}
      </p>
    </v-modal>
    <v-table
      :headers="headers"
      :data="TABLE_DATA"
      @show-modal="e => showModal(e)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from './components/vTable'
import vModal from './components/vModal'

export default {
  name: 'App',
  components: {
    vTable, vModal
  },
  data: () => ({
    headers: [
      { name: 'name', path: 'fullname'},
      { name: 'username', path: 'uname'},
      { name: 'company', path: 'company'},
      { name: 'email', path: 'email'},
      { name: 'state', path: 'address.state'},
    ],
    isModalShown: false,
    rowForModal: {},
  }),
  computed: {
    ...mapGetters(['TABLE_DATA']),
  },
  methods: {
    ...mapActions(['GET_TABLE_DATA']),
    showModal(row) {
      // alert(JSON.stringify(row))
      this.isModalShown = true
      this.rowForModal = row
    },
    capitalize(str) {
      return [...str].map((x, i) => i === 0 ? x.toUpperCase() : x).join('')
    }
  },
  mounted() {
    this.GET_TABLE_DATA()

    document.addEventListener('keyup', e => e.keyCode === 27 && (this.isModalShown = false))
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
