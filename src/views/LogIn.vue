<template>
  <div class="page-log-in">
    <div class="colum">
      <div class="column is-4 is-offset-4">
        <h1 class="title">LogIn</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">Log In</button>
            </div>
          </div>
          <hr />
          or <router-link to="/sign-up">Click here</router-link> to Sign UP!
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { toast } from "bulma-toast";
export default {
  name: "LogInView",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log In| Hootkart";
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        username: this.username,
        password: this.password,
      };
      await axios
        .post("api/v1/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          const topath = this.$route.query.to || "/cart";
          this.$router.push(topath);
        })
        .catch((error) => {
          if (error.responce) {
            for (const property in error.responce.data) {
              this.errors.push(`${property}:${error.responce.data[property]}`);
            }
          } else if (error.message) {
            this.errors.push("Something went wrong, please tryagain");
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>
