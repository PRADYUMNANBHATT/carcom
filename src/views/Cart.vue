<template>
  <div class="page-cart p-6 page-product">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>
      <div class="colum is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <CartItem
              v-for="item in cart.items"
              :key="item.id"
              :initialItem="item"
              v-on:removeFromCart="removeFromCart"
            />
          </tbody>
        </table>
        <p v-else>You dont have any item in your cart</p>
      </div>
      <div class="column-is-12 box">
        <h2 class="subtitle">Summery</h2>
        <strong>₹{{ cartTotalPrice.toFixed(2) }}</strong
        >/- for {{ cartTotalLength }} items
        <hr />
        <router-link to="/cart/checkout" class="button is-primary"
          >Proceed to checkout</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import CartItem from "@/components/CartItem.vue";
export default {
  name: "CartView",
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
};
</script>
