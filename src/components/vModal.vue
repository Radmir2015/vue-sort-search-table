<template>
  <div class="modal_wrapper" @click.self="$emit('close-modal')">
    <div class="v-modal">
      <div class="v-modal__header">
        <span><slot name="header"></slot></span>
        <span>
          <i
            class="material-icons closeButton"
            @click="$emit('close-modal')"
          >
            close
          </i>
        </span>
      </div>
      <div class="v-modal__content">
        <slot></slot>
      </div>
      <div class="v-modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-modal',
  data: () => ({
    wrapperClick: false,
  })
}
</script>

<style>
  .modal_wrapper {
    background: rgba(64, 64, 64, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .v-modal {
    z-index: 1;
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
    text-align: left;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .closeButton {
    cursor: pointer;
  }
</style>