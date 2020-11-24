<template>
  <div class="body__row">
    <div
      :class="['row', `row-${header.name}`]"
      v-for="(header, headerIndex) in headers"
      :key="headerIndex"
      :style="basisStyle"
      :title="getByPath(row, header.path)"
      @click="$emit('click')"
    >
      {{ getByPath(row, header.path) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-table-row',
  props: {
    basisStyle: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getByPath(row, path) {
      return path.split('.').reduce((a, b) => a[b], row)
    }
  }
}
</script>

<style>
  .body__row {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    transition: .5s;

  }
  .body__row:hover {
    background: #ddd;
    cursor: pointer;
  }
  .row {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>