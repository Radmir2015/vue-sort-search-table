<template>
  <div class="v-table">
    <div class="v-table__header">
      <p
        v-for="(header, headerIndex) in headers"
        :key="headerIndex"
        :style="basisStyle"
        @click="sortBy(headerIndex)"
        @mouseenter="$set(hoverHeaders, headerIndex, true)"
        @mouseleave="$set(hoverHeaders, headerIndex, false)"
      >
        {{ header.name.toUpperCase() }}
        <i
          class="material-icons"
          :class="{ 'active': sortDirections[headerIndex] !== 0 || hoverHeaders[headerIndex] }">
          {{ ['expand_less', 'unfold_more', 'expand_more'][sortDirections[headerIndex] + 1] }}
        </i>
      </p>
    </div>
    <div class="v-table__body">
      <v-table-row
        v-for="(row, rowIndex) in paginatedRows"
        :key="rowIndex"
        :basisStyle="basisStyle"
        :headers="headers"
        :row="row"
        @click="showModal(row)"
      />
    </div>
    <div class="v-table__pagination">
      <v-page v-if="currentPage > 1" @click="currentPage = 1">First</v-page>
      <v-page v-if="currentPage > 2" @click="currentPage--">{{ currentPage - 1 }}</v-page>
      <v-page :selected="true" @click="currentPage">{{ currentPage }}</v-page>
      <v-page v-if="currentPage < pages - 1" @click="currentPage++">{{ currentPage + 1 }}</v-page>
      <v-page v-if="currentPage < pages" @click="currentPage = pages">Last</v-page>
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
    sortedData: [],
    hoverHeaders: [],
    sortDirections: [],
  }),
  computed: {
    basisStyle() {
      return { 'flexBasis': 100 / this.headers.length + '%' }
    },
    pages() {
      return Math.ceil(this.data.length / this.perPage)
    },
    paginatedRows() {
      return this[this.sortedData.length ? 'sortedData' : 'data'].slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  methods: {
    getByPath(row, path) {
      return path.split('.').reduce((a, b) => a[b], row)
    },
    sortBy(headerIndex) {
      this.sortDirections[headerIndex] = parseInt((this.sortDirections[headerIndex] - 2) ** this.sortDirections[headerIndex])
      this.sortDirections = this.sortDirections.map((x, i) => i !== headerIndex ? 0 : x)
      // or f = n => (1 - ((n + 2) % 3 % 2)) * (-1) ** +!((n + 2) % 3)

      this.sortedData = [...this.data]

      if (this.sortDirections[headerIndex] === 0) return 

      this.sortedData.sort((a, b) => {
        a = this.getByPath(a, this.headers[headerIndex].path)
        b = this.getByPath(b, this.headers[headerIndex].path)

        this.sortDirections[headerIndex] === -1 && ([a, b] = [b, a])

        return typeof a === 'number' && typeof b === 'number'
               ? +a - +b
               : a.localeCompare(b)
      })
    },
    showModal(row) {
      alert(JSON.stringify(row))
    }
  },
  mounted() {
    // this.sortedData = this.data
    // this.$set(this, 'sortedData', this.data)
    this.hoverHeaders = new Array(this.headers.length).fill(false)
    this.sortDirections = new Array(this.headers.length).fill(0)
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
    display: flex;
  }
  .v-table__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }
  .v-table__header i {
    opacity: 0;
    transition: .5s;
  }
  .active {
    opacity: 1 !important;
  }
</style>