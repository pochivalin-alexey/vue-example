<template>
  <div class="group">
    <div class="group-title">КАЧЕСТВО ВЫПОЛНЕНИЯ ОПЕРАЦИИ</div>
    <div class="group-button">
      <button
        v-for="button of buttons"
        :key="button.value"
        @click="onClick(button.value)"
        :class="{
          [button.class]: true,
          [button.selected]: selected === button.value ? true : false,
        }"
      >{{ button.locale }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class GroupButton extends Vue {
  @Prop() id!: number | null;
  selected: number | null = null;

  buttons = [
    {
      title: "EXCELLENT",
      locale: "ОТЛИЧНО",
      class: "left-btn",
      selected: "green",
      value: 0,
    },
    {
      title: "SATISFACTORILY",
      locale: "УДОВЛ.",
      class: "center-btn",
      selected: "yellow",
      value: 1,
    },
    {
      title: "BADLY",
      locale: "ПЛОХО",
      class: "right-btn",
      selected: "red",
      value: 2,
    },
  ] as {
    title: string;
    locale: string;
    class: string;
    selected: string;
    value: number;
  }[];

  created() {
    this.selected = this.id;
  }

  onClick(v: number | null) {
    if (this.selected === v) {
      this.selected = null;
    } else {
      this.selected = v;
    }
    this.$emit("click", this.selected);
  }
}
</script>

<style scoped>
.group {
  /*overflow: hidden;*/
  width: 306px;
  height: 81px;
  /*margin-top: 72px;*/
  padding-top: 12px;
  padding-left: 14px;
  /*border-top: 1px solid blue;*/
}

.group-title {
  width: 194px;
  height: 13px;
  margin-bottom: 15px;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: -0.34px;
}

.group-button {
  width: 291px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: none;
  box-shadow: 0px 3px 3px -3px rgb(100, 100, 100);
}

button {
  outline: none;
  cursor: pointer;
}

.left-btn.green {
  color: #ffffff;
  background-color: #66cc66;
}

.center-btn.yellow {
  color: #333333;
  background-color: #ffe06d;
}

.right-btn.red {
  color: #ffffff;
  background-color: #ff7360;
}

.left-btn {
  width: 97px;
  height: 41px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border: none;
  outline: none;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: -0.34px;
}

.center-btn {
  width: 96px;
  height: 41px;
  border-top: none;
  border-bottom: none;
  border-left: 0.5px solid rgba(151, 151, 151, 0.3);
  border-right: 0.5px solid rgba(151, 151, 151, 0.3);
  outline: none;
  font-weight: 500;
  font-family: Ubuntu;
  font-size: 11px;
  letter-spacing: -0.34px;
}

.right-btn {
  width: 98px;
  height: 41px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: none;
  outline: none;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: -0.34px;
}
</style>
