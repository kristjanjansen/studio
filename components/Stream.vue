<script setup lang="ts">
const { stream } = defineProps<{
  stream: any;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
//const hlsUrl = "https://sb.err.ee/live/etv2.m3u8";
useVideoHls(videoRef, stream.hlsUrl);

const ffmpegCamera = `ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "0:0" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -ar 44100 -f flv `;
const ffmpegTimestamp = `ffmpeg -re -f lavfi -i color=c=black:s=1280x720:r=30:d=3600 -vf "drawtext=text='%{localtime}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2:font=monospace" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -f flv `;
const ffmpegRestream = `ffmpeg -re -i https://sb.err.ee/live/etv.m3u8 -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -ar 44100 -f flv `;
</script>

<template>
  <div class="grid grid-cols-2 gap-8">
    <div>
      {{ stream.status.current?.ingestProtocol }}
      {{ stream.status.current?.state }}
      <video
        ref="videoRef"
        autoplay
        playsinline
        crossorigin="anonymous"
        class="rounded w-full"
        controls
      />
      <Copyable title="HLS url" :value="stream.hlsUrl" />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <div class="font-semibold">RMTP Streaming in OBS</div>
        <div class="text-neutral-500">Latency: ~40sec</div>
      </div>
      <Copyable title="Service" value="Custom..." :copyable="false" />
      <Copyable title="Server" :value="stream.rtmps.url" />
      <Copyable title="Stream Key" :value="stream.rtmps.streamKey" />
      <div />
      <div class="flex gap-2">
        <div class="font-semibold">WHIP Streaming in OBS</div>
        <div class="text-neutral-500">Latency: ~1sec</div>
      </div>
      <Copyable title="Service" value="WHIP" :copyable="false" />
      <Copyable title="Server" :value="stream.webRTC.url" />
      <div />
      <div class="flex gap-2">
        <div class="font-semibold">RMTP Streaming in ffmpeg</div>
        <div class="text-neutral-500">Latency: ~40sec</div>
      </div>
      <Copyable
        title="Local camera in MacOS"
        :value="ffmpegCamera + stream.rtmps.url + stream.rtmps.streamKey"
      />
      <Copyable
        title="Local timestamp"
        :value="ffmpegTimestamp + stream.rtmps.url + stream.rtmps.streamKey"
      />
      <Copyable
        title="ETV restream"
        :value="ffmpegRestream + stream.rtmps.url + stream.rtmps.streamKey"
      />
      <pre></pre>
    </div>
  </div>
</template>
