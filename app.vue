<script setup lang="ts">
import seo from '~/content/seo';
import '~/config/vectors';

useServerSeoMeta({
  title: seo.title,
  ogTitle: seo.title,
  description: seo.description,
  ogDescription: seo.description,
  ogImage: seo.img,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
