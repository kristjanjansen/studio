<script setup lang="ts">
import type { Stream } from "~/server/api/streams/index.get";

const { stream } = defineProps<{
  stream: Stream;
}>();

const rmtpVideoRef = ref<HTMLVideoElement | null>(null);
useVideoHls(rmtpVideoRef, stream.extras.hlsUrl);

type Views = {
  liveViewers: number;
};
const { data: views, refresh } = await useAsyncData<Views>(
  "views" + stream.input.uid,
  () => {
    return $fetch(stream.extras.viewsUrl);
  }
);
useIntervalFn(refresh, 3000);

const whepVideoRef = ref<HTMLVideoElement | null>(null);
//useVideoWhep(whepVideoRef, stream.webRTCPlayback.url);

const ffmpegCamera = `ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "0:0" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -ar 44100 -f flv `;
const ffmpegTimestamp = `ffmpeg -re -f lavfi -i color=c=black:s=1280x720:r=30:d=3600 -vf "drawtext=text='%{localtime}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2:font=monospace" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -f flv `;
const ffmpegRestream = `ffmpeg -re -i https://sb.err.ee/live/etv.m3u8 -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -ar 44100 -f flv `;
</script>

<template>
  <div class="grid grid-cols-2 gap-x-8 gap-y-12">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 justify-between items-start">
        <div class="flex gap-2">
          <div class="font-semibold">RMTP Streaming in OBS</div>
          <div class="text-neutral-500">Latency: ~40sec</div>
        </div>
        {{ views?.liveViewers }}
        <div
          v-if="
            stream.input.status?.current.ingestProtocol === 'rtmp' &&
            stream.input.status?.current.state === 'connected'
          "
          class="uppercase bg-red-500 rounded px-2 font-semibold tracking-loose"
        >
          Live
        </div>
      </div>
      <Copyable title="Service" value="Custom..." :copyable="false" />
      <Copyable title="Server" :value="stream.input?.rtmps?.url" />
      <Copyable title="Stream Key" :value="stream.input?.rtmps?.streamKey" />
      <div />
      <details>
        <summary class="font-semibold">RMTP Streaming in ffmpeg</summary>
        <div class="mt-2 flex flex-col gap-4">
          <Copyable
            title="Local camera in MacOS"
            :value="
              ffmpegCamera +
              stream.input?.rtmps?.url +
              stream.input?.rtmps?.streamKey
            "
          />
          <Copyable
            title="Local timestamp"
            :value="
              ffmpegTimestamp +
              stream.input?.rtmps?.url +
              stream.input?.rtmps?.streamKey
            "
          />
          <Copyable
            title="ETV restream"
            :value="
              ffmpegRestream +
              stream.input?.rtmps?.url +
              stream.input?.rtmps?.streamKey
            "
          />
        </div>
      </details>
    </div>

    <div>
      <video
        ref="rmtpVideoRef"
        autoplay
        playsinline
        controls
        muted
        crossorigin="anonymous"
        class="rounded w-full"
      />
      <Copyable title="HLS url" :value="stream.extras.hlsUrl" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 justify-between items-start">
        <div class="flex gap-2">
          <div class="font-semibold">WHIP Streaming in OBS</div>
          <div class="text-neutral-500">Latency: ~1sec</div>
        </div>
        <div
          v-if="
            stream.input.status?.current.ingestProtocol === 'webrtc' &&
            stream.input.status?.current.state === 'connected'
          "
          class="uppercase bg-blue-500 rounded px-2 font-semibold tracking-loose"
        >
          Live
        </div>
      </div>
      <Copyable title="Service" value="WHIP" :copyable="false" />
      <Copyable title="Server" :value="stream.input.webRTC?.url" />
    </div>
    <div>
      <video
        ref="whepVideoRef"
        autoplay
        playsinline
        controls
        muted
        crossorigin="anonymous"
        class="rounded w-full"
      />
    </div>
  </div>
  <pre class="overflow-auto">{{ stream }}</pre>
</template>
