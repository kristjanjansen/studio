<script setup lang="ts">
const inputId = "7f9a35aa63f1b17357b29b3c303b639d";
const customerDomain = "customer-mwuu1cmlyif6eluy.cloudflarestream.com";

const videoRef = ref<HTMLVideoElement | null>(null);
const hlsUrl = "https://sb.err.ee/live/etv2.m3u8";
useVideoHls(videoRef, hlsUrl);

const videoRef2 = ref<HTMLVideoElement | null>(null);
const hlsUrl2 = `https://${customerDomain}/${inputId}/manifest/video.m3u8`;
useVideoHls(videoRef2, hlsUrl2);

const {
  muted,
  volume,
  togglePictureInPicture,
  isPictureInPicture,
  supportsPictureInPicture,
  toggleFullscreen,
} = useVideoControls(videoRef);

const { idle } = useIdle(3000);

const now = useNow();

// const whipRef = ref<HTMLVideoElement | null>(null);
// const whipUrl =
//   "https://customer-mwuu1cmlyif6eluy.cloudflarestream.com/b420575632bb8e77a11e5e27094028a7k7f9a35aa63f1b17357b29b3c303b639d/webRTC/publish";
// useVideoWhip(whipRef, whipUrl);

const whepRef = ref<HTMLVideoElement | null>(null);
const whepUrl =
  "https://customer-mwuu1cmlyif6eluy.cloudflarestream.com/7f9a35aa63f1b17357b29b3c303b639d/webRTC/play";
useVideoWhep(whepRef, whepUrl);
</script>
<template>
  <!-- <video
    ref="whipRef"
    controls
    muted
    autoplay
    playsinline
    class="w-1/2"
  ></video> -->

  <!-- <video
    ref="videoRef"
    autoplay
    playsinline
    crossorigin="anonymous"
    class="w-1/2"
    controls
  ></video> -->
  <div
    class="transition duration-500 flex gap-4"
    :class="idle ? 'opacity-0' : 'opacity-100'"
  >
    <button @click="muted = !muted">Mute</button>
    <input type="range" max="1" step="any" v-model="volume" />
    <button @click="toggleFullscreen">Fullscreen</button>
    <button
      v-if="supportsPictureInPicture && !isPictureInPicture"
      @click="togglePictureInPicture"
    >
      PIP
    </button>
  </div>
  <!-- <video ref="videoRef2" controls muted autoplay class="w-1/2"></video> -->
  <video ref="whepRef" controls muted autoplay playsinline></video>
  <ClientOnly>
    <div class="font-mono">{{ now }}</div>
  </ClientOnly>
</template>
