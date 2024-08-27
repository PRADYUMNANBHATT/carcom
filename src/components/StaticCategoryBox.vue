<template>
  <div>
    <div class="item card m-2">
      <router-link :to="category.get_absolute_url">
        <div class="image-bx">
          <figure class="is-2by3">
            <img
              :src="resolve_image(category.get_thumbnail)"
              class="image"
              alt="{{ category.name }}"
              width="100px"
              height="100px"
            />
          </figure>
        </div>
        <div class="category-name">
          <h1>{{ category.name }}</h1>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import resolve_image from "@/mixin/mixin";
</script>
<script>
export default {
  name: "CategoryBox",
  props: {
    category: Object,
  },
};
</script>
<style scoped>
img {
  max-width: 100%;
  height: auto;
}
.item {
  min-height: 140px;
  gap: 20px;
  padding: 10px;
  background: none;
}
.item:hover {
  box-shadow: 1px 1px 1px rgba(151, 151, 151, 0.333);
}
.image-bx {
  width: 120px;
  min-height: 120px;
  max-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 3px;
}
.category-name h1 {
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  /* color: rgb(131, 131, 131); */
  text-transform: uppercase;
}
.top {
  justify-content: center;
  text-align: center;
  background-color: rgb(255, 255, 255);
}
</style>
