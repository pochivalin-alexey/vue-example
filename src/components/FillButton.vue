<template>
  <button @click="$emit('click', $event)">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FillButton extends Vue {
  @Prop() label: string | undefined;
}
</script>

<style scoped>
button {
  position: absolute;
  bottom: 0px;
  width: 320px;
  height: 60px;
  background-color: #66cc66;
  outline: none;
  border: none;
  box-shadow: none;
  color: #ffffff;
  font-family: Ubuntu;
  font-size: 11px;
  letter-spacing: -0.37px;
}
</style>
