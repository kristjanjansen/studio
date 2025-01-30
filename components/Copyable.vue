<script setup>
const {
  title,
  value,
  copyable = true,
} = defineProps(["title", "value", "copyable"]);
const { copy } = useClipboard({ source: value });
</script>

<template>
  <div class="flex flex-col gap-1 text-neutral-300">
    <div class="text-sm tracking-wide font-semibold">
      {{ title }}
    </div>
    <div class="relative">
      <input
        :value="value"
        class="font-mono text-sm py-1 px-2 bg-neutral-900 text-neutral-300 rounded w-full outline-none transition"
        readonly
      />
      <button
        v-if="copyable"
        @click="copy(value)"
        class="absolute top-0 right-0 bottom-0 px-2 flex items-center text-neutral-500 hover:text-neutral-300 transition active:scale-110 bg-neutral-900"
      >
        <Icon name="radix-icons:copy" />
      </button>
    </div>
  </div>
</template>
