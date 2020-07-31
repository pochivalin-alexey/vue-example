<template>
  <div id="app">
    <component :is="$route.meta.layout">
      <router-view></router-view>
      <router-view name="dialog"></router-view>
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {}
</script>

<style>
</style>
