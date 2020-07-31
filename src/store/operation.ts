import FieldService from "@/services/FieldService";
import Operation from "@/services/models/Operation";

const fieldService = new FieldService() as any;

export default {
  state: {
    operations: [] as Operation[],
    operation: Operation,
  },
  getters: {
    getOperations: (state: { operations: Operation[]; operation: Operation }) =>
      state.operations,
    getOperation: (state: { operations: Operation[]; operation: Operation }) =>
      state.operation,
  },
  mutations: {
    setOperations(state: { operations: Operation[] }, data: Operation[]) {
      state.operations = data;
    },
    setOperation(
      state: { operations: Operation[]; operation: Operation },
      data: Operation
    ) {
      state.operation = data;
    },
    clearOperation(state: {
      operations: Operation[];
      operation: Operation | undefined;
    }) {
      state.operation = undefined;
    },
  },
  actions: {
    async loadOperations({ commit }: any) {
      const operations = await fieldService.getOperations();
      commit("setOperations", operations);
    },

    async loadOperation({ commit }: any, id: string) {
      const operation = await fieldService.getOperation(id);
      commit("setOperation", operation);
    },

    async saveOperation({ dispatch }: any, operation: Operation) {
      await fieldService.saveOperation(operation);
      dispatch("loadOperations");
    },
    clearOperation({ commit }: any) {
      commit("clearOperation");
    },
  },
};
