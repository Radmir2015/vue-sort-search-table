<template>
  <div class="v-table">
    <div class="v-table__header">
      <p
        v-for="(header, headerIndex) in headers"
        :key="headerIndex"
        :style="basisStyle"
        @click="sortBy(header)"
      >
        {{ header.name.toUpperCase() }}
      </p>
    </div>
    <div class="v-table__body">
      <v-table-row
        v-for="(row, rowIndex) in paginatedRows"
        :key="rowIndex"
        :basisStyle="basisStyle"
        :headers="headers"
        :row="row"
      />
    </div>
    <div class="v-table__pagination">
      <v-page v-if="currentPage > 1" @click="currentPage = 1">{{ 1 }}</v-page>
      <v-page v-if="currentPage > 2" @click="currentPage--">{{ currentPage - 1 }}</v-page>
      <v-page :selected="true" @click="currentPage">{{ currentPage }}</v-page>
      <v-page v-if="currentPage < pages - 1" @click="currentPage++">{{ currentPage + 1 }}</v-page>
      <v-page v-if="currentPage < pages" @click="currentPage = pages">{{ pages }}</v-page>
    </div>
  </div>
</template>

<script>
import vTableRow from './vTableRow'
import vPage from './vPage'

export default {
  name: 'v-table',
  components: {
    vPage, vTableRow
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data: () => ({
    currentPage: 1,
  }),
  computed: {
    basisStyle() {
      return { 'flexBasis': 100 / this.headers.length + '%' }
    },
    pages() {
      return Math.ceil(this.data.length / this.perPage)
    },
    paginatedRows() {
      return this.data.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  methods: {
    getByPath(row, path) {
      return path.split('.').reduce((a, b) => a[b], row)
    },
    sortBy(header) {
      this.data.sort((a, b) => {
        a = this.getByPath(a, header.path)
        b = this.getByPath(b, header.path)
        return typeof a === 'number' && typeof b === 'number'
               ? +a - +b
               : a.localeCompare(b)
      })
    }
  }
}
</script>

<style>
  .v-table {
    max-width: 90%;
    margin: 0 auto;
  }
  .v-table__header {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    border-bottom: solid 1px #ccc;
  }
  .v-table__header p {
    text-align: left;
  }
  
  .v-table__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }
</style>