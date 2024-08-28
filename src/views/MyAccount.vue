<template>
  <div class="page-my-account p-6 page-product">
    <div class="columns is-multiline">
      <div class="column is-flex is-justify-content-space-between is-12">
        <h1 class="title has-text-dark">MyAccount</h1>
        <div class="is-flex is-justify-content-end">
          <a @click="logout()" class="is-primary">
            <i
              class="fa fa-power-off has-text-primary fa-2x is-flex is-justify-content-center"
            >
            </i>

            Logout
          </a>
        </div>
      </div>

      <hr />
      <div class="column is-12">
        <h2 class="subtitle">My Orders</h2>
        <OrderSummery
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:order="order"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import OrderSummery from "@/components/OrderSummery.vue";
export default {
  nsme: "MyAccountView",
  components: {
    OrderSummery,
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    document.title = "My account | Hootkart";
    this.getMyOrders();
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      localStorage.removeItem("userId");
      this.$store.commit("removeToken");
      this.$router.push("/");
    },
    async getMyOrders() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
