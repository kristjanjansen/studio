import WHIPClient from "~/utils/whip";

export function useVideoWhip(
  videoRef: Ref<HTMLVideoElement | null>,
  whipUrl: string
) {
  onMounted(() => {
    new WHIPClient(whipUrl, videoRef.value as HTMLVideoElement);
  });
}
