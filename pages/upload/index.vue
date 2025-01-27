<script setup lang="ts">
const whipRef = ref<HTMLVideoElement | null>(null);
const whipUrl =
  "https://customer-mwuu1cmlyif6eluy.cloudflarestream.com/b420575632bb8e77a11e5e27094028a7k7f9a35aa63f1b17357b29b3c303b639d/webRTC/publish";
useVideoWhip(whipRef, whipUrl);

const whepRef = ref<HTMLVideoElement | null>(null);
const whepUrl =
  "https://customer-mwuu1cmlyif6eluy.cloudflarestream.com/7f9a35aa63f1b17357b29b3c303b639d/webRTC/play";
useVideoWhep(whepRef, whepUrl);
</script>
<template>
  <video ref="whipRef" controls muted autoplay class="w-1/2"></video>
  <video ref="whepRef" controls muted autoplay class="w-1/2"></video>
</template>
