import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Category from "../views/Category.vue";
import Search from "../views/Search.vue";
import Cart from "../views/Cart.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import MyAccount from "../views/MyAccount.vue";
import Checkout from "../views/Checkout.vue";
import Success from "../views/Success.vue";
import Admin from "../views/AdminDashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requireLogin: false,
    },
    children: [
      {
        path: "",
        name: "defaultAdmin",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/DefaultAdminPannel.vue"
          ),
      },
      {
        path: "add-product",
        name: "addProduct",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddProduct.vue"),
      },
      {
        path: "add-category",
        name: "addCategory",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddCategory.vue"),
      },
      {
        path: "add-type",
        name: "addType",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddType.vue"),
      },
      {
        path: "add-trending",
        name: "addTrending",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddTrending.vue"),
      },
      {
        path: "add-carousel",
        name: "addCarousel",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddCarousel.vue"),
      },
    ],
  },
  {
    path: "/type-view/:name",
    name: "TypeView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TypeViseView.vue"),
  },

  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/cart/success",
    name: "Success",
    component: Success,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/cart/checkout/",
    name: "Checkout",
    component: Checkout,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/:category_slug/:product_slug",
    name: "Product",
    component: Product,
  },
  {
    path: "/:category_slug",
    name: "Category",
    component: Category,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "LogIn", query: { to: to.path } });
  } else {
    return (
      next(),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0, behavior: "smooth" });
        }, 10);
      })
    );
  }
});

export default router;
