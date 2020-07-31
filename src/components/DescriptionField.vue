<template>
  <div class="main">
    <div class="left">
      <div class="square"></div>
      <div class="title">
        {{ item.title }}
      </div>
      <div class="number">
        {{ item.num }}
      </div>
    </div>
    <div class="right">
      <div class="culture">
        {{ item.culture }}
      </div>
      <div class="image">
        <img src="@/assets/wheat.png" />
      </div>
      <div class="description">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DescriptionField extends Vue {
  item = {
    title: "ПОЛЕ",
    num: 112,
    culture: "Озимая пшеница",
    description: "ПОБЕДА 50",
    image: "@/assets/wheat.png",
  };
}
</script>

<style scoped>
.main {
  width: 320px;
  height: 52px;
  /*border-top: 1px solid rgba(151, 151, 151, 0.3);*/
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
}

.left {
  width: 66px;
  height: 40px;
  margin: 5px 10px;
  float: left;
}

.right {
  width: 146px;
  height: 34px;
  margin: 7px 10px;
  float: right;
}

.square {
  width: 25.6px;
  height: 27px;
  background-color: #73ff82;
  border: 1px solid #66cc66;
  margin: 7px 6.5px;
  float: left;
}

.title {
  width: 24px;
  height: 11px;
  margin-top: 7px;
  float: right;
  font-size: 9px;
  font-weight: 500;
  font-family: Ubuntu;
  letter-spacing: -0.45px;
}

.number {
  width: 25px;
  height: 25px;
  float: right;
  font-size: 15px;
  font-family: Ubuntu;
  font-weight: 500;
  font-weight: bold;
  letter-spacing: -0.71px;
}

.culture {
  width: 107px;
  height: 21px;
  float: left;
  font-family: Ubuntu;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -1.18px;
}

.description {
  width: 47px;
  height: 11px;
  margin-left: 59px;
  margin-top: 2px;
  float: left;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 9px;
  letter-spacing: -1.18px;
}

.image {
  width: 30px;
  height: 30px;
  float: right;
  margin-right: 7px;
  margin-top: 4px;
}
</style>
