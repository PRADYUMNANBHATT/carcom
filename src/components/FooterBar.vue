<template>
  <footer class="footer box p-5">
    <div class="container has-text-centered has-text-white">
      <router-link to="/" class="navbar-item">
        <figure class="image logo">
          <img src="../assets/logo.png" alt="logo" class="logo" /></figure
      ></router-link>
      <div class="columns pt-3">
        <div class="column">
          <h6 class="content has-text-centered has-text-primary">About Us</h6>
          <p class="has-text-center has-text-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div class="column">
          <h6 class="content has-text-centered has-text-primary">Nav Links</h6>
          <ul class="demo">
            <li class="has-text-centered">
              <router-link
                :to="{
                  name: 'TypeView',
                  params: { name: 'old-cars' },
                  query: { id: 1 },
                }"
                class="navbar-item has-text-centered"
                ><span class="has-text-primary is-primary">
                  Used Cars</span
                ></router-link
              >
            </li>
            <li>
              <router-link
                :to="{
                  name: 'TypeView',
                  params: { name: 'new-cars' },
                  query: { id: 2 },
                }"
                class="navbar-item has-text-primary"
                >New Cars</router-link
              >
            </li>
            <li>
              <router-link to="/log-in" class="navbar-item has-text-primary"
                >Login</router-link
              >
            </li>
            <li>
              <router-link to="/sign-up" class="navbar-item has-text-primary"
                >SignUp</router-link
              >
            </li>
          </ul>
        </div>
        <div class="column">
          <h6 class="content has-text-centered has-text-primary">Account</h6>
          <ul class="demo">
            <li>
              <router-link to="/my-account" class="navbar-item has-text-primary"
                >My Account</router-link
              >
            </li>
          </ul>
        </div>
        <div class="column">
          <h6 class="content has-text-centered has-text-light">Subscribe</h6>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium" type="email" placeholder="Email" />
            <span class="icon is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <a class="button is-success is-rounded mt-2">Subscribe</a>
        </div>
      </div>
    </div>
    <div
      class="column is-flex is-align-content-center has-background-dark is-justify-content-space-between"
    >
      <span class="has-text-light">Copyright © 2022, Carcom</span>
      <span class="has-text-light">Created By PradyumnanBhatt</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: "FooterBar",
};
</script>
<style Scoped>
.footer {
  background-color: #343a40 !important;
}
.logo {
  width: 80px;
}
</style>
