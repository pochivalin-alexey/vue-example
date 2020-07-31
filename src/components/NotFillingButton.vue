<template>
  <div>
    <button
      :class="{ 'active-button': selected ? true : false }"
      :style="{ margin }"
      @click="onClick"
    >
      <i v-if="icon" :class="{ [icon]: true }"></i>
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class NotFillingButton extends Vue {
  @Prop() label: string | undefined;
  @Prop() margin: string | undefined;
  @Prop() icon: string | undefined;

  selected: boolean = false;

  onClick($event: any) {
    this.selected = !this.selected;
    this.$emit("click", $event);
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  button {
    width: 100%;
  }
}

button {
  float: left;
  height: 40px;
  border: none;
  font-size: 11px;
  box-shadow: none;
  font-weight: 400;
  outline: none;
  letter-spacing: -0.52px;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
}

.active-button {
  color: blue;
}

i {
  width: 16px;
  height: 16px;
  font-size: 1.2em;
  color: #66cc66;
  border-color: #3f4551;
}
</style>
