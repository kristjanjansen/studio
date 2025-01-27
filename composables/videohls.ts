import Hls, { Events as HlsEvents, ErrorTypes } from "hls.js";

export function useVideoHls(
  videoRef: Ref<HTMLVideoElement | null>,
  hlsUrl: string
) {
  let hlsInstance: Hls | null = null;

  const initializeHls = () => {
    const videoElement = videoRef.value;

    if (videoElement && Hls.isSupported()) {
      hlsInstance = new Hls();
      hlsInstance.attachMedia(videoElement);

      hlsInstance.on(HlsEvents.MEDIA_ATTACHED, () => {
        hlsInstance?.loadSource(hlsUrl);
      });

      hlsInstance.on(HlsEvents.ERROR, (_event, data) => {
        console.log(data.fatal, data.type);
        switch (data.type) {
          case ErrorTypes.NETWORK_ERROR:
            retryHlsInstance();
            break;
          case ErrorTypes.MEDIA_ERROR:
            hlsInstance?.recoverMediaError();
            break;
          default:
            destroyHlsInstance();
            initializeHls();
            break;
        }
      });
    } else if (videoElement?.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = hlsUrl;
    }
  };

  const destroyHlsInstance = () => {
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
  };

  const retryHlsInstance = () => {
    destroyHlsInstance();
    setTimeout(initializeHls, 3000);
  };

  onMounted(() => {
    initializeHls();
    videoRef.value?.addEventListener("error", () => {
      retryHlsInstance();
    });
  });

  onUnmounted(() => {
    destroyHlsInstance();
  });
}
