<script lang="ts" setup>
useServerSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: '/images/screenshot.jpeg',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <h2>about</h2>
  <ToolsIcons name="arrow" />
</template>

<style lang="scss">
.svg-icon {
  width: 100px;
}
</style>
