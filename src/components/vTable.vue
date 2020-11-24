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
      <div class="body__row" v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
        <div
          :class="['row', `row-${header.name}`]"
          v-for="(header, headerIndex) in headers"
          :key="headerIndex"
          :style="basisStyle"
        >
          {{ getByPath(row, header.path) }}
        </div>
      </div>
    </div>
    <div class="v-table__pagination">
      <div :class="{'page': true, 'page__selected': page === currentPage }" v-for="page in pages" :key="page" @click="currentPage = page">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-table',
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
  .body__row {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  }
  .row {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-table__pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }
  .page {
    padding: 8px;
    margin-right: 10px;
    border: solid 1px #ccc;
  }
  .page__selected, .page:hover {
    background: #aeaeae;
    cursor: pointer;
  }
</style>