<template>
  <section class="container section">
    <HeadingView :heading="newname" />
    <div class="columns is-multiline is-flex is-flex-wrap-wrap p-6">
      <ProductBox
        v-for="product in tabProductList"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
<script setup>
import HeadingView from "@/components/HeadingView.vue";
import ProductBox from "@/components/ProductBox.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
let route = useRoute();
let name = String;
name = route.params.name.toUpperCase();
let newname = name.split("-").join(" ");
let id = route.query.id;
let tabProductList = computed(() =>
  store.getters.getAllProducts.filter((e) => e.car_type === parseInt(id))
);
tabProductList.value ? store.dispatch("fetchAllProduct") : "";
watch(
  route,
  () => {
    id = route.query.id;
    tabProductList = computed(() =>
      store.getters.getAllProducts.filter((e) => e.car_type === parseInt(id))
    );
  },
  { deep: true, immediate: true }
);
</script>
<style Scoped></style>
