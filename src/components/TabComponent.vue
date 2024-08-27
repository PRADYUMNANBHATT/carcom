<template>
  <section v-if="selected_config.selected === 'trending'">
    <div class="tabs">
      <ul>
        <li
          v-for="trend in trending_list"
          :key="trend.id"
          :class="selected_tab === trend.id ? 'is-active' : ''"
          @click="selected_tab = trend.id"
        >
          <a>{{ trend.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tab-column">
      <TabProductBox
        v-for="product in tabProductList.filter(
          (e) => e.trending === selected_tab
        )"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
  <section v-if="selected_config.selected === 'type'">
    <div class="tabs">
      <ul>
        <li
          v-for="trend in type_list"
          :key="trend.id"
          :class="selected_tab === trend.id ? 'is-active' : ''"
          @click="selected_tab = trend.id"
        >
          <a>{{ trend.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tab-column columns">
      <TabProductBox
        v-for="product in tabProductList.filter(
          (e) => e.car_type === selected_tab
        )"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
<script setup>
// import axios from "axios";
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";

import TabProductBox from "./TabProductBox.vue";
let selected_config = defineProps({ selected: String });

let selected_tab = ref(1);
const store = useStore();

let trending_list = computed(() => store.getters.getTrendingList);
trending_list.value ? store.dispatch("fetchTrending") : "";
let type_list = computed(() => store.getters.getTypeList);
type_list.value ? store.dispatch("fetchType") : "";
let tabProductList = computed(() => store.getters.getAllProducts);
tabProductList.value ? store.dispatch("fetchAllProduct") : "";
</script>
<style Scoped>
.tab-column {
  display: flex;
  flex-direction: row;
  gap: 0rem;
  border: 1px solid #dadada;

  flex-wrap: wrap;
}
</style>
