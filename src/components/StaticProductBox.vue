<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img
          :src="resolve_image(product.get_thumbnail)"
          alt="{{ product.name }}"
        />
      </figure>
      <span class="is-size-6 para-cutter">{{ product.name }}</span>
      <p class="is-size-6 has-text-grey">₹{{ product.price }}</p>
      <router-link
        :to="product.get_absolute_url"
        class="is-flex is-justify-content-end has-text-primary mt-4"
        >View details <i class="pl-3 fa fa-long-arrow-right"></i
      ></router-link>
    </div>
  </div>
</template>
<script setup>
import resolve_image from "@/mixin/mixin";
</script>
<script>
export default {
  name: "ProductBox",
  props: {
    product: Object,
  },
};
</script>
<style scoped>
.image {
  margin-top: -1.25rem;
  margin-right: -1.25rem;
  margin-left: -1.25rem;
}
.para-cutter {
  white-space: nowrap;
  overflow: hidden;
  line-clamp: 3;
  text-overflow: ellipsis;
}
</style>
