import WHEPClient from "~/utils/whep";

export function useVideoWhep(
  videoRef: Ref<HTMLVideoElement | null>,
  whepUrl: string
) {
  onMounted(() => {
    new WHEPClient(whepUrl, videoRef.value as HTMLVideoElement);
  });
}
