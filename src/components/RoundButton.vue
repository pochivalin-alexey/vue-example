<template>
  <button :style="{ margin }" @click="$emit('click', $event)">
    <i v-if="icon" :class="{ [icon]: true }"></i>
    {{ label }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class RoundButton extends Vue {
  @Prop() label: string | undefined;
  @Prop() margin: string | undefined;
  @Prop() icon: string | undefined;
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  button {
    float: none;
    margin: auto;
    display: block;
  }
}

button {
  width: 172px;
  height: 40px;
  float: right;
  border: 1px solid;
  font-size: 13px;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
  outline: none;
  border-color: #979797;
  border-radius: 20px;
  letter-spacing: -0.4px;
  outline: "none";
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
}

i {
  width: 16px;
  height: 16px;
  font-size: 1.2em;
  margin-right: 5px;
  color: #66cc66;
  border-color: #3f4551;
}
</style>
