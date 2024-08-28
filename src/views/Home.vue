<template>
  <div>
    <!-- <section class="desktop">
        <CarouselView :carousel="carousel_images" />
      </section>
      <section class="mobile">
        <StaticCarousel :carousel="carousel_images_mobile" />
      </section> -->

    <section class="desktop">
      <StaticCarousel :carousel="carousel_images" />
    </section>
    <section class="mobile">
      <StaticCarousel :carousel="carousel_images_mobile" />
    </section>

    <section class="container section tab">
      <HeadingView heading="Latest Car Updates" />
      <TabComponent selected="trending" />
    </section>

    <section class="container section">
      <HeadingView heading="All Brands" />
      <div
        class="columns is-flex is-justify-content-center is-flex-wrap-wrap p-6"
      >
        <div class="category is-justify-content-center">
          <CategoryBox
            v-for="category in categoryDetails"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </section>
    <section class="container section">
      <HeadingView heading="Latest Products" />
      <div class="columns is-multiline p-6">
        <ProductBox
          v-for="product in latestProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
    <section class="container section tab">
      <HeadingView heading="Select Your Type" />
      <TabComponent selected="type" />
    </section>
  </div>
</template>

<script>
import ProductBox from "@/components/StaticProductBox";
// import CategoryBox from "@/components/CategoryBox.vue";
import CategoryBox from "@/components/StaticCategoryBox.vue";
// import CarouselView from "./CarouselView.vue";
import StaticCarousel from "./StaticCarousel.vue";
import HeadingView from "@/components/HeadingView.vue";
import TabComponent from "@/components/StaticTabComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      latestProducts: [],
      categoryDetails: [],
      carousel_images: [],
      carousel_images_mobile: [],
      // selected_carousel: 1,
    };
  },
  components: {
    ProductBox,
    CategoryBox,
    // CarouselView,
    HeadingView,
    TabComponent,
    StaticCarousel,
  },

  mounted() {
    let data = [];
    data = this.$store.state.data;

    //   setTimeout(() => {
    //     this.carousel_images = this.$store.getters.getcaroselImages;
    //     this.latestProducts = this.$store.getters.getlatestProductList;
    //     this.categoryDetails = this.$store.getters.getcategoryList;
    //     this.carousel_images_mobile = data.carousel_image_mobile;
    //   }, 2000);

    setTimeout(() => {
      this.carousel_images = data.carousel_image;
      this.latestProducts = data.products;
      this.categoryDetails = data.category;
      this.carousel_images_mobile = data.carousel_image_mobile;
    }, 2000);

    document.title = "Home|Hootkart";
  },
  // created() {
  //   window.addEventListener("resize", this.onResize);
  // },

  // beforeUnmount() {
  //   window.removeEventListener("resize", this.onResize);
  // },
  // methods: {
  //   onResize() {
  //     if (window.innerWidth > 960) {
  //       this.selected_carousel = 1;
  //     } else {
  //       this.selected_carousel = 2;
  //     }
  //   },
  // },
};
</script>
<style scoped>
.category {
  display: flex;
  flex-direction: row;
  gap: 0rem;
  background: none;
  flex-wrap: wrap;
}
.tab {
  background-color: #0b7285;
  margin-bottom: 30px;
}
.desktop {
  display: none;
}
.mobile {
  display: none;
}
@media only screen and (max-width: 784px) {
  .mobile {
    display: block;
  }
}
@media only screen and (min-width: 784px) {
  .desktop {
    display: block;
  }
}
</style>
