<template>
  <div class="main">
    <div style="float: left">
      <div class="title">ОПЕРАЦИЯ</div>
      <div class="label">{{ selected }}</div>
    </div>
    <div style="float: right">
      <select v-model="selected" @change="$emit('change', selectedId)">
        <option v-for="type of options" :key="type.id" :value="type.title">
          {{
          type.title
          }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { OperationType } from "@/services/models/Operation";
import json from "@/locales/intterra-ru-RU.json";

@Component({
  components: {},
})
export default class SelectType extends Vue {
  @Prop() id!: number;
  selected: string = "Выберите";
  locales = json;

  options = [
    { title: "Вспашка", id: 0 },
    { title: "Боронование", id: 1 },
    { title: "Внесение удобрений", id: 2 },
    { title: "Полив", id: 3 },
    { title: "Прикатывание", id: 4 },
    { title: "Сбор урожая", id: 5 },
  ] as { title: string; id: number }[];

  get selectedId() {
    const index = this.options.findIndex((o) => o.title === this.selected);
    return this.options[index].id;
  }

  getOperationType(type: number): string {
    return OperationType[type];
  }

  created() {
    this.selected =
      (this.locales.Operation as any)[this.getOperationType(this.id)] ||
      "Выберите";
  }
}
</script>

<style scoped>
.main {
  width: 288px;
  height: 48px;
  margin: 16px;
}

select {
  width: 11px;
  height: 7px;
  margin-right: 12px;
  margin-top: 22px;
  border: none;
  box-shadow: none;
  outline: none;
  font-size: 16px;
  line-height: 1;
}

.title {
  width: 42px;
  height: 11px;
  margin-left: 9px;
  margin-top: 9px;
  font-family: Ubuntu;
  font-size: 8px;
  letter-spacing: -0.4px;
}

.label {
  width: 110px;
  height: 15px;
  margin-left: 9px;
  margin-top: 4px;
  font-family: Ubuntu;
  font-size: 13px;
  letter-spacing: -0.58px;
}
</style>
