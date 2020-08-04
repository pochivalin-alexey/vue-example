<template>
  <div>
    <div class="title">Операции на поле 112</div>
    <not-filling-button
      :label="'ЗАПЛАНИРОВАННЫЕ ОПЕРАЦИИ'"
      :margin="'25px 0px 20px -5px'"
      @click="filterByDate('plan')"
      ref="plan"
    ></not-filling-button>
    <not-filling-button
      :label="'ВЫПОЛНЕННЫЕ ОПЕРАЦИИ'"
      :margin="'25px 0px 20px 20px'"
      @click="filterByDate('complete')"
      ref="complete"
    ></not-filling-button>
    <round-button
      :label="'Добавить операцию'"
      :icon="'fa fa-plus-circle'"
      :margin="'21px 0px 20px 0px'"
      @click="createOperation"
    ></round-button>

    <table>
      <tr class="table-header">
        <th v-for="field of fields" :key="field.title" class="table-item">
          {{ field.title }}
          <i
            :style="{ color: field.sort ? '#3399ff' : '#a7a9ac' }"
            :class="{ 'fields-icon': true, [field.icon]: true }"
            @click="sort(field.id)"
          ></i>
        </th>
      </tr>
      <tr v-for="item of filterOperations" :key="item.id" @click="editOperation(item.id)">
        <td class="table-item" style="letter-spacing: -0.4px;">{{ getformatDate(item.date) }}</td>
        <td
          class="table-item"
          style="letter-spacing: -0.47px; font-weight: 500;"
        >{{ locales.Operation[getOperationType(item.type)] }}</td>
        <td class="table-item">
          <div style="float: left; margin-top: 5px;margin-right: 5px;">
            <img src="@/assets/wheat.png" />
          </div>
          <div style="letter-spacing: -0.34px; margin-top: 11px;">Пшеница озимая</div>
        </td>
        <td
          class="table-item"
          :style="{
            opacity: typeof item.assessment === 'number' ? 1 : 0.5,
            'letter-spassing': '-029px',
          }"
        >
          <div
            :style="{
              width: '20px',
              height: '10px',
              'border-radius': '5px',
              'margin-right': '5px',
              'background-color':
                typeof item.assessment === 'number'
                  ? getAssessmentColor(item.assessment)
                  : '#D9D9D9',
              display: 'inline-block',
            }"
          ></div>
          {{
          locales.Assessment[getAssessment(item.assessment)] || "Нет оценки"
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NotFillingButton from "@/components/NotFillingButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import Dialog from "@/components/Dialog.vue";
import Operation, { OperationType } from "@/services/models/Operation";
import { Assessment } from "@/services/models/Operation";
import TDate from "@/services/models/TDate";
import json from "@/locales/intterra-ru-RU.json";

@Component({
  components: { Dialog, NotFillingButton, RoundButton },
})
export default class FieldOperation extends Vue {
  locales = json;

  fields = [
    { id: "date", title: "Дата", icon: "fa fa-sort-desc" },
    { id: "type", title: "Операции", icon: "fa fa-sort-desc" },
    { id: "culture", title: "Культура", icon: "fa fa-sort-desc" },
    { id: "assessment", title: "Качество", icon: "fa fa-sort-desc" },
  ] as { id: string; title: string; icon: string; sort: string | undefined }[];

  filterOperations = [] as Operation[];

  assessmentColor: {
    EXCELLENT: string;
    SATISFACTORILY: string;
    BADLY: string;
  } = {
    EXCELLENT: "#66CC66",
    SATISFACTORILY: "#FDE06D",
    BADLY: "#FF7360",
  };

  mounted() {
    this.$store.dispatch("loadOperations");
  }

  createOperation(): void {
    this.$router.push({ path: "/add" });
  }

  @Watch("operations")
  onOperationsChanged(val: Operation[], oldVal: Operation[]): void {
    this.filterOperations = val;
  }

  async editOperation(id: string) {
    await this.$store.dispatch("loadOperation", id);
    this.$router.push({
      path: `/edit/${id}`,
      params: { id: id },
    });
  }

  get operations(): Operation[] {
    return this.$store.getters.getOperations;
  }

  filterByDate(rule: string): void {
    if ((this.$refs[rule] as any).selected) {
      (this.$refs.plan as any).selected = false;
      (this.$refs.complete as any).selected = false;

      (this.$refs[rule] as any).selected = true;
      const now = new Date();
      this.filterOperations = this.operations.filter((item) => {
        const operationDate = new Date(
          item.date.year,
          item.date.month,
          item.date.day
        );
        if (rule === "plan" && operationDate >= now) {
          return item;
        } else if (rule === "complete" && operationDate <= now) {
          return item;
        }
      });
    } else {
      (this.$refs[rule] as any).selected = false;
      this.filterOperations = this.operations;
    }
  }

  getformatDate(date: TDate): string {
    const formatter = new Intl.DateTimeFormat("ru", { month: "short" });
    const month = formatter.format(
      new Date(date.year, date.month - 1, date.day)
    );
    return `${date.day} ${month.substring(0, 3).toUpperCase()} ${date.year}`;
  }

  getOperationType(type: number): string {
    return OperationType[type];
  }

  getAssessment(code: number): string {
    return Assessment[code];
  }

  getAssessmentColor(code: number): string {
    return Assessment[code]
      ? (this.assessmentColor as {
          [key: string]: string;
        })[Assessment[code]]
      : "#FFFFFF";
  }

  sort(id: string): void {
    const fieldIndex = this.fields.findIndex((field) => field.id === id);

    this.fields.forEach((field, i) => {
      if (i !== fieldIndex && field.sort) delete field.sort;
    });

    let sort_order: number;
    if (this.fields[fieldIndex].sort === "asc") {
      sort_order = -1;
      this.fields[fieldIndex].sort = "desc";
    } else if (this.fields[fieldIndex].sort === "desc") {
      sort_order = 1;
      this.fields[fieldIndex].sort = "asc";
    } else {
      sort_order = 1;
      this.fields[fieldIndex].sort = "asc";
    }

    // @ts-ignore
    this.filterOperations.sort((x: Operation, y: Operation) => {
      let a: string = "";
      let b: string = "";
      if (id === "assessment" || id === "type") {
        if (id === "assessment") {
          a =
            (this.locales.Assessment as any)[
              this.getAssessment(x.assessment as Assessment)
            ] || "Нет оценки";
          b =
            (this.locales.Assessment as any)[
              this.getAssessment(y.assessment as Assessment)
            ] || "Нет оценки";
        } else if (id === "type") {
          a = (this.locales.Operation as any)[this.getOperationType(x.type)];
          b = (this.locales.Operation as any)[this.getOperationType(y.type)];
        }
        return a == b
          ? 0 * sort_order
          : a > b
          ? 1 * sort_order
          : -1 * sort_order;
      } else if (id === "date") {
        let e = new Date(x.date.year, x.date.month, x.date.day) as Date;
        let g = new Date(y.date.year, y.date.month, y.date.day) as Date;
        return (Number(e) - Number(g)) * sort_order;
      }
    });
  }
}
</script>

<style scoped>
.title {
  width: 255px;
  height: 31px;
  margin-top: 23px;
  font-family: Ubuntu;
  font-weight: bold;
  font-size: 25px;
  letter-spacing: -0.8px;
}

table {
  font-family: "Ubuntu";
  border-collapse: collapse;
  font-size: 11px;
  width: 100%;
  height: 40px;
  margin-top: 37px;
}

.table-header {
  background-color: #edeeee;
  font-size: 11px;
  letter-spacing: -0.52px;
}
.table-item {
  padding-left: 7px;
}

td,
th {
  border-bottom: 1px solid #f6f6f6;
  text-align: left;
}

.fields-icon {
  background-color: none;
  border: none;
  stroke: #979797;
  padding: 0px 2px;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
