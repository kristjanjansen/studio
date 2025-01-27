import { ref, watch } from "vue";

type VideoFrame = {
  src: string;
  timestamp: number;
};

export const useVideoframe = (
  videoRef: Ref<HTMLVideoElement | null>,
  canvasRef: Ref<HTMLCanvasElement | null>
) => {
  const context = ref<CanvasRenderingContext2D | null>(null);
  const frames = ref<VideoFrame[]>([]);

  // Update canvas dimensions and context when video or canvas changes
  watch([videoRef, canvasRef], () => {
    if (videoRef.value && canvasRef.value) {
      context.value = canvasRef.value.getContext("2d");
      canvasRef.value.width = videoRef.value.videoWidth;
      canvasRef.value.height = videoRef.value.videoHeight;
    }
  });

  // Capture a frame from the video
  const capture = () => {
    if (videoRef.value && canvasRef.value && context.value) {
      context.value.drawImage(videoRef.value, 0, 0);
      frames.value.push({
        src: canvasRef.value.toDataURL("image/jpeg", 0.7),
        timestamp: performance.now(),
      });
    }
  };

  // Clear frames and canvas
  const clear = () => {
    frames.value = [];
    context.value?.clearRect(
      0,
      0,
      canvasRef.value?.width || 0,
      canvasRef.value?.height || 0
    );
  };

  return { context, capture, clear, frames };
};
