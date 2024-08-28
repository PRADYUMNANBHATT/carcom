<template>
  <div class="page-product">
    <div class="column is-multiline">
      <h2 class="is-size-2 has-text-centered">{{ categorySlug }}</h2>
    </div>

    <div class="columns is-flex-wrap-wrap m-4">
      <ProductBox
        v-for="product in category"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "@/components/ProductBox";

export default {
  name: "CategoryView",
  data() {
    return {
      category: {},
      categorySlug: "",
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Category") {
        this.getCategory();
        console.log(from);
      }
    },
  },
  methods: {
    async getCategory() {
      this.$store.commit("setIsLoading", true);
      this.categorySlug = this.$route.params.category_slug;
      document.title = this.categorySlug + "|Hootkart";
      await axios
        .get(`api/v1/products/${this.categorySlug}/`)
        .then((responce) => {
          this.category = responce.data;
        })
        .catch((error) => {
          console.log(error);
          toast({
            message: "Somthing went wrong try again",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
