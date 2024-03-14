<template>
  <textarea v-model="code" class="input" />
  <button @click="onRun">运行 C</button>
  <textarea v-model="jsCode" class="input" />
  <button @click="onRunJS">运行 JS</button>
</template>

<script setup>
import { ref } from "vue";
import * as Service from "./service";

const code = ref("");
const jsCode = ref("");

const onRun = async () => {
  console.log(code.value);
  const res = await Service.compile(code.value);

  console.log(res, "onRun");
};

const onRunJS = async () => {
  console.log(jsCode.value);
  const res = await Service.compileJs(jsCode.value);

  console.log(res, "onRun");
};
</script>

<style scoped>
.input {
  height: 300px;
  width: 500px;
}
</style>
