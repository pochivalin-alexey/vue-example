<template>
  <div class="main">
    <textarea
      style
      rows="3"
      cols="50"
      placeholder="Комментарий к операции..."
      v-model.trim="comment"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CommentArea extends Vue {
  @Prop() value?: string | null;
  comment?: string | null = null;

  created() {
    this.comment = this.value;
  }
}
</script>

<style scoped>
.main {
  width: 320px;
  height: 115px;
  /*background-color: red;*/
}

textarea {
  width: 280px;
  height: 24px;
  /*margin-top: 16px;*/
  padding-top: 15px;
  padding-left: 20px;
  resize: none;
  outline: none;
  border: none;
  font-family: Ubuntu;
  font-size: 13px;
  letter-spacing: -0.4px;
  display: block;
}
</style>
