import Cloudflare from "cloudflare";
import { LiveInput } from "cloudflare/resources/stream/live-inputs/live-inputs.mjs";

const apiToken = "NmRarNN_6w4GaCCEm8jlLEv4GisV0TSs_-MMriJL";
const account_id = "dc1ee8d72a1fb7da857c46479a8503b8";

type LiveInputExtras = {
  hlsUrl: string;
  viewsUrl: string;
};

export type Stream = {
  input: LiveInput;
  extras: LiveInputExtras;
};

export default defineEventHandler(async () => {
  const client = new Cloudflare({ apiToken });

  const inputsList = await client.stream.liveInputs.list({ account_id });

  const inputs = await Promise.all(
    (inputsList as any[]).map(async ({ uid }) => {
      const input = await client.stream.liveInputs.get(uid, { account_id });
      const url = new URL(input?.webRTC?.url || "");
      const hlsUrl = `https://${url.hostname}/${uid}/manifest/video.m3u8`;
      const viewsUrl = `https://${url.hostname}/${uid}/views`;
      return { input, extras: { hlsUrl, viewsUrl } };
    })
  );

  return inputs as Stream[];
});
