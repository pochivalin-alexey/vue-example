import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Field from "@/views/Field.vue";
import Dialog from "@/components/Dialog.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Field",
    meta: { layout: "default-layout" },
    component: Field,
  },
  {
    path: "/add",
    name: "Add",
    meta: { layout: "default-layout" },
    props: { default: true, dialog: true },
    components: { default: Field, dialog: Dialog },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    meta: { layout: "default-layout" },
    props: { default: true, dialog: true },
    components: { default: Field, dialog: Dialog },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
