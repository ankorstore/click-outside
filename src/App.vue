<template>
  <div class="container" v-click-outside="hide">
    <div @click="toggle">Toggle</div>
    <div ref="popupItem" v-show="opened">
      <h1>Popup item</h1>
      <p>Click outside to close it</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ClickOutside } from "./lib/click-outside";

const opened = ref(false);
const toggle = () => (opened.value = true);
const hide = () => (opened.value = false);
const popupItem = ref(null);
const vClickOutside = ClickOutside;
</script>
<style scoped>
.container {
  padding: 1rem;
  background-color: red;
}
</style>
