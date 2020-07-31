<template>
  <div class="main">
    <div style="float: left">
      <div class="header">ДАТА ПРОВЕДЕНИЯ</div>
      <div class="label">{{ dateToStr }}</div>
    </div>
    <div class="body">
      <input type="date" class="calendar" v-model="date" @change="$emit('change', this.dateToObj)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TDate from "@/services/models/TDate";

@Component({
  components: {},
})
export default class InputDate extends Vue {
  @Prop() value!: TDate;
  date: any = new Date();

  created() {
    this.date = new Date(this.value.year, this.value.month - 1, this.value.day);
  }

  get dateToStr(): string {
    let toFormat;
    if (typeof this.date === "string") {
      toFormat = new Date(this.date);
    } else {
      toFormat = this.date;
    }
    return toFormat.toLocaleString("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  get dateToObj(): TDate {
    const date = new Date(this.date);
    return new TDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }
}
</script>

<style scoped>
.main {
  width: 138px;
  height: 48px;
  margin-left: 16px;
  margin-top: 12px;
  float: left;
}

input {
  display: block;
}

.body {
  float: left;
  margin-top: -32px;
  margin-left: 70px;
}

.header {
  width: 72px;
  height: 11px;
  margin-top: 9px;
  margin-left: 9px;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 8px;
  letter-spacing: -0.4px;
}

.label {
  width: 83px;
  height: 21px;
  margin-left: 8px;
  margin-top: 2px;
  font-family: Ubuntu;
  font-size: 18px;
  letter-spacing: -0.4px;
}

.calendar {
  background: no-repeat;
  border: none;
  box-shadow: none;
  outline: none;
}

.calendar::-webkit-datetime-edit {
  display: none;
  -webkit-appearance: none;
}
</style>
