<template>
  <div class="main">
    <label for="area">КОЛ-ВО ГА К ОБРАБОТКЕ</label>
    <input
      type="text"
      id="area"
      name="area"
      placeholder="Задайте"
      v-model.number="area"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class InputArea extends Vue {
  @Prop() value: number | undefined;
  area: number | undefined;

  created() {
    this.area = this.value;
  }
}
</script>

<style scoped>
.main {
  width: 138px;
  height: 48px;
  margin-top: 12px;
  margin-right: 16px;
  float: right;
}
label {
  width: 95px;
  height: 11px;
  margin-top: 9px;
  margin-bottom: 0px;
  margin-left: 9px;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 8px;
  letter-spacing: -0.4px;
}

input {
  width: 78px;
  height: 21px;
  margin-top: 1px;
  margin-left: 9px;
  border: none;
  box-shadow: none;
  outline: none;
  font-family: Ubuntu;
  font-size: 18px;
  letter-spacing: -0.8px;
  display: block;
}
</style>
