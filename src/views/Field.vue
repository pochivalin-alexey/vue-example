<template>
  <div>
    <field-operation></field-operation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FieldOperation from "@/components/FieldOperation.vue";

@Component({
  components: { FieldOperation },
})
export default class Field extends Vue {}
</script>
