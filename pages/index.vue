<script setup lang="ts">
const { data: streams } = await useFetch("/api/streams");
const text = ref("hi");
</script>

<template>
  <div>
    <Stream v-for="stream in streams" :stream="stream" />
  </div>
</template>
