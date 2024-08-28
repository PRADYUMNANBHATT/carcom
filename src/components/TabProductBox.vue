<template>
  <div class="column is-4">
    <router-link :to="product.get_absolute_url">
      <div class="box">
        <figure class="image mb-4">
          <img :src="product.get_thumbnail" alt="{{ product.name }}" />
        </figure>
        <h1 class="is-size-6 has-text-primary para-cutter">
          {{ product.name }}
        </h1>
        <p class="is-size-6 has-text-grey">₹{{ product.price }}</p>
        <p class="is-size-6 has-text-grey">₹{{ product.description }}</p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "TabProductBox",
  props: {
    product: Object,
  },
};
</script>
<style scoped>
/* .tab-box {
  height: 60vh;
  overflow: hidden;
} */
.box {
  height: 100%;
}
.para-cutter {
  white-space: nowrap;
  overflow: hidden;
  line-clamp: 3;
  text-overflow: ellipsis;
}
</style>
