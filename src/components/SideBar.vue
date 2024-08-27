<template>
  <aside class="column is-2">
    <nav class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'defaultAdmin' }" exact
            >Dashboard</router-link
          >
        </li>
      </ul>
      <p class="menu-label">Administration</p>
      <ul class="menu-list">
        <li>
          <a>Manage Your Sub Category</a>
          <ul>
            <li>
              <router-link :to="{ name: 'addProduct' }" exact
                >Add Product</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'addCategory' }"
                >Add Category</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'addTrending' }"
                >Add Trending tag</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'addType' }">Add Type </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'addCarousel' }"
                >Add Carousel
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup></script>
<style Scoped></style>
