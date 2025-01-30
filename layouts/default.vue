<template>
  <div class="bg-black min-h-screen text-white antialiased p-16">
    <slot />
  </div>
</template>

<style>
.debug > * {
  @apply border border-red-500;
}
</style>
