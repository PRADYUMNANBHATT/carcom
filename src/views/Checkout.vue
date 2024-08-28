<template>
  <div class="page-checkout pt-6">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth">
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
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>₹{{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>₹{{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>₹{{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="column is-12 box">
          <h2 class="subtitle">Shipping Details</h2>
          <p class="has-text-grey mb-4">All field are required!</p>
        </div>
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label>First Name</label>
              <div class="control">
                <input type="text" class="input" v-model="first_name" />
              </div>
            </div>
            <div class="field">
              <label>Last Name</label>
              <div class="control">
                <input type="text" class="input" v-model="last_name" />
              </div>
            </div>
            <div class="field">
              <label>E-mail</label>
              <div class="control">
                <input type="email" class="input" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label>Phone</label>
              <div class="control">
                <input type="text" class="input" v-model="phone" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label>Address</label>
              <div class="control">
                <input type="text" class="input" v-model="address" />
              </div>
            </div>
            <div class="field">
              <label>zipcode</label>
              <div class="control">
                <input type="text" class="input" v-model="zipcode" />
              </div>
            </div>
            <div class="field">
              <label>Place</label>
              <div class="control">
                <input type="text" class="input" v-model="place" />
              </div>
            </div>
          </div>
        </div>

        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength">
          <hr />
          <button class="button is-dark" @click="submitForm">
            pay with strip
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Stripe from "stripe";
export default {
  name: "CheckoutView",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "checkout|Hootkart";
    this.cart = this.$store.state.cart;
    if (this.cartTotalLength > 0) {
      this.stripe = Stripe(
        "pk_test_51JVIhpSAcp8aix7VCUuGGb4qlY62raem0y4u1f0zvuqKaC3di39A7sIhwkt4zaLj8Ndcc1GikOQnFz9liCQu32dF00Io0Mp72t"
      );
      const elements = this.stripe.elements();
      this.card = elements.create("card", { hidePostalCode: true });
      this.card.mount("#card-element");
    }
  },

  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];
      if (this.first_name === "") {
        this.errors.push("first name field is missing");
      }
      if (this.last_name === "") {
        this.errors.push("last name field is missing");
      }
      if (this.email === "") {
        this.errors.push("email field is missing");
      }
      if (this.phone === "") {
        this.errors.push("phone field is missing");
      }
      if (this.address === "") {
        this.errors.push("address field is missing");
      }
      if (this.zipcode === "") {
        this.errors.push("zipcode field is missing");
      }
      if (this.place === "") {
        this.errors.push("first place field is missing");
      }
      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.errors.push(
              "something went wrong with stripe,please try again"
            );
            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        };
        items.push(obj);
      }
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items: items,
        stripe_token: token.id,
      };
      await axios
        .post(`/api/v1/checkout/`, data)
        .then(() => {
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push("somthing went wrong ,please @try again");
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
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
