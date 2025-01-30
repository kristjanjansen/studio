<script setup lang="ts">
const { data: streams, refresh } = await useAsyncData("steams", () => {
  return $fetch("/api/streams");
});
useIntervalFn(refresh, 3000);
</script>

<template>
  <div>
    <Stream v-for="stream in streams" :stream="stream" />
  </div>
</template>
