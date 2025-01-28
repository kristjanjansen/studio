<script setup lang="ts">
import Cloudflare from "cloudflare";

const apiToken = "NmRarNN_6w4GaCCEm8jlLEv4GisV0TSs_-MMriJL";
const account_id = "dc1ee8d72a1fb7da857c46479a8503b8";

const client = new Cloudflare({
  apiToken,
});

const inputsList = await client.stream.liveInputs.list({
  account_id,
});

console.log(inputsList.liveInputs);
// let inputs: any[] | null = null;
// if (inputsList.liveInputs?.length) {
//   inputs = await Promise.all(
//     inputsList.liveInputs.map(async ({ uid }) => {
//       const a = await client.stream.liveInputs.get(uid as string, {
//         account_id,
//       });
//       console.log(a);
//     })
//   );
// }
</script>

<template>
  <pre>{{ inputs }}</pre>
  >
</template>
