<template>
  <div :class="{'page': true, 'page__selected': selected }" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'v-page',
    props: {
      selected: {
        type: Boolean,
        default: false
      }
    }
}
</script>

<style>
  .page {
    padding: 8px;
    margin-right: 10px;
    border: solid 1px #ccc;
    transition: .5s;
  }
  .page__selected, .page:hover {
    background: #ccc;
    cursor: pointer;
  }
</style>