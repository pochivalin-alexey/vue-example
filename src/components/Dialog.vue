<template>
  <div class="my-modal">
    <div class="modal-content">
      <div class="header">{{dialog.title}}</div>
      <div class="body">
        <separator></separator>
        <description-field></description-field>
        <separator></separator>
        <select-type :id="type" @change="updateType"></select-type>
        <input-date :value="date" @change="updateDate"></input-date>
        <input-area :value="area" @input="updateArea"></input-area>
        <br />
        <br />
        <br />
        <br />
        <br />
        <separator></separator>
        <comment-area :value="comment" @input="updateComment"></comment-area>
        <separator></separator>
        <group-button :id="assessment" @click="updateAssessment"></group-button>
      </div>
      <div class="footer">
        <fill-button :label="dialog.saveButton" @click="saveOperation"></fill-button>
      </div>
    </div>
    <div class="modal-background"></div>
    <div class="close" @click="closeDialog">&times;</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Assessment, OperationType } from "@/services/models/Operation";
import Operation from "@/services/models/Operation";
import GroupButton from "@/components/GroupButton.vue";
import CommentArea from "@/components/CommentArea.vue";
import InputArea from "@/components/InputArea.vue";
import InputDate from "@/components/InputDate.vue";
import SelectType from "@/components/SelectType.vue";
import DescriptionField from "@/components/DescriptionField.vue";
import FillButton from "@/components/FillButton.vue";
import Separator from "@/components/Separator.vue";
import TDate from "@/services/models/TDate";
import json from "@/locales/intterra-ru-RU.json";

@Component({
  components: {
    GroupButton,
    CommentArea,
    InputArea,
    InputDate,
    SelectType,
    DescriptionField,
    FillButton,
    Separator,
  },
})
export default class Dialog extends Vue {
  locales = json;

  id?: string | null;

  date: TDate = new TDate({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  type: OperationType | null = null;
  assessment?: Assessment | null = null;
  comment?: string | null = null;
  area: number | null = null;

  get operation(): Operation {
    return this.$store.getters.getOperation;
  }

  get dialog(): { title: string; saveButton: string } {
    return this.$router.currentRoute.path.includes("/add")
      ? { title: "Добавление операции", saveButton: "ДОБАВИТЬ ОПЕРАЦИЮ" }
      : { title: "Редактирование операции", saveButton: "СОХРАНИТЬ ОПЕРАЦИЮ" };
  }

  @Watch("operation", { immediate: true })
  onOperationChanged(val: Operation, oldVal: Operation): void {
    if (typeof this.operation === "object") {
      this.id = this.operation.id;
      this.date = this.operation.date;
      this.type = this.operation.type;
      this.assessment = this.operation.assessment;
      this.comment = this.operation.comment;
      this.area = this.operation.area;
    }
  }

  closeDialog(): void {
    this.$store.dispatch("clearOperation");
    this.$router.back();
  }

  saveOperation(): void {
    const newOperation = new Operation({
      id: this.id,
      type: this.type!,
      date: this.date,
      area: this.area!,
      comment: this.comment,
      assessment: this.assessment,
    });
    this.$store.dispatch("saveOperation", newOperation);
    this.$store.dispatch("clearOperation");
    this.$router.back();
  }

  updateComment(value: string | null): void {
    this.comment = value;
  }

  updateArea(value: number | null): void {
    this.area = value;
  }

  updateDate(value: TDate): void {
    this.date = value;
  }

  updateType(value: OperationType): void {
    this.type = value;
  }

  updateAssessment(value: number | null): void {
    this.assessment = value;
  }
}
</script>

<style scoped>
.header {
  width: 300px;
  height: 52px;
  background-color: #ffffff;
  font-family: Ubuntu;
  font-size: 21px;
  font-weight: 500;
  margin-top: 12px;
  margin-left: 20px;
  color: #333333;
  letter-spacing: -0.93px;
}

.close {
  top: 1.5%;
  right: 3.2%;
  position: absolute;
  color: #ffffff;
  opacity: 1;
  font-size: 42px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #cccccc;
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  float: left;
  max-width: 320px;
  height: 100%;
  background-color: #ffffff;
}

.my-modal {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-background {
  width: calc(100% - 320px);
  height: 100%;
  float: right;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
