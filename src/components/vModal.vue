<template>
  <div class="v-modal">
    <div class="v-modal__header">
      <span></span>
      <span></span>
    </div>
    <div class="v-modal__content">
      <slot></slot>
    </div>
    <div class="v-modal__footer">
      <button></button><button></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-modal'
}
</script>

<style>
  .v-modal {
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 20px 0 #ccc;
  }
  .v-modal__header, .v-modal__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .v-modal__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>