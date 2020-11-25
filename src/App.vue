<template>
  <div id="app">
    <v-modal
      v-if="isModalShown"
      @close-modal="isModalShown = false"
    >
      <template slot="header">
        <b>Table row information</b>
      </template>
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
    <v-modal
      v-if="FETCHING_ERROR"
      @close-modal="CLEAN_FETCH_ERROR()"
    >
      <template slot="header">
        <b>Fetching data notification</b>
      </template>
      {{ FETCHING_ERROR }}
      <template slot="footer">
        <button class="btn small" @click="CLEAN_FETCH_ERROR()">OK</button>
      </template>
    </v-modal>
    <button
      class="btn"
      v-if="TABLE_DATA.length === 0"
      @click="isLoading = true; GET_TABLE_DATA()"
    >
      {{ isLoading ? 'Loading...' : 'Download data' }}
      <div class="lds-dual-ring" v-if="isLoading"></div>
    </button>
    <v-table
      v-if="TABLE_DATA.length > 0"
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
    isLoading: false,
  }),
  computed: {
    ...mapGetters(['TABLE_DATA', 'FETCHING_ERROR']),
  },
  methods: {
    ...mapActions(['GET_TABLE_DATA', 'CLEAN_FETCH_ERROR']),
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
    document.addEventListener('keyup', e => e.keyCode === 27 && (this.isModalShown = false))
  },
  watch: {
    TABLE_DATA(value) {
      this.isLoading = !value.length
    },
    FETCHING_ERROR(value) {
      value.toString().length > 0 && (this.isLoading = false)
    }
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
  margin-top: 10px;
}
.btn {
  font-family: 'M PLUS Rounded 1c', sans-serif, Helvetica, Arial, sans-serif;
  padding: 10px 25px;
  background-color: #fff;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  border: solid 2px #4CAF50;
  border-radius: 10px;
  transition-duration: .5s;
  margin-bottom: 10px;
}
.btn:hover {
  background-color: #4CAF50;
  color: white;
}
.btn.small {
  padding: 7px 15px;
  font-size: 15px;
  margin-bottom: 0px;
}

.lds-dual-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 15px;
  height: 15px;
  margin: 0px;
  border-radius: 50%;
  border: 5px solid rgb(17, 105, 54);
  border-color: rgb(17, 105, 54) transparent rgb(17, 105, 54) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
