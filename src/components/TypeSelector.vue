<template>
  <div class="tabs">
    <ul>
      <li
        :class="selected_tab === 'trending' ? 'is-active' : ''"
        @click="selected_tab = 'trending'"
      >
        <a>Trending</a>
      </li>
      <li
        :class="selected_tab === 'Popular' ? 'is-active' : ''"
        @click="selected_tab = 'Popular'"
      >
        <a>Popular</a>
      </li>
      <li
        :class="selected_tab === 'Upcoming' ? 'is-active' : ''"
        @click="selected_tab = 'Upcoming'"
      >
        <a>Upcoming</a>
      </li>
    </ul>
  </div>
  <div v-if="selected_tab === 'trending'" class="tab-column">
    <TabProductBox
      v-for="product in tabProductList"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
<script setup></script>
<style Scoped></style>
