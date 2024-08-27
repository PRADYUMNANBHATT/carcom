<template>
  <section>
    <div class="section">
      <div class="columns">
        <SideBar />
        <main class="column">
          <router-view />
        </main>
      </div>
    </div>
  </section>
</template>
<script setup>
import SideBar from "../components/SideBar.vue";
</script>
<style Scoped></style>
