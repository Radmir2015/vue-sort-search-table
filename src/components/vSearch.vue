<template>
    <div class="search_wrapper">
      <i class="material-icons">search</i>
      <input
        type="search"
        placeholder="Search..."
        @input="$emit('search-text', $event.target.value)"
      />
    </div>
</template>

<script>
export default {
  name: 'v-search'
}
</script>

<style>
  .search_wrapper {
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 10px;
    border: solid 1px #fff;
    transition: .5s;
  }
  .search_wrapper:hover {
    border: solid 1px #aaa;
  }
  *:focus{
    outline: 0;
  }
  input {
    padding: 15px 5px;
    font-size: 15px;
    background-color: transparent;
    border: 0px solid;
  }
</style>