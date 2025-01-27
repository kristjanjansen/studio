import { useStorage } from "@vueuse/core";

export function useVideoControls(videoRef: Ref<HTMLVideoElement | null>) {
  const {
    muted,
    volume: videoVolume,
    togglePictureInPicture,
    isPictureInPicture,
    supportsPictureInPicture,
  } = useMediaControls(videoRef);

  const volume = useStorage("volume", 0.8);

  onMounted(() => {
    videoVolume.value = volume.value;
    muted.value = true;
  });

  watch(volume, () => {
    videoVolume.value = volume.value;
    muted.value = volume.value === 0;
  });

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(videoRef);

  return {
    volume,
    muted,
    togglePictureInPicture,
    isPictureInPicture,
    supportsPictureInPicture,
    isFullscreen,
    toggleFullscreen,
  };
}
