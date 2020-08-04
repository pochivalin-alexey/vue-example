<template>
  <div>
    <div class="header"></div>

    <div class="sidebar-left"></div>
    <div class="main">
      <slot />
    </div>
    <div class="sidebar-right"></div>

    <div class="footer">&copy; 2020 Awesome Company</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DefaultLayout extends Vue {}
</script>

<style scoped>
.header {
  position: absolute;
  /*width: 1024px;*/
  /*height: 80px;*/
  width: 100%;
  height: 8.5%;
  top: 0%;
  left: 0%;
  background-color: #091c28;
}

.sidebar-left {
  position: absolute;
  /*width: 80px;*/
  /*height: 689px;*/
  width: 8%;
  height: 86.5%;
  left: 0%;
  top: 8.5%;
  background-color: #f9f9f9;
}

.sidebar-right {
  position: absolute;
  /*width: 87px;*/
  /*height: 689px;*/
  top: 8.5%;
  right: 0%;
  height: 86.5%;
  width: 8%;
  box-shadow: -4px 0px 15px -5px rgba(0, 0, 0, 0.3);
  background-color: #f9f9f9;
}

.main {
  position: absolute;
  /*width: 857px;*/
  /*height: 689px;*/
  width: 80%;
  height: 86.5%;
  top: 8.5%;
  left: 8%;
  /*right: 8%;*/
  padding-left: 2%;
  overflow-y: auto;
  /*min-width: 505px;*/
}

.footer {
  position: absolute;
  display: flex;
  left: 0%;
  bottom: 0%;
  width: 100%;
  height: 5%;
  background-color: #c0c0c0;
  align-items: center;
  justify-content: center;
}
</style>
