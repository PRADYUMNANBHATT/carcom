<template>
  <nav class="navbar is-fixed-top px-6 has-shadow">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <figure class="image logo">
          <img src="../assets/logo.png" alt="logo" class="" /></figure
      ></router-link>
      <a
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-menu"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      class="navbar-menu"
      id="navbar-menu"
      :class="{ 'is-active': showMobileMenu }"
    >
      <div class="navbar-start">
        <div class="navbar-item">
          <form action="/search" method="get">
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="what are you looking for?"
                  name="query"
                />
              </div>
              <div class="control">
                <button class="button is-primary">
                  <span class="icon">
                    <i class="fa fa-search"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="navbar-end">
        <router-link
          :to="{
            name: 'TypeView',
            params: { name: 'old-cars' },
            query: { id: 1 },
          }"
          class="navbar-item"
          ><span class="has-text-primary is-primary">
            Used Cars</span
          ></router-link
        >
        <router-link
          :to="{
            name: 'TypeView',
            params: { name: 'new-cars' },
            query: { id: 2 },
          }"
          class="navbar-item has-text-primary"
          >New Cars</router-link
        >
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="is-primary"
                ><i class="fa fa-user has-text-primary" aria-hidden="true"></i
              ></router-link>
            </template>
            <template v-else>
              <router-link to="/log-in" class="button is-primary is-rounded"
                >Login</router-link
              >
              <router-link to="/sign-up" class="button is-primary is-rounded"
                >SignUp</router-link
              >
            </template>

            <router-link to="/cart" class="is-primary px-5">
              <span class="icon is-primary"
                ><i class="fa fa-shopping-cart has-text-primary"></i
              ></span>
              <span v-if="cartTotalLength > 0">({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
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
<style Scoped lang="scss">
.router-link-active {
  border-bottom: 1px solid var(--pc);
}
@mixin ripple($duration, $delay) {
  opacity: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  height: 100%;
  width: 100%;
  background: grey;
  border-radius: 100%;
  animation-name: ripple;
  animation-duration: $duration;
  animation-delay: $delay;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.65, 0, 0.34, 1);
  z-index: -1;
}

.step {
  &::after {
    @include ripple(3s, 500ms);
  }
}

@keyframes ripple {
  from {
    opacity: 1;
    transform: scale3d(0.75, 0.75, 1);
  }

  to {
    opacity: 0;
    transform: scale3d(1.5, 1.5, 1);
  }
}
</style>
