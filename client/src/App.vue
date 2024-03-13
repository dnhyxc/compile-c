<template>
  <textarea v-model="code" class="input" />
  <button @click="onRun">运行</button>
</template>

<script setup>
import { ref } from "vue";
import * as Service from "./service";

const code = ref("");

const onRun = async () => {
  console.log(code.value);
  const res = await Service.compile(code.value);

  console.log(res, "onRun");
};
</script>

<style scoped>
.input {
  height: 300px;
  width: 500px;
}
</style>
