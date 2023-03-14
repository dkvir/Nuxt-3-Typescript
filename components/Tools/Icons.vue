<template>
  <span
    v-if="icon"
    :class="`svg-icon ${name}-icon flex-center`"
    v-html="icon"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string;
}>();

const icons = Object.fromEntries(
  Object.entries(import.meta.glob('~/src/svg-icon/*.svg', { as: 'raw' })).map(
    ([key, value]) => {
      const filename = key.split('/').pop()!.split('.').shift();
      return [filename, value];
    }
  )
);
const icon = props.name && (await icons?.[props.name]?.());
</script>

<style lang="scss">
.svg-icon {
  width: 50px;
  height: 50px;
  svg {
    width: inherit;
    height: inherit;
  }
}
</style>
