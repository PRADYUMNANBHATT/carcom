<template>
  <div class="carousel" v-if="carouselItem.carousel.length > 0">
    <div v-for="(item, index) in carouselItem.carousel" :key="item">
      <div
        :style="{ backgroundColor: item.background_clr }"
        class="carousel_img"
      >
        <router-link :to="item.get_absolute_url">
          <figure
            :class="[
              'carousel_img',
              index === activeIndex ? 'visible' : 'hide',
            ]"
          >
            <img
              :src="resolve_image(item.get_image)"
              alt="image"
              class="image"
            />
          </figure>
          <div
            :class="[
              'carousel-txt',
              index === activeIndex ? 'visible' : 'hide',
            ]"
          >
            <h1 :style="{ color: item.background_clr }">
              {{ item.title }}
            </h1>
            <!-- <p>{{ item.description }}</p> -->
            <button>Explore</button>
          </div>
        </router-link>
      </div>
    </div>
    <div class="dot-col">
      <div v-for="(item, index) in carouselItem.carousel" :key="item">
        <div
          :class="['dot', index === activeIndex ? 'active' : '']"
          @click="activeIndex = index"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
const carouselItem = defineProps(["carousel"]);
import resolve_image from "../mixin/mixin.js";
let activeIndex = ref(0);
let nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % carouselItem.carousel.length;
};
onMounted(() => {
  slideAutoplay();
});
const slideAutoplay = () => {
  setInterval(() => {
    nextSlide();
  }, 7000);
};
</script>
<style Scoped>
.dot-col {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50px;
  position: absolute;
  bottom: 5%;
  right: 0;
  left: 0;
  z-index: 3;
  gap: 5px;
}
.dot {
  width: 16px;
  height: 16px;
  background: none;
  border-radius: 50%;
  background-color: #ffffff45;
  /* border: 1px solid rgb(191, 191, 191); */
}
.active {
  background-color: #ffffffa5;
  box-shadow: 1px 1px 1px #ffffff45;
}
.dot-clr {
  background-color: turquoise;
}
.carousel {
  height: fit-content;
  width: 100vw;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.carousel-txt {
  position: absolute;
  width: 400px;
  z-index: 1;
  bottom: 25%;
  left: 15%;
  flex-direction: column;

  h1 {
    font-size: 4rem !important;
    margin-bottom: 15px;
    color: var(--fc);
  }
  p {
    width: 600px;
    margin-bottom: 15px;
  }
  button {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    text-decoration: none;
    margin-bottom: 30px;
    font-weight: 400;
    width: 150px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    border: 2px solid #ffffff;
    color: #ffffff !important;
    transition: all 0.4s ease;
    background: none;
    text-transform: uppercase;
    font-size: 13px;
    border-radius: 0;
    font-family: "bmwtypenextttbold";
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 255px;
    float: left;
  }
}
.carousel_img {
  max-height: 100vh;
  width: 100vw !important;
  position: relative;
}
img {
  width: 100%;
}
.visible {
  display: flex;
  /* animation: slideout 2s ease-in 3s forwards; */
  animation: slidein, slideout;
  animation-duration: 2s, 2s;
  animation-delay: 0s, 5s;
}
.hide {
  display: none;
  animation: slideout 0.1s linear;
}
@keyframes slideout {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
@keyframes slidein {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>
