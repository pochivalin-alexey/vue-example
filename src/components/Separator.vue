<template>
  <div class="separator"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Separator extends Vue {}
</script>

<style scoped>
.separator {
  width: 320px;
  height: 1px;
  background-color: #edeeee;
  /* rgba(151, 151, 151, 0.3);*/
}
</style>
