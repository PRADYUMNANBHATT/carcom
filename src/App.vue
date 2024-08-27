<template>
  <div class="wapper tmlt">
    <NavBar />
    <div class="steering">
      <svg
        fill="#000000"
        height="60px"
        width="60px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 308 308"
        xml:space="preserve"
      >
        <g id="XMLID_468_">
          <path
            id="XMLID_469_"
            d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
          />
          <path
            id="XMLID_470_"
            d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
          />
        </g>
      </svg>
    </div>
    <div class="steering-responce">
      <h1>Call +9495161062</h1>
    </div>
    <div
      class="is-loadig-bar has-text-centered"
      :class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>
    <main class="mt-6 bdy-cnt">
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
    FooterBar,
  },
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.cart = this.$store.state.cart;
    setTimeout(() => {
      this.$store.commit("setIsLoading", false);
    }, 2000);
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    this.$store.commit("setIsLoading", true);
    // this.$store.dispatch("fetchAllProduct");
    // this.$store.dispatch("fetchCarouselImage");
    // this.$store.dispatch("fetchlatestProductList");
    // this.$store.dispatch("fetchType");
    // this.$store.dispatch("fetchTrending");
    // this.$store.dispatch("fetchcategory");

    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style lang="scss">
:root {
  --pc: #00d1b2;
  --sc: #eeedf5;
  --h: #000000bb;
  --fc: #9aa39e;
}

@import "../node_modules/bulma";
@import "./fonts/fontawesome.min.css";
html::-webkit-scrollbar {
  display: none;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scrollbar-width: 0;
  scroll-behavior: smooth;
}
h1,
h2,
h3,
h4,
h5 {
  font-family: "Inconsolata";
  -webkit-text-size-adjust: 100%;

  color: #1a1a1a;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  line-height: 1.2;
  font-size: 2.75rem;
  box-sizing: border-box;
  font-weight: bolder;
}
p {
  -webkit-text-size-adjust: 100%;
  font-weight: 400;
  font-family: "bmwtypenextttlight";
  color: #9aa39e;
  text-align: left;
  line-height: 22px;
  box-sizing: border-box;
  margin-top: 0;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: inherit;
}
.bdy-cnt {
  min-height: 50vh;
  max-width: 100vw;
  overflow: hidden;
  background-color: #e9ecef;
}
.tmlt {
  position: relative;
}
.steering {
  position: fixed;
  right: 2%;
  bottom: 0%;
  height: 100px;
  width: fit-content;
  z-index: 9999;
}
.steering > svg {
  fill: #33cc99;
}
.steering > svg:hover {
  fill: #33cc9967;
}
.steering-responce {
  display: none;
  padding: 1rem;
}
.steering-responce > h1 {
  font-size: 2rem;
}
.steering-responce > p {
  color: var(--fp);
}
.steering:hover + .steering-responce {
  width: 400px;
  height: auto;
  background-color: white;
  border: 1px solid grey;

  position: fixed;
  border-radius: 5%;
  right: 0;
  bottom: 4%;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  animation: slide_in 1s linear;
}
@keyframes slide_in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
ul.demo {
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: #000;
}
a {
  color: #000;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: "";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid#ccc;
  border-color: #00d1b2 transparent #ccc transparent;
  animation: ids-dual-ring 1.2s linear infinite;
}
@keyframes ids-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loadig-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    position: fixed;
    z-index: 9999;
    top: 40%;
    right: 40%;

    margin: 80px;
    height: 80px;
  }
}
.page-product {
  min-height: 100vh;
}
</style>
