<template>
  <div class="page-product pt-6">
    <div
      class="columns is-flex is-align-self-flex-center is-justify-content-center pt-4"
    >
      <div class="column is-4">
        <figure class="image mb-6">
          <img :src="resolve_image(product.get_image)" alt="" />
        </figure>
      </div>
      <div class="column is-3">
        <h2 class="subtitle">Information</h2>
        <div class="field has-addons mt-4">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>
          <div class="control">
            <button class="button is-primary" @click="addToCart">
              <i class="fa fa-cart-plus"></i>
            </button>
          </div>
        </div>
        <div class="column">
          <h1 class="title">{{ product.name }}</h1>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import resolve_image from "@/mixin/mixin";
</script>
<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "ProductView",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    let data = [];
    data = this.$store.state.data;

    const product_slug = this.$route.params.product_slug;

    this.product = data.products.find((e) => e.slug === product_slug);
    console.log(product_slug, this.product);
    // this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit("setIsLoading", true);

      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      await axios
        .get(`api/v1/products/${category_slug}/${product_slug}/`)
        .then((response) => {
          this.product = response.data;
          document.title = this.product.name + "|Hootkart";
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item),
        toast({
          message: "The Product was added to the cart",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: "bottom-right",
        });
    },
  },
};
</script>
