<template>
  <div class="column is-12 is-flex is-justify-content-flex-start">
    <h2 class="has-text-centered">{{ props.heading }}</h2>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  heading: String,
});
</script>
<style Scoped></style>
