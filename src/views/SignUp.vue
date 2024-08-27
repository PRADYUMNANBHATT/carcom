<template>
  <div class="page-sign-up">
    <div class="colum">
      <div class="column is-4 is-offset-4">
        <h1 class="title">SignUp</h1>
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
          <div class="field">
            <label>Repeat Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password2" />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary">SignUp</button>
            </div>
          </div>
          <hr />
          or <router-link to="/log-in">Click here</router-link> to logIn!
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "SignUpView",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Sign Up| Hootkart";
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.username === "") {
        this.errors.push("The username is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is too short");
      }
      if (this.password !== this.password2) {
        this.errors.push("The password mismatch");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        axios
          .post("api/v1/users/", formData)
          .then(() => {
            toast({
              message: "Account Created,please login",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.responce) {
              for (const property in error.responce.data) {
                this.errors.push(
                  `${property}:${error.responce.data[property]}`
                );
              }
            } else if (error.message) {
              this.errors.push("Something went wrong, please tryagain");
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>
